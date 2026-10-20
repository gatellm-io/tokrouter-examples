"""05 · Anthropic Messages — POST /v1/messages.

The Anthropic SDK appends `/v1/messages` itself, so `base_url` is the gateway origin —
**not** `${origin}/v1` (that would produce `/v1/v1/messages`).
"""

from anthropic import Anthropic

from common import anthropic_base_url, api_key, heading, model

client = Anthropic(api_key=api_key(), base_url=anthropic_base_url())
model_name = model("MODEL_ANTHROPIC", "claude-fable-5-1")

heading("messages")
msg = client.messages.create(
    model=model_name,
    max_tokens=256,
    messages=[{"role": "user", "content": "Explain prompt caching in two sentences."}],
)
for block in msg.content:
    if getattr(block, "type", None) == "text":
        print(block.text)

heading("messages (streaming)")
with client.messages.stream(
    model=model_name,
    max_tokens=256,
    messages=[{"role": "user", "content": "Say goodbye in three languages."}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
print()
