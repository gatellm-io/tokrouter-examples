/**
 * 14 · Jev decisions — POST /v1/systemone (TypeSafe System One).
 *
 * Jev does not generate text. Send a `state` plus a map of named, typed
 * `questions`; it answers each with a calibrated probability distribution.
 *
 *   · choice — pick one label from `criteria` ({label: description})
 *   · score  — ordered rubric; `criteria` is an ARRAY and the index is the level
 *              (0..n). An object here is rejected upstream (422).
 *   · noul   — one probability that a statement is true
 *
 * The client speaks the upstream wire (identity translation): no streaming and
 * no cross-protocol conversion to/from chat.
 */
import { apiKey, baseUrl, heading, model, pretty } from "./common.js";

const MODEL = model("MODEL_JEV", "jev");

const state = "A customer was charged twice and nobody has replied for three days.";

const questions = {
  route: {
    type: "choice",
    instructions: "Which queue should this ticket go to?",
    criteria: {
      billing: "payment, refund, or duplicate-charge issue",
      bug: "something in the product is broken",
      sales: "pricing or upgrade question",
    },
  },
  urgency: {
    type: "score",
    instructions: "How urgent is this ticket?",
    // Array, not object: index = level.
    criteria: ["can wait a week", "reply within two days", "reply today"],
  },
  angry: {
    type: "noul",
    instructions: "Is the customer angry?",
  },
};

const resp = await fetch(`${baseUrl()}/v1/systemone`, {
  method: "POST",
  headers: { Authorization: `Bearer ${apiKey()}`, "Content-Type": "application/json" },
  body: JSON.stringify({ model: MODEL, state, questions }),
});

heading(`systemone → HTTP ${resp.status}`);
if (!resp.ok) {
  console.error(await resp.text());
  process.exit(1);
}

const body = (await resp.json()) as {
  answers: {
    route: { choice: string; confidence: number };
    urgency: { score: number; legend: Record<string, string> };
    angry: { noul: number };
  };
};

pretty(body);

const { route, urgency, angry } = body.answers;
heading("decision gate");
console.log(`route    = ${JSON.stringify(route.choice)} (confidence ${route.confidence.toFixed(2)})`);
console.log(`urgency  = ${urgency.score.toFixed(2)} (legend ${JSON.stringify(urgency.legend)})`);
console.log(`angry    = ${angry.noul.toFixed(2)}`);

if (route.confidence < 0.8) {
  console.log("→ low confidence: hand this ticket to a human triager");
} else {
  console.log(`→ auto-route to the ${route.choice} queue`);
}
