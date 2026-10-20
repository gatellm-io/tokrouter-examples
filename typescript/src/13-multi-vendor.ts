/**
 * 13 · One SDK, many vendors — the same request, different `model` values.
 *
 * A failing model is reported and the loop continues, so one unavailable channel does not
 * hide the rest.
 */
import OpenAI from "openai";

import { apiKey, model, openaiBaseUrl } from "./common.js";

const client = new OpenAI({ baseURL: openaiBaseUrl(), apiKey: apiKey() });

const models = (process.env.MODELS_MULTI_VENDOR ?? model("MODELS_MULTI_VENDOR", "kimi-k3,glm-5.3,grok-4.7,qwen3.8-max"))
  .split(",")
  .map((m) => m.trim())
  .filter(Boolean);

for (const name of models) {
  try {
    const resp = await client.chat.completions.create({
      model: name,
      // 256 rather than 64: reasoning models spend the budget on reasoning first.
      max_tokens: 256,
      messages: [{ role: "user", content: "Reply with exactly: ok" }],
    });
    console.log(`${name.padEnd(20)} OK   ${JSON.stringify(resp.choices[0]?.message?.content ?? null)}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.log(`${name.padEnd(20)} FAIL ${message.slice(0, 160)}`);
  }
}
