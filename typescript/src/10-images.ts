/**
 * 10 · Image generation — POST /v1/images/generations.
 *
 * The response is base64 (`b64_json`), written to `out/` (git-ignored).
 */
import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";

import { ROOT, apiKey, heading, model, openaiBaseUrl } from "./common.js";

const client = new OpenAI({ baseURL: openaiBaseUrl(), apiKey: apiKey() });

heading("image generation");
const resp = await client.images.generate({
  model: model("MODEL_IMAGE", "gpt-image-2.5-sunburst"),
  prompt: "A tiny red cube on a plain white background, product photo, soft shadow",
  n: 1,
  size: "1024x1024",
});

const outDir = path.join(ROOT, "out");
fs.mkdirSync(outDir, { recursive: true });

for (const [i, item] of (resp.data ?? []).entries()) {
  if (!item.b64_json) {
    console.log(`image ${i}: no b64_json (url=${item.url ?? "none"})`);
    continue;
  }
  const file = path.join(outDir, `image-${i}.png`);
  fs.writeFileSync(file, Buffer.from(item.b64_json, "base64"));
  console.log(`wrote ${file} (${fs.statSync(file).size} bytes)`);
}
