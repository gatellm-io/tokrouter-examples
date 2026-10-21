# Jev Typed Decisions over TypeSafe System One

> Scenario 14 of the [tokrouter examples](../../README.md).

Jev does not generate text. Send a `state` plus named typed `questions`; it answers each with calibrated probabilities. `choice` takes an object of label → description, `score` takes an **array** (index = level; an object is rejected with 422), `noul` returns one probability. No streaming, and no cross-protocol conversion to/from chat.

| | |
|---|---|
| **Model** | `jev` |
| **Endpoint** | `POST /v1/systemone` |
| **base_url** | `${TOKROUTER_BASE_URL}` |
| **SDK / client** | plain HTTP |

## Files

- Python: [`python/14_jev_decisions.py`](../../python/14_jev_decisions.py)
- TypeScript: [`typescript/src/14-jev-decisions.ts`](../../typescript/src/14-jev-decisions.ts)

## Request

```python
requests.post("https://api.tokrouter.dev/v1/systemone", json={
    "model": "jev",
    "state": "A customer was charged twice and nobody has replied for three days.",
    "questions": {
        "route":   {"type": "choice", "instructions": "Which queue?",
                    "criteria": {"billing": "payment issue", "bug": "something broken"}},
        "urgency": {"type": "score", "instructions": "How urgent?",
                    "criteria": ["can wait", "two days", "today"]},
        "angry":   {"type": "noul", "instructions": "Is the customer angry?"},
    },
})
```

## Response (real, from a test gateway)

```text
route="billing" (confidence 1.00); urgency=1.89; angry=0.81; usage={"input_tokens":406,"output_tokens":70}
```

## Other models on the same endpoint

Any System One model served over `typesafe_system_one`

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
