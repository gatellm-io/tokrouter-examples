"""04 · OpenAI Responses API — POST /v1/responses.

The Responses shape is not Chat Completions: reasoning models may return several output
items, and the text lives in `output[*].content[*].text`. The SDK exposes
`response.output_text` as the convenient accessor.
"""

from openai import OpenAI

from common import api_key, heading, model, openai_base_url

client = OpenAI(base_url=openai_base_url(), api_key=api_key())

heading("responses")
resp = client.responses.create(
    model=model("MODEL_RESPONSES", "gpt-6-luna"),
    input="Write a haiku about routing requests.",
)

print(resp.output_text)

# Show the structure briefly, so it is obvious where the text came from.
for item in resp.output:
    if getattr(item, "type", None) == "message":
        for part in getattr(item, "content", []) or []:
            if getattr(part, "type", None) == "output_text":
                print(f"\n[output_text] {part.text!r}")
