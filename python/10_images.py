"""10 · Image generation — POST /v1/images/generations.

The response is base64 (`b64_json`), not a URL. The file is written to `out/`, which is
git-ignored.
"""

import base64
import pathlib

from openai import OpenAI

from common import ROOT, api_key, heading, model, openai_base_url

client = OpenAI(base_url=openai_base_url(), api_key=api_key())

heading("image generation")
resp = client.images.generate(
    model=model("MODEL_IMAGE", "gpt-image-2.5-sunburst"),
    prompt="A tiny red cube on a plain white background, product photo, soft shadow",
    n=1,
    size="1024x1024",
)

out_dir = ROOT / "out"
out_dir.mkdir(exist_ok=True)
for i, item in enumerate(resp.data):
    if not item.b64_json:
        print(f"image {i}: no b64_json (url={item.url!r})")
        continue
    path = out_dir / f"image-{i}.png"
    path.write_bytes(base64.b64decode(item.b64_json))
    print(f"wrote {path} ({path.stat().st_size} bytes)")
