"""12 · Realtime voice — GET /v1/realtime (WebSocket).

The client side always speaks the OpenAI Realtime protocol; the gateway bridges to either
an OpenAI or a DashScope realtime upstream. Authentication is the `Authorization` header —
there is no `?api_key=` form.

This example runs one text turn. Audio modality uses the same connection
(`input_audio_buffer.append` with base64 PCM); note that upstream sample rates differ and
the gateway does not resample (OpenAI: 24 kHz in/out; DashScope: 16 kHz in, 24 kHz out).
"""

import asyncio
import json
import os

import websockets

from common import api_key, base_url, model

MODEL = model("MODEL_REALTIME", "qwen3.8-omni-flash-realtime")
# Older gateways may only expose the 3.5 generation. On a 404, set
#   MODEL_REALTIME=aliyun/qwen3.5-omni-plus-realtime
# or pick another realtime model from `03_list_models.py`.


def ws_url() -> str:
    origin = base_url().replace("https://", "wss://").replace("http://", "ws://")
    return f"{origin}/v1/realtime?model={MODEL}"


async def run_session(ws) -> None:
    await ws.send(
        json.dumps(
            {
                "type": "response.create",
                "response": {
                    "modalities": ["text"],
                    "instructions": "Say a short greeting in one sentence.",
                },
            }
        )
    )

    async for raw in ws:
        event = json.loads(raw)
        kind = event.get("type", "")
        # Upstream dialects differ on this event name: OpenAI realtime emits
        # `response.output_text.delta`, DashScope emits `response.text.delta`.
        # Handling both keeps the example working whichever upstream served it.
        if kind in {"response.output_text.delta", "response.text.delta"}:
            print(event.get("delta", ""), end="", flush=True)
        elif kind in {"error", "response.failed"}:
            print(f"\n[event] {json.dumps(event, ensure_ascii=False)}")
            break
        elif kind == "response.done":
            break


async def main() -> None:
    headers = {
        "Authorization": f"Bearer {api_key()}",
        "OpenAI-Beta": "realtime=v1",
    }
    print(f"connecting to {ws_url()}")
    try:
        async with websockets.connect(ws_url(), additional_headers=headers) as ws:
            await run_session(ws)
    except SystemExit:
        raise
    except Exception as exc:  # noqa: BLE001 - surface a 404 as an actionable hint
        if "404" in str(exc):
            raise SystemExit(
                f"the gateway does not expose realtime model {MODEL!r}.\n"
                "Set MODEL_REALTIME to a model listed by 03_list_models.py "
                "(older gateways: aliyun/qwen3.5-omni-plus-realtime)."
            ) from exc
        raise

    print()


if __name__ == "__main__":
    os.environ.setdefault("PYTHONUNBUFFERED", "1")
    asyncio.run(main())
