# Image Generation with GPT Image 2.5 Sunburst

> Scenario 10 of the [tokrouter examples](../../README.md).

The response is base64 (`b64_json`), not a URL. The examples write the file to `out/`, which is git-ignored.

| | |
|---|---|
| **Model** | `gpt-image-2.5-sunburst` |
| **Endpoint** | `POST /v1/images/generations` |
| **base_url** | `${TOKROUTER_BASE_URL}/v1` |
| **SDK / client** | openai |

## Files

- Python: [`python/10_images.py`](../../python/10_images.py)
- TypeScript: [`typescript/src/10-images.ts`](../../typescript/src/10-images.ts)

## Request

```python
client.images.generate(
    model="gpt-image-2.5-sunburst",
    prompt="A tiny red cube on a plain white background, product photo, soft shadow",
    n=1,
    size="1024x1024",
)
```

## Response (real, from a test gateway)

```text
wrote out/image-0.png (≈190 KB)
```

## Other models on the same endpoint

`gpt-image-2.5-flare`, `gpt-image-2`, `gemini-3-pro-image-preview`

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
