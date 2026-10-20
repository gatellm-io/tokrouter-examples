# gatellm examples

Minimal, runnable examples for every endpoint family the gateway exposes.
Each scenario exists twice — Python (`python/`) and TypeScript (`typescript/`) — and is a
single file you can copy into your own project.

The point of every example is the same: **keep your existing SDK and code, change only
`base_url`.** If a snippet needs anything beyond that, it is called out in its header.

## 1. Get an API key

Create a key in the console, then provide it through the environment:

```bash
export TOKROUTER_API_KEY=sk-...
export TOKROUTER_BASE_URL=https://api.tokrouter.dev   # optional; this is the default
```

Or copy `.env.example` to `.env` and fill it in. `.env` is git-ignored.

> Never commit a key. The examples read it from the environment only.

## 2. Base URL per protocol

| You use | `base_url` to configure | The SDK appends |
|---|---|---|
| OpenAI SDK | `${TOKROUTER_BASE_URL}/v1` | `/chat/completions`, `/responses`, `/embeddings`, … |
| Anthropic SDK | `${TOKROUTER_BASE_URL}` | `/v1/messages` |
| Google Gen AI SDK | `${TOKROUTER_BASE_URL}` | `/v1beta/models/…:generateContent` |
| DashScope native / rerank | `${TOKROUTER_BASE_URL}` | the full path shown in each file |

The three forms differ on purpose — each SDK owns its own path convention. See
`python/common.py` and `typescript/src/common.ts`, which centralise this so no example
hardcodes it twice.

## 3. Scenarios

| # | Scenario | Model | Endpoint | Python | TypeScript |
|---|---|---|---|---|---|
| 01 | First call | `gpt-6.1-sol` | `POST /v1/chat/completions` | `01_first_call.py` | `01-first-call.ts` |
| 02 | Streaming | `deepseek-v4.1-flash` | same, `stream: true` | `02_streaming.py` | `02-streaming.ts` |
| 03 | List models | (lists the catalog) | `GET /v1/models` | `03_list_models.py` | `03-list-models.ts` |
| 04 | OpenAI Responses | `gpt-6-luna` | `POST /v1/responses` | `04_responses.py` | `04-responses.ts` |
| 05 | Anthropic Messages | `claude-fable-5-1` | `POST /v1/messages` | `05_anthropic_messages.py` | `05-anthropic-messages.ts` |
| 06 | Gemini generateContent | `gemini-3.8-flash` | `POST /v1beta/models/{model}:generateContent` | `06_gemini.py` | `06-gemini.ts` |
| 07 | DashScope native | `qwen3.8-max` | `POST /v1/services/aigc/text-generation/generation` | `07_dashscope_native.py` | `07-dashscope-native.ts` |
| 08 | Embeddings | `text-embedding-v4` | `POST /v1/embeddings` | `08_embeddings.py` | `08-embeddings.ts` |
| 09 | Rerank | `bge-m3-reranker` | `POST /v1/rerank` | `09_rerank.py` | `09-rerank.ts` |
| 10 | Image generation | `gpt-image-2.5-sunburst` | `POST /v1/images/generations` | `10_images.py` | `10-images.ts` |
| 11 | Speech-to-text | `whisper` | `POST /v1/audio/transcriptions` | `11_audio_transcription.py` | `11-audio-transcription.ts` |
| 12 | Realtime voice (WebSocket) | `aliyun/qwen3.5-omni-plus-realtime` | `GET /v1/realtime` | `12_realtime.py` | `12-realtime.ts` |
| 13 | One SDK, many vendors | `kimi-k3`, `glm-5.3`, `grok-4.7`, `qwen3.7-plus` | `POST /v1/chat/completions`, loop over models | `13_multi_vendor.py` | `13-multi-vendor.ts` |
| 14 | Jev typed decisions | `jev` | `POST /v1/systemone` | `14_jev_decisions.py` | `14-jev-decisions.ts` |

Every scenario uses a **different** model, so the repository covers a broad slice of the
catalog rather than repeating one. Scenario 13 is the shortest demonstration of the core
idea: same client, same request shape, four upstream vendors — only `model` changes.
Scenario 14 is the opposite extreme: a decision protocol where the request is not a chat
payload at all.

Each scenario also has its own README under `scenarios/`, with the model name, endpoint,
request shape and a real response excerpt.

## 4. Run

### Python

```bash
cd python
python -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
python 01_first_call.py
```

### TypeScript (Node 18+)

```bash
cd typescript
npm install
npm run 01
npm run typecheck   # compile all examples without running them
```

Run any scenario by replacing `01` with `02` … `14`.

## 5. Model names

Defaults live in `.env.example` and in each file, and can be overridden per scenario:
`MODEL_CHAT`, `MODEL_STREAM`, `MODEL_RESPONSES`, `MODEL_ANTHROPIC`, `MODEL_GEMINI`,
`MODEL_DASHSCOPE`, `MODEL_EMBEDDING`, `MODEL_RERANK`, `MODEL_IMAGE`, `MODEL_TRANSCRIBE`,
`MODEL_REALTIME`, `MODELS_MULTI_VENDOR`, `MODEL_JEV`.

## 6. Supported models

The catalog behind this gateway is large. Below is the public list grouped by vendor, with
the endpoint family each model uses and the scenario that demonstrates it. **This is a
snapshot, not a promise**: what *your* key can call depends on the channels configured on
your gateway — `03_list_models` is the authority.

### OpenAI

| Model | Endpoint | Scenario |
|---|---|---|
| `gpt-6.1-sol` | `/v1/chat/completions` | 01 |
| `gpt-6.1-sol-1m` | `/v1/chat/completions` | 01 |
| `gpt-6-luna` | `/v1/responses` | 04 |
| `gpt-5.6-sol` | `/v1/chat/completions` | 01 |
| `gpt-5.6-terra` | `/v1/chat/completions` | 01 |
| `gpt-5.5` | `/v1/chat/completions` | 01 |
| `gpt-5.4` | `/v1/chat/completions` | 01 |
| `gpt-5.4-mini` | `/v1/chat/completions` | 01 |
| `gpt-5.4-nano` | `/v1/chat/completions` | 01 |
| `gpt-image-2` | `/v1/images/generations` | 10 |
| `gpt-image-2.5-flare` | `/v1/images/generations` | 10 |
| `gpt-image-2.5-sunburst` | `/v1/images/generations` | 10 |
| `text-embedding-3-small` | `/v1/embeddings` | 08 |

### Anthropic

| Model | Endpoint | Scenario |
|---|---|---|
| `claude-fable-5-1` | `/v1/messages` | 05 |
| `claude-opus-5-5` | `/v1/messages` | 05 |
| `claude-opus-5` | `/v1/messages` | 05 |
| `claude-sonnet-5.5` | `/v1/messages` | 05 |
| `claude-sonnet-5` | `/v1/messages` | 05 |
| `claude-haiku-4-5` | `/v1/messages` | 05 |
| `claude-haiku-4-5-20251001` | `/v1/messages` | 05 |

### Google

| Model | Endpoint | Scenario |
|---|---|---|
| `gemini-3.8-flash` | `/v1beta/models/{model}:generateContent` | 06 |
| `gemini-3.7-flash` | `/v1beta/models/{model}:generateContent` | 06 |
| `gemini-3.5-flash-lite` | `/v1beta/models/{model}:generateContent` | 06 |
| `gemini-3.1-pro-preview` | `/v1beta/models/{model}:generateContent` | 06 |
| `gemini-3.1-flash-lite` | `/v1beta/models/{model}:generateContent` | 06 |
| `gemini-3.1-flash-image-preview` | `/v1/chat/completions` (modality-routed) | 06 |
| `gemini-3-pro-image-preview` | image generation | 10 |

### DeepSeek

| Model | Endpoint | Scenario |
|---|---|---|
| `deepseek-v4.1-flash` | `/v1/chat/completions` | 02 |
| `deepseek-v4-pro` | `/v1/chat/completions` | 02 |
| `deepseek-v4-flash` | `/v1/chat/completions` | 02 |

### Alibaba / Qwen

| Model | Endpoint | Scenario |
|---|---|---|
| `qwen3.8-max` | `/v1/services/aigc/text-generation/generation` | 07 |
| `qwen3.8-flash` | `/v1/chat/completions` | 07 |
| `qwen3.7-plus` | `/v1/chat/completions` | 13 |
| `qwen3.7-plus-1m` | `/v1/chat/completions` | 13 |
| `qwen-flash` | `/v1/chat/completions` | 13 |
| `qwen-rerank` | `/v1/rerank` | 09 |
| `qwen3.7-text-rerank` | `/v1/rerank` | 09 |
| `text-embedding-v4` | `/v1/embeddings` | 08 |
| `bge-m3-embedding` | `/v1/embeddings` | 08 |
| `bge-m3-reranker` | `/v1/rerank` | 09 |
| `aliyun/qwen-audio-3.0-asr-flash-streaming` | `/v1/audio/transcriptions` | 11 |
| `aliyun/qwen3.5-omni-plus-realtime` | `/v1/realtime` (WebSocket) | 12 |

### Zhipu, Moonshot, xAI

| Model | Vendor | Endpoint | Scenario |
|---|---|---|---|
| `glm-5.3` | Zhipu | `/v1/chat/completions` | 13 |
| `glm-5.3-flash` | Zhipu | `/v1/chat/completions` | 13 |
| `glm-4.7` | Zhipu | `/v1/chat/completions` | 13 |
| `kimi-k3` | Moonshot | `/v1/chat/completions` | 13 |
| `kimi-k2.6-turbo` | Moonshot | `/v1/chat/completions` | 13 |
| `grok-4.7` | xAI | `/v1/chat/completions` | 13 |
| `grok-4.6` | xAI | `/v1/chat/completions` | 13 |

### Audio and decisions

| Model | Endpoint | Scenario |
|---|---|---|
| `whisper` | `/v1/audio/transcriptions` | 11 |
| `whisper-1` | `/v1/audio/transcriptions` | 11 |
| `jev` | `/v1/systemone` | 14 |

## 7. Jev and the TypeSafe System One protocol

`jev` is not a chat model. It answers **typed decisions** instead of writing text:

```json
{
  "model": "jev",
  "state": "A customer was charged twice and nobody has replied for three days.",
  "questions": {
    "route":   { "type": "choice", "instructions": "Which queue?", "criteria": { "billing": "payment issue", "bug": "something broken" } },
    "urgency": { "type": "score",  "instructions": "How urgent?", "criteria": ["can wait", "two days", "today"] },
    "angry":   { "type": "noul",   "instructions": "Is the customer angry?" }
  }
}
```

- `choice` — one label from `criteria` (an object of label → description), plus a
  probability for every label.
- `score` — a probability-weighted level on an ordered rubric. `criteria` **must be an
  array**; the index is the level (0..n). An object is rejected with 422.
- `noul` — a single probability that the statement is true.

The response is `{model, answers, usage}`. There is **no streaming** and **no
cross-protocol conversion** to or from chat: the client speaks the System One wire, so
this endpoint is an identity passthrough. See scenario 14.

**A model name in this repository is a default, not a guarantee.** Which models your key
can call depends on the upstream channels configured on your gateway. If a scenario
returns `model_not_found` or an upstream `404`, list what you actually have and point the
corresponding `MODEL_*` variable at it:

```bash
python 03_list_models.py
```

## 6. Notes and known limits

- **Realtime (12)** speaks the OpenAI Realtime client protocol (`Authorization` header +
  `OpenAI-Beta: realtime=v1`, `?model=`). Upstream may be OpenAI or DashScope; the gateway
  bridges between them. Audio sample rates differ per upstream (OpenAI 24 kHz in/out,
  DashScope 16 kHz in / 24 kHz out) and the gateway does **not** resample.
  Text deltas arrive as `response.text.delta` on DashScope upstreams and
  `response.output_text.delta` on OpenAI ones; the example handles both.
- **Text-to-speech** is intentionally absent. The gateway has no TTS model in its catalog;
  `POST /v1/audio/speech` requires an `openai_audio`-capable upstream that this deployment
  does not expose. Adding a scenario that always returns 404 would be worse than saying so.
- **Images** return base64; the examples write the file to `out/` (git-ignored). Some image
  models are chat-routed and reject `/v1/images/generations`; the default here is one that
  works, and the error appears verbatim if your gateway differs.
- `assets/sample.wav` is a short generated tone used only to exercise the transcription
  endpoint. Its transcript is meaningless — it is not a speech-quality benchmark.
- These examples demonstrate endpoints, not billing or governance. Check the console for
  actual usage and cost.

## 7. License

MIT. See `LICENSE`.
