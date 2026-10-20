# Gemini 3.8 Flash generateContent

> Scenario 06 of the [gatellm examples](../../README.md).

The Google Gen AI SDK appends `/v1beta/models/…` itself, so `base_url` is the gateway origin. Passing `${origin}/v1beta` would double the version segment.

| | |
|---|---|
| **Model** | `gemini-3.8-flash` |
| **Endpoint** | `POST /v1beta/models/{model}:generateContent` |
| **base_url** | `${TOKROUTER_BASE_URL} (origin)` |
| **SDK / client** | google-genai / @google/genai |

## Files

- Python: [`python/06_gemini.py`](../../python/06_gemini.py)
- TypeScript: [`typescript/src/06-gemini.ts`](../../typescript/src/06-gemini.ts)

## Request

```python
client = genai.Client(
    api_key=...,
    http_options=types.HttpOptions(base_url="https://api.tokrouter.dev"),
)
resp = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="What is the difference between a proxy and a router?",
)
```

## Response (real, from a test gateway)

```text
A router forwards by address; a proxy terminates the connection and fetches on your behalf…
```

## Other models on the same endpoint

`gemini-3.7-flash`, `gemini-3.5-flash-lite`, `gemini-3.1-pro-preview`, `gemini-3.1-flash-lite`

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
