# DashScope Native Path with Qwen 3.8 Max

> Scenario 07 of the [gatellm examples](../../README.md).

This is the DashScope wire format (`input` / `parameters`), not the OpenAI shape. The gateway exposes it under `/v1` with the official `/api` prefix removed.

| | |
|---|---|
| **Model** | `qwen3.8-max` |
| **Endpoint** | `POST /v1/services/aigc/text-generation/generation` |
| **base_url** | `${TOKROUTER_BASE_URL}` |
| **SDK / client** | plain HTTP |

## Files

- Python: [`python/07_dashscope_native.py`](../../python/07_dashscope_native.py)
- TypeScript: [`typescript/src/07-dashscope-native.ts`](../../typescript/src/07-dashscope-native.ts)

## Request

```python
requests.post(
    "https://api.tokrouter.dev/v1/services/aigc/text-generation/generation",
    headers={"Authorization": f"Bearer {key}"},
    json={
        "model": "qwen3.8-max",
        "input": {"messages": [{"role": "user", "content": "用一句话解释什么是模型路由。"}]},
        "parameters": {"result_format": "message"},
    },
)
```

## Response (real, from a test gateway)

```text
{"output": {"choices": [{"finish_reason": "stop", "message": {"content": [{"text": "…"}]}}]}, "usage": {"total_tokens": 148}}
```

## Other models on the same endpoint

`qwen3.8-flash`, `qwen3.7-plus`

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
