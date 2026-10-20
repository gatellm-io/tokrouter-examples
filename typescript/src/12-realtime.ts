/**
 * 12 · Realtime voice — GET /v1/realtime (WebSocket).
 *
 * The client side speaks the OpenAI Realtime protocol; the gateway bridges to an OpenAI
 * or DashScope upstream. Auth is the `Authorization` header (no `?api_key=`).
 *
 * Audio modality uses the same connection (`input_audio_buffer.append`, base64 PCM).
 * Upstream sample rates differ and the gateway does not resample:
 * OpenAI 24 kHz in/out; DashScope 16 kHz in, 24 kHz out.
 */
import WebSocket from "ws";

import { apiKey, baseUrl, model } from "./common.js";

const MODEL = model("MODEL_REALTIME", "aliyun/qwen3.5-omni-plus-realtime");

function wsUrl(): string {
  const origin = baseUrl().replace(/^https:\/\//, "wss://").replace(/^http:\/\//, "ws://");
  return `${origin}/v1/realtime?model=${encodeURIComponent(MODEL)}`;
}

const url = wsUrl();
console.log(`connecting to ${url}`);

const ws = new WebSocket(url, {
  headers: { Authorization: `Bearer ${apiKey()}`, "OpenAI-Beta": "realtime=v1" },
});

const done = new Promise<void>((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error("timed out waiting for response.done")), 60_000);

  ws.on("open", () => {
    ws.send(
      JSON.stringify({
        type: "response.create",
        response: { modalities: ["text"], instructions: "Say a short greeting in one sentence." },
      }),
    );
  });

  ws.on("message", (raw) => {
    const event = JSON.parse(raw.toString()) as { type?: string; delta?: string };
    // Upstream dialects differ: OpenAI emits `response.output_text.delta`,
    // DashScope emits `response.text.delta`. Handle both.
    if (event.type === "response.output_text.delta" || event.type === "response.text.delta") {
      process.stdout.write(event.delta ?? "");
    } else if (event.type === "error" || event.type === "response.failed") {
      console.error(`\n[event] ${JSON.stringify(event)}`);
      clearTimeout(timer);
      ws.close();
      resolve();
    } else if (event.type === "response.done") {
      clearTimeout(timer);
      ws.close();
      resolve();
    }
  });

  ws.on("error", (err) => {
    clearTimeout(timer);
    reject(err);
  });
});

try {
  await done;
  process.stdout.write("\n");
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
