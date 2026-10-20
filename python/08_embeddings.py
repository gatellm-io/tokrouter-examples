"""08 · Embeddings — POST /v1/embeddings.

Embedding dimension is model-specific; the example prints it so a mismatch with your
vector store is obvious immediately.
"""

from openai import OpenAI

from common import api_key, heading, model, openai_base_url

client = OpenAI(base_url=openai_base_url(), api_key=api_key())

heading("embeddings")
resp = client.embeddings.create(
    model=model("MODEL_EMBEDDING", "text-embedding-v4"),
    input=["The router selects an upstream.", "A different sentence entirely."],
)

for item in resp.data:
    vec = item.embedding
    print(f"index={item.index} dim={len(vec)} head={vec[:4]}")
print(f"\ntokens={resp.usage.total_tokens if resp.usage else '?'}")
