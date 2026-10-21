# Anthropic Messages with Claude Fable 5.1

> Scenario 05 of the [tokrouter examples](../../README.md).

The Anthropic SDK appends `/v1/messages` itself, so `base_url` is the gateway **origin** — not `${origin}/v1`.

| | |
|---|---|
| **Model** | `claude-fable-5-1` |
| **Endpoint** | `POST /v1/messages` |
| **base_url** | `${TOKROUTER_BASE_URL} (origin)` |
| **SDK / client** | anthropic |

## Files

- Python: [`python/05_anthropic_messages.py`](../../python/05_anthropic_messages.py)
- TypeScript: [`typescript/src/05-anthropic-messages.ts`](../../typescript/src/05-anthropic-messages.ts)

## Request

```python
client = Anthropic(api_key=..., base_url="https://api.tokrouter.dev")
msg = client.messages.create(
    model="claude-fable-5-1",
    max_tokens=256,
    messages=[{"role": "user", "content": "Explain prompt caching in two sentences."}],
)
```

## Response (real, from a test gateway)

```text
Prompt caching stores the computed representation of a repeated prompt prefix so later requests can reuse it instead of reprocessing those tokens.
```

## Other models on the same endpoint

`claude-opus-5-5`, `claude-opus-5`, `claude-sonnet-5.5`, `claude-sonnet-5`, `claude-haiku-4-5`

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
