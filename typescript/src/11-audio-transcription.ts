/**
 * 11 · Speech-to-text — POST /v1/audio/transcriptions.
 *
 * `assets/sample.wav` is a generated tone used only to exercise the endpoint; its
 * transcript is not a speech-quality benchmark. Text-to-speech is intentionally not
 * included (see README §6).
 */
import fs from "node:fs";
import path from "node:path";
import OpenAI, { toFile } from "openai";

import { ROOT, apiKey, heading, model, openaiBaseUrl } from "./common.js";

const client = new OpenAI({ baseURL: openaiBaseUrl(), apiKey: apiKey() });
const audioPath = path.join(ROOT, "assets", "sample.wav");

heading("transcription");
const result = await client.audio.transcriptions.create({
  model: model("MODEL_TRANSCRIBE", "whisper"),
  file: await toFile(fs.createReadStream(audioPath), "sample.wav", { type: "audio/wav" }),
});

console.log(`file: ${path.basename(audioPath)} (${fs.statSync(audioPath).size} bytes)`);
console.log(`text: ${JSON.stringify(result.text)}`);
