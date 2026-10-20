# OpenAI Responses API with GPT-6 Luna

> Scenario 04 of the [gatellm examples](../../README.md).

The Responses shape is not Chat Completions. Reasoning models may return several output items; the text lives in `output[*].content[*].text`, exposed by the SDK as `output_text`.

| | |
|---|---|
| **Model** | `gpt-6-luna` |
| **Endpoint** | `POST /v1/responses` |
| **base_url** | `${TOKROUTER_BASE_URL}/v1` |
| **SDK / client** | openai |

## Files

- Python: [`python/04_responses.py`](../../python/04_responses.py)
- TypeScript: [`typescript/src/04-responses.ts`](../../typescript/src/04-responses.ts)

## Request

```python
resp = client.responses.create(
    model="gpt-6-luna",
    input="Write a haiku about routing requests.",
)
print(resp.output_text)
```

## Response (real, from a test gateway)

```text
Requests find their way  
Packets take the shortest route  
Answers reach the door
```

## Other models on the same endpoint

`gpt-5.6-sol`, `gpt-6.1-sol`

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
