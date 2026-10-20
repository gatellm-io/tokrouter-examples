/** 03 · List models — GET /v1/models. Run this first if another scenario says model_not_found. */
import OpenAI from "openai";

import { apiKey, heading, openaiBaseUrl } from "./common.js";

const client = new OpenAI({ baseURL: openaiBaseUrl(), apiKey: apiKey() });
const page = await client.models.list();
const ids = page.data.map((m) => m.id).sort();

heading(`${ids.length} models`);
console.log(ids.join("\n"));
