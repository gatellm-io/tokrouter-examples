"""06 · Gemini generateContent — POST /v1beta/models/{model}:generateContent.

`google-genai` appends `/v1beta/models/…` itself, so `base_url` is the gateway origin.
Passing `${origin}/v1beta` would double the version segment.
"""

from google import genai
from google.genai import types

from common import api_key, gemini_base_url, heading, model

client = genai.Client(
    api_key=api_key(),
    http_options=types.HttpOptions(base_url=gemini_base_url()),
)

heading("gemini generateContent")
resp = client.models.generate_content(
    model=model("MODEL_GEMINI", "gemini-3.8-flash"),
    contents="What is the difference between a proxy and a router?",
)
print(resp.text)
