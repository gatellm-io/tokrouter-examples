/**
 * 06 · Gemini generateContent — POST /v1beta/models/{model}:generateContent.
 *
 * `@google/genai` appends `/v1beta/models/…` itself, so `baseUrl` is the gateway origin.
 */
import { GoogleGenAI } from "@google/genai";

import { apiKey, geminiBaseUrl, heading, model } from "./common.js";

const ai = new GoogleGenAI({
  apiKey: apiKey(),
  httpOptions: { baseUrl: geminiBaseUrl() },
});

heading("gemini generateContent");
const resp = await ai.models.generateContent({
  model: model("MODEL_GEMINI", "gemini-3.8-flash"),
  contents: "What is the difference between a proxy and a router?",
});

console.log(resp.text ?? "(empty)");
