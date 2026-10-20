/** 02 · Streaming — the same request with `stream: true`. */
import OpenAI from "openai";

import { apiKey, heading, model, openaiBaseUrl } from "./common.js";

const client = new OpenAI({ baseURL: openaiBaseUrl(), apiKey: apiKey() });

heading("streaming completion");
const stream = await client.chat.completions.create({
  model: model("MODEL_STREAM", "deepseek-v4.1-flash"),
  messages: [{ role: "user", content: "Count from 1 to 10, separated by spaces." }],
  stream: true,
});

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content;
  if (delta) process.stdout.write(delta);
}

process.stdout.write("\n");
