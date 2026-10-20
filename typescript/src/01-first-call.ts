/** 01 · First call — POST /v1/chat/completions with the OpenAI SDK. */
import OpenAI from "openai";

import { apiKey, heading, model, openaiBaseUrl } from "./common.js";

const client = new OpenAI({ baseURL: openaiBaseUrl(), apiKey: apiKey() });

const resp = await client.chat.completions.create({
  model: model("MODEL_CHAT", "gpt-6.1-sol"),
  messages: [{ role: "user", content: "Explain what an LLM gateway does in one sentence." }],
});

heading("chat completion");
console.log(resp.choices[0]?.message?.content ?? "(empty)");
console.log(`\nmodel=${resp.model}  tokens=${resp.usage?.total_tokens ?? "?"}`);
