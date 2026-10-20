/** 08 · Embeddings — POST /v1/embeddings. The dimension is model-specific. */
import OpenAI from "openai";

import { apiKey, heading, model, openaiBaseUrl } from "./common.js";

const client = new OpenAI({ baseURL: openaiBaseUrl(), apiKey: apiKey() });

heading("embeddings");
const resp = await client.embeddings.create({
  model: model("MODEL_EMBEDDING", "text-embedding-v4"),
  input: ["The router selects an upstream.", "A different sentence entirely."],
});

for (const item of resp.data) {
  console.log(`index=${item.index} dim=${item.embedding.length} head=${item.embedding.slice(0, 4)}`);
}
console.log(`\ntokens=${resp.usage?.total_tokens ?? "?"}`);
