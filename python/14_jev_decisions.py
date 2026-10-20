"""14 · Jev decisions — POST /v1/systemone (TypeSafe System One).

Jev does not generate text. You send a piece of program `state` plus a map of
named, typed `questions`; it answers each one with a calibrated probability
distribution. The three question types are:

  · choice — pick one label from `criteria` (a {label: description} object)
  · score  — place the state on an ordered rubric; `criteria` is an ARRAY and the
             index is the level (0..n). An object here is rejected upstream (422).
  · noul   — a single probability that a statement is true

The client speaks the same wire as the upstream (identity translation), there is
no streaming, and there is no cross-protocol conversion to/from chat.
"""

import requests

from common import api_key, base_url, heading, model, pretty

MODEL = model("MODEL_JEV", "jev")

state = "A customer was charged twice and nobody has replied for three days."

questions = {
    "route": {
        "type": "choice",
        "instructions": "Which queue should this ticket go to?",
        "criteria": {
            "billing": "payment, refund, or duplicate-charge issue",
            "bug": "something in the product is broken",
            "sales": "pricing or upgrade question",
        },
    },
    "urgency": {
        "type": "score",
        "instructions": "How urgent is this ticket?",
        # Array, not object: index = level, so 0 is least urgent and 2 most urgent.
        "criteria": ["can wait a week", "reply within two days", "reply today"],
    },
    "angry": {
        "type": "noul",
        "instructions": "Is the customer angry?",
    },
}

resp = requests.post(
    f"{base_url()}/v1/systemone",
    headers={"Authorization": f"Bearer {api_key()}", "Content-Type": "application/json"},
    json={"model": MODEL, "state": state, "questions": questions},
    timeout=120,
)

heading(f"systemone → HTTP {resp.status_code}")
if not resp.ok:
    print(resp.text)
    raise SystemExit(1)

body = resp.json()
pretty(body)

answers = body["answers"]
heading("decision gate")
print(f"route    = {answers['route']['choice']!r} (confidence {answers['route']['confidence']:.2f})")
print(f"urgency  = {answers['urgency']['score']:.2f} (legend {answers['urgency']['legend']})")
print(f"angry    = {answers['angry']['noul']:.2f}")

if answers["route"]["confidence"] < 0.8:
    print("→ low confidence: hand this ticket to a human triager")
else:
    print(f"→ auto-route to the {answers['route']['choice']} queue")
