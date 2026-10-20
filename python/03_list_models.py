"""03 · List models — GET /v1/models.

Use this first when a scenario returns `model_not_found`: it shows what the key can
actually call on this gateway.
"""

from openai import OpenAI

from common import api_key, heading, openai_base_url

client = OpenAI(base_url=openai_base_url(), api_key=api_key())

models = client.models.list()
ids = sorted(m.id for m in models.data)

heading(f"{len(ids)} models")
print("\n".join(ids))
