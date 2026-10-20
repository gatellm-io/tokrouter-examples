# First Call with GPT-6.1 Sol (OpenAI SDK)

> Scenario 01 of the [gatellm examples](../../README.md).

The smallest possible change from a stock OpenAI program: keep the SDK, point `base_url` at the gateway.

| | |
|---|---|
| **Model** | `gpt-6.1-sol` |
| **Endpoint** | `POST /v1/chat/completions` |
| **base_url** | `${TOKROUTER_BASE_URL}/v1` |
| **SDK / client** | openai |

## Files

- Python: [`python/01_first_call.py`](../../python/01_first_call.py)
- TypeScript: [`typescript/src/01-first-call.ts`](../../typescript/src/01-first-call.ts)

## Request

```python
resp = client.chat.completions.create(
    model="gpt-6.1-sol",
    messages=[{"role": "user", "content": "Explain what an LLM gateway does in one sentence."}],
)
```

## Response (real, from a test gateway)

```text
An LLM gateway is a central interface that routes requests to language models while managing access, costs, rate limits, and monitoring.
```

## Other models on the same endpoint

`gpt-5.6-sol`, `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-6.1-sol-1m`

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
