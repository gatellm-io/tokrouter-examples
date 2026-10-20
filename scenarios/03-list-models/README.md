# List Every Model Your Key Can Call

> Scenario 03 of the [gatellm examples](../../README.md).

Run this first when another scenario returns `model_not_found`: it reports the authoritative catalog for your key and gateway.

| | |
|---|---|
| **Model** | `(all models)` |
| **Endpoint** | `GET /v1/models` |
| **base_url** | `${TOKROUTER_BASE_URL}/v1` |
| **SDK / client** | openai |

## Files

- Python: [`python/03_list_models.py`](../../python/03_list_models.py)
- TypeScript: [`typescript/src/03-list-models.ts`](../../typescript/src/03-list-models.ts)

## Request

```python
models = client.models.list()
print("\n".join(sorted(m.id for m in models.data)))
```

## Response (real, from a test gateway)

```text
A sorted list of model ids, one per line (the catalog changes as channels are enabled).
```

## Other models on the same endpoint

—

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
