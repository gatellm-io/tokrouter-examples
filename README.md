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

| # | Scenario | Endpoint | Python | TypeScript |
|---|---|---|---|---|
| 01 | First call | `POST /v1/chat/completions` | `01_first_call.py` | `01-first-call.ts` |
| 02 | Streaming | same, `stream: true` | `02_streaming.py` | `02-streaming.ts` |
| 03 | List models | `GET /v1/models` | `03_list_models.py` | `03-list-models.ts` |
| 04 | OpenAI Responses | `POST /v1/responses` | `04_responses.py` | `04-responses.ts` |
| 05 | Anthropic Messages | `POST /v1/messages` | `05_anthropic_messages.py` | `05-anthropic-messages.ts` |
| 06 | Gemini generateContent | `POST /v1beta/models/{model}:generateContent` | `06_gemini.py` | `06-gemini.ts` |
| 07 | DashScope native | `POST /v1/services/aigc/text-generation/generation` | `07_dashscope_native.py` | `07-dashscope-native.ts` |
| 08 | Embeddings | `POST /v1/embeddings` | `08_embeddings.py` | `08-embeddings.ts` |
| 09 | Rerank | `POST /v1/rerank` | `09_rerank.py` | `09-rerank.ts` |
| 10 | Image generation | `POST /v1/images/generations` | `10_images.py` | `10-images.ts` |
| 11 | Speech-to-text | `POST /v1/audio/transcriptions` | `11_audio_transcription.py` | `11-audio-transcription.ts` |
| 12 | Realtime voice (WebSocket) | `GET /v1/realtime` | `12_realtime.py` | `12-realtime.ts` |
| 13 | One SDK, many vendors | `POST /v1/chat/completions`, loop over models | `13_multi_vendor.py` | `13-multi-vendor.ts` |

Scenario 13 is the shortest possible demonstration of the product: the same client, the
same request shape, four different upstream vendors — only `model` changes.

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

Run any scenario by replacing `01` with `02` … `13`.

## 5. Model names

Defaults live in `.env.example` and in each file, and can be overridden per scenario:
`MODEL_CHAT`, `MODEL_STREAM`, `MODEL_RESPONSES`, `MODEL_ANTHROPIC`, `MODEL_GEMINI`,
`MODEL_DASHSCOPE`, `MODEL_EMBEDDING`, `MODEL_RERANK`, `MODEL_IMAGE`, `MODEL_TRANSCRIBE`,
`MODEL_REALTIME`, `MODELS_MULTI_VENDOR`.

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
