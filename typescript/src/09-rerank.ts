/** 09 · Rerank — POST /v1/rerank (also available as /v2/rerank). */
import { apiKey, baseUrl, heading, model, pretty } from "./common.js";

const resp = await fetch(`${baseUrl()}/v1/rerank`, {
  method: "POST",
  headers: { Authorization: `Bearer ${apiKey()}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    model: model("MODEL_RERANK", "bge-m3-reranker"),
    query: "How does a request reach the right model?",
    documents: [
      "A router picks an upstream and forwards the request.",
      "Sourdough needs a long, slow fermentation.",
      "The gateway meters usage and bills per token.",
    ],
  }),
});

heading(`rerank → HTTP ${resp.status}`);
if (!resp.ok) {
  console.error(await resp.text());
  process.exit(1);
}
pretty(await resp.json());
