# Embeddings with text-embedding-v4

> Scenario 08 of the [tokrouter examples](../../README.md).

Embedding dimensions are model-specific; the example prints the dimension so a mismatch with your vector store is obvious immediately.

| | |
|---|---|
| **Model** | `text-embedding-v4` |
| **Endpoint** | `POST /v1/embeddings` |
| **base_url** | `${TOKROUTER_BASE_URL}/v1` |
| **SDK / client** | openai |

## Files

- Python: [`python/08_embeddings.py`](../../python/08_embeddings.py)
- TypeScript: [`typescript/src/08-embeddings.ts`](../../typescript/src/08-embeddings.ts)

## Request

```python
resp = client.embeddings.create(
    model="text-embedding-v4",
    input=["The router selects an upstream.", "A different sentence entirely."],
)
```

## Response (real, from a test gateway)

```text
index=0 dim=1024 head=[-0.0342, 0.0233, -0.0205, 0.0257]
```

## Other models on the same endpoint

`text-embedding-3-small` (1536 dims), `bge-m3-embedding`

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
