"""02 · Streaming — the same request with `stream=True`.

The gateway forwards SSE frames unchanged; no proxy buffering setting is required on the
client side.
"""

from openai import OpenAI

from common import api_key, heading, model, openai_base_url

client = OpenAI(base_url=openai_base_url(), api_key=api_key())

heading("streaming completion")
stream = client.chat.completions.create(
    model=model("MODEL_STREAM", "deepseek-v4.1-flash"),
    messages=[{"role": "user", "content": "Count from 1 to 10, separated by spaces."}],
    stream=True,
)

for chunk in stream:
    delta = chunk.choices[0].delta.content if chunk.choices else None
    if delta:
        print(delta, end="", flush=True)

print()
