# Rerank with BGE-M3 Reranker

> Scenario 09 of the [gatellm examples](../../README.md).

Rerank has no OpenAI SDK surface; the request is a plain JSON POST with `model`, `query` and `documents`.

| | |
|---|---|
| **Model** | `bge-m3-reranker` |
| **Endpoint** | `POST /v1/rerank (also /v2/rerank)` |
| **base_url** | `${TOKROUTER_BASE_URL}` |
| **SDK / client** | plain HTTP |

## Files

- Python: [`python/09_rerank.py`](../../python/09_rerank.py)
- TypeScript: [`typescript/src/09-rerank.ts`](../../typescript/src/09-rerank.ts)

## Request

```python
requests.post(
    "https://api.tokrouter.dev/v1/rerank",
    headers={"Authorization": f"Bearer {key}"},
    json={
        "model": "bge-m3-reranker",
        "query": "How does a request reach the right model?",
        "documents": ["A router picks an upstream…", "Sourdough needs…", "The gateway meters usage…"],
    },
)
```

## Response (real, from a test gateway)

```text
{"results": [{"index": 0, "relevance_score": 0.849}, {"index": 2, "relevance_score": 0.000016}, …]}
```

## Other models on the same endpoint

`qwen-rerank`, `qwen3.7-text-rerank` (availability depends on the gateway)

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
