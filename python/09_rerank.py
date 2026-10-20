"""09 · Rerank — POST /v1/rerank (also available as /v2/rerank).

Rerank has no OpenAI SDK surface; the request is a plain JSON POST.
"""

import requests

from common import api_key, base_url, heading, model, pretty

resp = requests.post(
    f"{base_url()}/v1/rerank",
    headers={"Authorization": f"Bearer {api_key()}", "Content-Type": "application/json"},
    json={
        "model": model("MODEL_RERANK", "bge-m3-reranker"),
        "query": "How does a request reach the right model?",
        "documents": [
            "A router picks an upstream and forwards the request.",
            "Sourdough needs a long, slow fermentation.",
            "The gateway meters usage and bills per token.",
        ],
    },
    timeout=60,
)

heading(f"rerank → HTTP {resp.status_code}")
resp.raise_for_status()
pretty(resp.json())
