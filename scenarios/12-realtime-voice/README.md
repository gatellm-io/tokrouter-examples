# Realtime Voice with Qwen 3.5 Omni Plus

> Scenario 12 of the [gatellm examples](../../README.md).

The client speaks the OpenAI Realtime protocol (`Authorization` header, `OpenAI-Beta: realtime=v1`, `?model=`); the gateway bridges to an OpenAI or DashScope upstream. Text deltas arrive as `response.text.delta` on DashScope and `response.output_text.delta` on OpenAI — the examples handle both. Audio sample rates differ per upstream and the gateway does not resample.

| | |
|---|---|
| **Model** | `aliyun/qwen3.5-omni-plus-realtime` |
| **Endpoint** | `GET /v1/realtime (WebSocket)` |
| **base_url** | `${TOKROUTER_BASE_URL} → ws(s)://` |
| **SDK / client** | websockets / ws |

## Files

- Python: [`python/12_realtime.py`](../../python/12_realtime.py)
- TypeScript: [`typescript/src/12-realtime.ts`](../../typescript/src/12-realtime.ts)

## Request

```python
ws.send(json.dumps({
    "type": "response.create",
    "response": {"modalities": ["text"], "instructions": "Say a short greeting in one sentence."},
}))
```

## Response (real, from a test gateway)

```text
Hello and welcome!
```

## Other models on the same endpoint

Any realtime model configured on your gateway

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
