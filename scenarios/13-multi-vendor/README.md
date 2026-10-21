# One SDK, Four Vendors: Kimi K3, GLM-5.3, Grok 4.7, Qwen 3.7 Plus

> Scenario 13 of the [tokrouter examples](../../README.md).

The core point of the gateway in one file: same client, same request shape, four upstream vendors — only `model` changes. A failing model is reported and the loop continues.

| | |
|---|---|
| **Model** | `kimi-k3, glm-5.3, grok-4.7, qwen3.7-plus` |
| **Endpoint** | `POST /v1/chat/completions` |
| **base_url** | `${TOKROUTER_BASE_URL}/v1` |
| **SDK / client** | openai |

## Files

- Python: [`python/13_multi_vendor.py`](../../python/13_multi_vendor.py)
- TypeScript: [`typescript/src/13-multi-vendor.ts`](../../typescript/src/13-multi-vendor.ts)

## Request

```python
for name in ["kimi-k3", "glm-5.3", "grok-4.7", "qwen3.7-plus"]:
    resp = client.chat.completions.create(
        model=name, max_tokens=256,
        messages=[{"role": "user", "content": "Reply with exactly: ok"}],
    )
```

## Response (real, from a test gateway)

```text
kimi-k3 OK 'ok' / glm-5.3 OK 'ok' / grok-4.7 OK 'ok' / qwen3.7-plus OK 'ok'
```

## Other models on the same endpoint

`kimi-k2.6-turbo`, `glm-5.3-flash`, `grok-4.6`, `qwen3.8-flash`

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
