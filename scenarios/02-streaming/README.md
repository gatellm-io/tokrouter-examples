# Stream DeepSeek V4.1 Flash with the OpenAI SDK

> Scenario 02 of the [tokrouter examples](../../README.md).

SSE frames are forwarded unchanged. No proxy-buffering switch is needed on the client side.

| | |
|---|---|
| **Model** | `deepseek-v4.1-flash` |
| **Endpoint** | `POST /v1/chat/completions (`stream: true`)` |
| **base_url** | `${TOKROUTER_BASE_URL}/v1` |
| **SDK / client** | openai |

## Files

- Python: [`python/02_streaming.py`](../../python/02_streaming.py)
- TypeScript: [`typescript/src/02-streaming.ts`](../../typescript/src/02-streaming.ts)

## Request

```python
stream = client.chat.completions.create(
    model="deepseek-v4.1-flash",
    messages=[{"role": "user", "content": "Count from 1 to 10, separated by spaces."}],
    stream=True,
)
for chunk in stream:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="", flush=True)
```

## Response (real, from a test gateway)

```text
1 2 3 4 5 6 7 8 9 10
```

## Other models on the same endpoint

`deepseek-v4-pro`, `deepseek-v4-flash`

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
