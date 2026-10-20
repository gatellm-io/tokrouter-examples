"""11 · Speech-to-text — POST /v1/audio/transcriptions.

`assets/sample.wav` is a short generated tone used only to exercise the endpoint; its
transcript is not a speech-quality benchmark.

Text-to-speech is intentionally not included: it needs an `openai_audio`-capable TTS
model, and this gateway's catalog has none (see README §6).
"""

from openai import OpenAI

from common import ROOT, api_key, heading, model, openai_base_url

client = OpenAI(base_url=openai_base_url(), api_key=api_key())
audio_path = ROOT / "assets" / "sample.wav"

heading("transcription")
with audio_path.open("rb") as fh:
    result = client.audio.transcriptions.create(
        model=model("MODEL_TRANSCRIBE", "whisper"),
        file=fh,
    )
print(f"file: {audio_path.name} ({audio_path.stat().st_size} bytes)")
print(f"text: {result.text!r}")
