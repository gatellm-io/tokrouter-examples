# Speech-to-Text with Whisper

> Scenario 11 of the [tokrouter examples](../../README.md).

Multipart upload. `assets/sample.wav` is a generated tone used only to exercise the endpoint — its transcript is not a speech-quality benchmark. Text-to-speech is intentionally absent: this catalog has no TTS-capable upstream.

| | |
|---|---|
| **Model** | `whisper` |
| **Endpoint** | `POST /v1/audio/transcriptions` |
| **base_url** | `${TOKROUTER_BASE_URL}/v1` |
| **SDK / client** | openai |

## Files

- Python: [`python/11_audio_transcription.py`](../../python/11_audio_transcription.py)
- TypeScript: [`typescript/src/11-audio-transcription.ts`](../../typescript/src/11-audio-transcription.ts)

## Request

```python
with open("assets/sample.wav", "rb") as fh:
    result = client.audio.transcriptions.create(model="whisper", file=fh)
print(result.text)
```

## Response (real, from a test gateway)

```text
text: 'Oh'  (a tone, not speech — expected)
```

## Other models on the same endpoint

`whisper-1`, `aliyun/qwen-audio-3.0-asr-flash-streaming`

Availability depends on the channels configured on your gateway; run scenario 03 to see
the authoritative list for your key.
