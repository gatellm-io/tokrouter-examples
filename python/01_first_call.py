"""01 · First call — POST /v1/chat/completions with the OpenAI SDK.

The only change from a stock OpenAI program is `base_url`.
"""

from openai import OpenAI

from common import api_key, heading, model, openai_base_url

client = OpenAI(base_url=openai_base_url(), api_key=api_key())

resp = client.chat.completions.create(
    model=model("MODEL_CHAT", "gpt-6.1-sol"),
    messages=[{"role": "user", "content": "Explain what an LLM gateway does in one sentence."}],
)

heading("chat completion")
print(resp.choices[0].message.content)
print(f"\nmodel={resp.model}  tokens={resp.usage.total_tokens if resp.usage else '?'}")
