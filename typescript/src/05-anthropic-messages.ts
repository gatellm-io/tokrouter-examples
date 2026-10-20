/**
 * 05 · Anthropic Messages — POST /v1/messages.
 *
 * The Anthropic SDK appends `/v1/messages` itself, so `baseURL` is the gateway origin —
 * not `${origin}/v1`.
 */
import Anthropic from "@anthropic-ai/sdk";

import { anthropicBaseUrl, apiKey, heading, model } from "./common.js";

const client = new Anthropic({ apiKey: apiKey(), baseURL: anthropicBaseUrl() });
const modelName = model("MODEL_ANTHROPIC", "claude-fable-5-1");

heading("messages");
const msg = await client.messages.create({
  model: modelName,
  max_tokens: 256,
  messages: [{ role: "user", content: "Explain prompt caching in two sentences." }],
});
for (const block of msg.content) {
  if (block.type === "text") console.log(block.text);
}

heading("messages (streaming)");
const stream = client.messages.stream({
  model: modelName,
  max_tokens: 256,
  messages: [{ role: "user", content: "Say goodbye in three languages." }],
});
for await (const event of stream) {
  if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
    process.stdout.write(event.delta.text);
  }
}
process.stdout.write("\n");
