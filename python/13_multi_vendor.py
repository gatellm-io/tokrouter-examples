"""13 · One SDK, many vendors — the same request, different `model` values.

This is the whole point of the gateway in one file: no per-vendor client, no per-vendor
request shape. A failing model is reported and the loop continues, so one unavailable
channel does not hide the rest.
"""

from openai import OpenAI

from common import api_key, heading, model, openai_base_url

client = OpenAI(base_url=openai_base_url(), api_key=api_key())

models = [
    m.strip()
    for m in model("MODELS_MULTI_VENDOR", "kimi-k3,glm-5.3,grok-4.7,qwen3.7-plus").split(",")
    if m.strip()
]

for name in models:
    try:
        resp = client.chat.completions.create(
            model=name,
            # 256 rather than 64: reasoning models spend the budget on reasoning first,
            # and a 64-token cap can leave `content` empty with finish_reason=length.
            max_tokens=256,
            messages=[{"role": "user", "content": "Reply with exactly: ok"}],
        )
        text = resp.choices[0].message.content
        print(f"{name:20} OK   {text!r}")
    except Exception as exc:  # noqa: BLE001 - one bad channel must not stop the demo
        print(f"{name:20} FAIL {type(exc).__name__}: {str(exc)[:160]}")
