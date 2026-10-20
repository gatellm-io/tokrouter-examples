/**
 * 07 · DashScope native path — POST /v1/services/aigc/text-generation/generation.
 *
 * This is the DashScope wire format (input/parameters), not the OpenAI shape.
 */
import { apiKey, baseUrl, heading, model, pretty } from "./common.js";

const endpoint = `${baseUrl()}/v1/services/aigc/text-generation/generation`;
const resp = await fetch(endpoint, {
  method: "POST",
  headers: { Authorization: `Bearer ${apiKey()}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    model: model("MODEL_DASHSCOPE", "qwen3.8-max"),
    input: { messages: [{ role: "user", content: "用一句话解释什么是模型路由。" }] },
    parameters: { result_format: "message" },
  }),
});

heading(`dashscope native → HTTP ${resp.status}`);
if (!resp.ok) {
  console.error(await resp.text());
  process.exit(1);
}
pretty(await resp.json());
