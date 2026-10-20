/**
 * Shared helpers for the TypeScript examples.
 *
 * Every example imports from here so the base-URL conventions and key handling live in
 * exactly one place.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// src/ → typescript/ → repo root (where `.env` and `assets/` live)
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DEFAULT_BASE_URL = "https://api.tokrouter.dev";

/** Load `<repo>/.env` without overriding variables already exported. */
export function loadEnv(): void {
  const envFile = path.join(ROOT, ".env");
  if (!fs.existsSync(envFile)) return;
  for (const raw of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const idx = line.indexOf("=");
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}

/** Gateway origin, no trailing slash. `base_url` for Anthropic/Gemini. */
export function baseUrl(): string {
  loadEnv();
  return (process.env.TOKROUTER_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
}

export function apiKey(): string {
  loadEnv();
  const key = (process.env.TOKROUTER_API_KEY ?? "").trim();
  if (!key) {
    console.error(
      "TOKROUTER_API_KEY is not set.\n" +
        "Create a key in the console, then:\n" +
        "  export TOKROUTER_API_KEY=sk-...\n" +
        "or copy .env.example to .env and fill it in.",
    );
    process.exit(1);
  }
  return key;
}

/** Per-scenario model name, overridable via the environment. */
export function model(envName: string, fallback: string): string {
  loadEnv();
  return (process.env[envName] ?? "").trim() || fallback;
}

/** OpenAI SDK: the SDK appends /chat/completions, /embeddings, … to this. */
export const openaiBaseUrl = (): string => `${baseUrl()}/v1`;
/** Anthropic SDK: the SDK appends /v1/messages to this. */
export const anthropicBaseUrl = (): string => baseUrl();
/** Google Gen AI SDK: the SDK appends /v1beta/models/… to this. */
export const geminiBaseUrl = (): string => baseUrl();

export function heading(text: string): void {
  console.log(`\n=== ${text} ===`);
}

export function pretty(data: unknown, limit = 2000): void {
  const text = JSON.stringify(data, null, 2);
  console.log(text.length <= limit ? text : `${text.slice(0, limit)}\n… (truncated)`);
}
