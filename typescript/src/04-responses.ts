/**
 * 04 · OpenAI Responses API — POST /v1/responses.
 *
 * The text is not in `choices[*].message.content`: it lives in
 * `output[*].content[*].text`. `output_text` is the SDK accessor.
 */
import OpenAI from "openai";

import { apiKey, heading, model, openaiBaseUrl } from "./common.js";

const client = new OpenAI({ baseURL: openaiBaseUrl(), apiKey: apiKey() });

heading("responses");
const resp = await client.responses.create({
  model: model("MODEL_RESPONSES", "gpt-6-luna"),
  input: "Write a haiku about routing requests.",
});

console.log(resp.output_text);

for (const item of resp.output) {
  if (item.type !== "message") continue;
  for (const part of item.content ?? []) {
    if (part.type === "output_text") console.log(`\n[output_text] ${JSON.stringify(part.text)}`);
  }
}
