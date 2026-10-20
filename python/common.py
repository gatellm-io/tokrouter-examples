"""Shared helpers for the Python examples.

Every example imports from here so the base-URL conventions and the key handling live in
exactly one place. If the gateway address changes, this is the only file to edit.
"""

from __future__ import annotations

import json
import os
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
DEFAULT_BASE_URL = "https://api.tokrouter.dev"


def load_env() -> None:
    """Load `<repo>/.env` without overriding variables already exported."""
    env_file = ROOT / ".env"
    if not env_file.exists():
        return
    for raw in env_file.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip("'").strip('"'))


def base_url() -> str:
    """Gateway origin, no trailing slash. This is the `base_url` for Anthropic/Gemini."""
    load_env()
    return os.environ.get("TOKROUTER_BASE_URL", DEFAULT_BASE_URL).rstrip("/")


def api_key() -> str:
    load_env()
    key = os.environ.get("TOKROUTER_API_KEY", "").strip()
    if not key:
        sys.exit(
            "TOKROUTER_API_KEY is not set.\n"
            "Create a key in the console, then:\n"
            "  export TOKROUTER_API_KEY=sk-...\n"
            "or copy .env.example to .env and fill it in."
        )
    return key


def model(env_name: str, default: str) -> str:
    """Per-scenario model name, overridable via the environment."""
    load_env()
    return os.environ.get(env_name, default).strip() or default


def openai_base_url() -> str:
    """OpenAI SDK: the SDK appends /chat/completions, /embeddings, … to this."""
    return f"{base_url()}/v1"


def anthropic_base_url() -> str:
    """Anthropic SDK: the SDK appends /v1/messages to this."""
    return base_url()


def gemini_base_url() -> str:
    """Google Gen AI SDK: the SDK appends /v1beta/models/… to this."""
    return base_url()


def heading(text: str) -> None:
    print(f"\n=== {text} ===")


def pretty(data: object, limit: int = 2000) -> None:
    text = json.dumps(data, ensure_ascii=False, indent=2)
    print(text if len(text) <= limit else text[:limit] + "\n… (truncated)")


def fail(prefix: str, exc: BaseException) -> None:
    print(f"{prefix}: {type(exc).__name__}: {exc}", file=sys.stderr)
    raise SystemExit(1)
