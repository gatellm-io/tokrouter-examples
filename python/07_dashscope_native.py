"""07 · DashScope native path — POST /v1/services/aigc/text-generation/generation.

This is the DashScope wire format (input/parameters), not the OpenAI shape. The gateway
exposes it under `/v1` with the official `/api` prefix removed.
"""

import requests

from common import api_key, base_url, heading, model, pretty

endpoint = f"{base_url()}/v1/services/aigc/text-generation/generation"
resp = requests.post(
    endpoint,
    headers={"Authorization": f"Bearer {api_key()}", "Content-Type": "application/json"},
    json={
        "model": model("MODEL_DASHSCOPE", "qwen3.8-max"),
        "input": {"messages": [{"role": "user", "content": "用一句话解释什么是模型路由。"}]},
        "parameters": {"result_format": "message"},
    },
    timeout=120,
)

heading(f"dashscope native → HTTP {resp.status_code}")
resp.raise_for_status()
pretty(resp.json())
