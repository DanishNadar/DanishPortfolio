#!/usr/bin/env python3
"""Local DN avatar bridge for Ditto/Live-Avatar integrations.

This keeps the portfolio app lightweight. The browser talks to this local
HTTP bridge when the DN engine opens; the bridge owns heavyweight model setup.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import os
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_IMAGE = ROOT / "public" / "avatar" / "danish.jpg"
DEFAULT_WORKSPACE = ROOT / ".avatar-runtime"
DEFAULT_OUTPUT_DIR = ROOT / "public" / "avatar" / "generated"
DEFAULT_QWEN_VENV = DEFAULT_WORKSPACE / "qwen-tts-venv"
DEFAULT_SAMPLE_A = ROOT / "public" / "samples" / "dnaish1.wav"
DEFAULT_SAMPLE_B = ROOT / "public" / "samples" / "danish1.wav"
DEFAULT_VOICE_SAMPLE = DEFAULT_SAMPLE_A if DEFAULT_SAMPLE_A.exists() else DEFAULT_SAMPLE_B
DITTO_REPO = "https://github.com/antgroup/ditto-talkinghead"
DITTO_MODEL = "https://huggingface.co/digital-avatar/ditto-talkinghead"
LIVE_AVATAR_MODEL = "https://huggingface.co/Quark-Vision/Live-Avatar"
WAN_MODEL_ID = "Wan-AI/Wan2.2-S2V-14B"
QWEN_CUSTOM_VOICE_MODEL = "Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice"
QWEN_CLONE_MODEL = "Qwen/Qwen3-TTS-12Hz-1.7B-Base"
QWEN_TOKENIZER_MODEL = "Qwen/Qwen3-TTS-Tokenizer-12Hz"

_qwen_model: Any | None = None
_qwen_model_name = ""
_qwen_clone_prompt: Any | None = None
_gradio_client: Any | None = None


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


for env_path in (ROOT / ".env.local", ROOT / ".env"):
    load_env_file(env_path)


def run(cmd: list[str], cwd: Path | None = None, check: bool = True) -> subprocess.CompletedProcess[str]:
    print("$ " + " ".join(cmd), flush=True)
    return subprocess.run(cmd, cwd=cwd, check=check, text=True)


def which(name: str) -> str | None:
    return shutil.which(name)


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def qwen_venv_python(workspace: Path) -> Path:
    return workspace / "qwen-tts-venv" / "bin" / "python"


def maybe_reexec_in_qwen_venv(workspace: Path, command: str) -> None:
    if command == "setup-qwen-tts" or os.getenv("DN_QWEN_SKIP_VENV_REEXEC") == "1":
        return
    python_path = qwen_venv_python(workspace)
    venv_dir = python_path.parents[1]
    if not python_path.exists() or Path(sys.prefix).resolve() == venv_dir.resolve():
        return
    os.execv(str(python_path), [str(python_path), *sys.argv])


def resolve_qwen_model_name(voice_sample: Path) -> str:
    env_model = os.getenv("DN_QWEN_TTS_MODEL", "").strip()
    if env_model:
        return env_model
    return QWEN_CLONE_MODEL if voice_sample.exists() else QWEN_CUSTOM_VOICE_MODEL


def qwen_runtime_ready() -> bool:
    return all(importlib.util.find_spec(name) is not None for name in ("qwen_tts", "soundfile", "torch"))


def audio_file_profile(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"exists": False, "container": "missing", "recommendedForClone": False}
    try:
        with path.open("rb") as handle:
            header = handle.read(16)
    except OSError:
        return {"exists": False, "container": "unreadable", "recommendedForClone": False}

    if header.startswith(b"RIFF") and b"WAVE" in header[:12]:
        return {"exists": True, "container": "wav", "recommendedForClone": True}
    if header.startswith(b"ID3") or (len(header) >= 2 and header[0] == 0xFF and (header[1] & 0xE0) == 0xE0):
        return {
            "exists": True,
            "container": "mp3-or-adts",
            "recommendedForClone": False,
            "warning": "This sample is compressed audio despite its .wav name. Use a real 16-bit PCM WAV plus transcript for better voice cloning.",
        }
    return {
        "exists": True,
        "container": "unknown",
        "recommendedForClone": False,
        "warning": "Unknown audio container. Use a clean 16-bit PCM WAV plus transcript for Qwen voice cloning.",
    }


def live_avatar_config() -> dict[str, Any]:
    endpoint = os.getenv("DN_LIVE_AVATAR_ENDPOINT", "").strip().rstrip("/")
    return {
        "configured": bool(endpoint),
        "endpoint": endpoint,
        "timeoutSec": int(os.getenv("DN_LIVE_AVATAR_TIMEOUT_SEC", "300")),
        "prompt": os.getenv(
            "DN_LIVE_AVATAR_PROMPT",
            "A realistic, natural conversational avatar. Subtle head movement, blinking, expressive face, accurate lip sync.",
        ),
        "size": os.getenv("DN_LIVE_AVATAR_SIZE", "704*384"),
        "numClip": int(os.getenv("DN_LIVE_AVATAR_NUM_CLIP", "1")),
    }


def _multipart_body(fields: dict[str, str], files: dict[str, Path]) -> tuple[bytes, str]:
    boundary = f"----dn-live-avatar-{int(time.time() * 1000)}"
    chunks: list[bytes] = []
    for name, value in fields.items():
        chunks.extend(
            [
                f"--{boundary}\r\n".encode(),
                f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode(),
                value.encode("utf-8"),
                b"\r\n",
            ]
        )
    for name, path in files.items():
        data = path.read_bytes()
        content_type = "audio/wav" if path.suffix.lower() == ".wav" else "image/jpeg"
        chunks.extend(
            [
                f"--{boundary}\r\n".encode(),
                f'Content-Disposition: form-data; name="{name}"; filename="{path.name}"\r\n'.encode(),
                f"Content-Type: {content_type}\r\n\r\n".encode(),
                data,
                b"\r\n",
            ]
        )
    chunks.append(f"--{boundary}--\r\n".encode())
    return b"".join(chunks), f"multipart/form-data; boundary={boundary}"


def request_live_avatar_video(image_path: Path, audio_path: Path, output_dir: Path) -> str | None:
    config = live_avatar_config()
    endpoint = config["endpoint"]
    if not endpoint:
        return None

    body, content_type = _multipart_body(
        fields={
            "prompt": str(config["prompt"]),
            "size": str(config["size"]),
            "num_clip": str(config["numClip"]),
        },
        files={"image": image_path, "audio": audio_path},
    )
    request = urllib.request.Request(
        endpoint,
        data=body,
        headers={
            "Content-Type": content_type,
            "Accept": "application/json, video/mp4",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=int(config["timeoutSec"])) as response:
            content_type_header = response.headers.get("Content-Type", "")
            payload = response.read()
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Live-Avatar endpoint failed: {exc}") from exc

    if "application/json" in content_type_header:
        decoded = json.loads(payload.decode("utf-8"))
        for key in ("videoUrl", "video_url", "url", "output"):
            value = decoded.get(key)
            if isinstance(value, str) and value:
                return value
        raise RuntimeError(f"Live-Avatar endpoint returned JSON without a video URL: {decoded}")

    ensure_dir(output_dir)
    video_path = output_dir / f"dn-live-avatar-{int(time.time())}.mp4"
    video_path.write_bytes(payload)
    return f"/avatar/generated/{video_path.name}"


def check_endpoint_reachable(url: str, timeout: int = 4) -> bool:
    if not url:
        return False
    try:
        with urllib.request.urlopen(url, timeout=timeout) as resp:
            return resp.status < 500
    except Exception:
        return False


def request_live_avatar_via_gradio(image_path: Path, audio_path: Path, output_dir: Path) -> str | None:
    """Call a Live-Avatar Gradio app directly using gradio_client.

    Triggered when DN_LIVE_AVATAR_GRADIO_URL is set (e.g. a local Gradio server
    started by gradio_single_gpu.sh or an HF Space URL).
    """
    global _gradio_client
    gradio_url = os.getenv("DN_LIVE_AVATAR_GRADIO_URL", "").strip()
    if not gradio_url:
        return None

    try:
        from gradio_client import Client, handle_file  # type: ignore[import-not-found]
    except ImportError as exc:
        raise RuntimeError(
            "gradio_client is not installed. Run: pip install gradio_client"
        ) from exc

    if _gradio_client is None:
        _gradio_client = Client(gradio_url, verbose=False)

    config = live_avatar_config()
    try:
        result = _gradio_client.predict(
            prompt=config["prompt"],
            image=handle_file(str(image_path)),
            audio=handle_file(str(audio_path)),
            num_clip=config["numClip"],
            sample_steps=int(os.getenv("DN_LIVE_AVATAR_SAMPLE_STEPS", "4")),
            sample_guide_scale=float(os.getenv("DN_LIVE_AVATAR_GUIDE_SCALE", "4.0")),
            infer_frames=int(os.getenv("DN_LIVE_AVATAR_INFER_FRAMES", "48")),
            size=config["size"],
            base_seed=int(os.getenv("DN_LIVE_AVATAR_SEED", "-1")),
            sample_solver=os.getenv("DN_LIVE_AVATAR_SOLVER", "euler"),
            api_name="/generate_wrapper",
        )
    except Exception as exc:
        raise RuntimeError(f"Live-Avatar Gradio call failed: {exc}") from exc

    video_path_str = result[0] if isinstance(result, (list, tuple)) else str(result)
    src = Path(video_path_str)
    if not src.exists():
        raise RuntimeError(f"Gradio returned a path that does not exist: {video_path_str}")

    ensure_dir(output_dir)
    out_name = f"dn-live-avatar-{int(time.time())}.mp4"
    out_path = output_dir / out_name
    shutil.copy2(src, out_path)
    return f"/avatar/generated/{out_name}"


def render_live_avatar_smoke_test(image_path: Path, audio_path: Path, output_dir: Path) -> None:
    """Generate one short clip from danish.jpg + audio to prove the pipeline works."""
    if not image_path.exists():
        raise FileNotFoundError(f"Source image not found: {image_path}")
    if not audio_path.exists():
        raise FileNotFoundError(
            f"Audio file not found: {audio_path}\n"
            "  Provide --audio <wav> or set DN_QWEN_VOICE_SAMPLE in .env.local."
        )

    config = live_avatar_config()
    print(f"Source image  : {image_path}")
    print(f"Source audio  : {audio_path}")
    print(f"Output dir    : {output_dir}")
    print(f"Endpoint      : {config['endpoint'] or '(not set)'}")
    print(f"Gradio URL    : {os.getenv('DN_LIVE_AVATAR_GRADIO_URL', '(not set)')}")
    print()

    if not config["configured"] and not os.getenv("DN_LIVE_AVATAR_GRADIO_URL", "").strip():
        raise RuntimeError(
            "No Live-Avatar endpoint is configured.\n\n"
            "Live-Avatar requires ≥80 GB GPU VRAM and cannot run locally on consumer hardware.\n\n"
            "Options:\n"
            "  A) Deploy on a GPU host (Runpod/Vast.ai/Colab):\n"
            "       bash scripts/setup_live_avatar_host.sh\n"
            "       Then set: DN_LIVE_AVATAR_ENDPOINT=http://<GPU_HOST>:7861/generate\n\n"
            "  B) Use a Gradio Space directly:\n"
            "       Set: DN_LIVE_AVATAR_GRADIO_URL=https://<space-url>.hf.space\n"
        )

    video_url = request_live_avatar_video(image_path, audio_path, output_dir)
    if video_url:
        print(f"Smoke test PASSED — video written to: {video_url}")
        return

    video_url = request_live_avatar_via_gradio(image_path, audio_path, output_dir)
    if video_url:
        print(f"Smoke test PASSED (via Gradio) — video written to: {video_url}")
        return

    raise RuntimeError("Smoke test failed: endpoint returned no video URL.")


def _resolve_gradio_video_path(result: Any) -> str:
    """Extract a local file path from whatever gradio_client returns for a Video output."""
    if isinstance(result, (list, tuple)):
        result = result[0]
    if isinstance(result, dict):
        return str(result.get("path") or result.get("name") or result.get("video") or "")
    return str(result)


def _sadtalker_upload_files(base_url: str, *file_paths: Path, timeout: int = 60) -> list[dict[str, Any]]:
    """Upload one or more files to a Gradio 3.x Space; return server reference dicts."""
    boundary = f"----dn-upload-{int(time.time() * 1000)}"
    chunks: list[bytes] = []
    for fp in file_paths:
        data = fp.read_bytes()
        ct = "audio/wav" if fp.suffix.lower() == ".wav" else "image/jpeg"
        chunks.extend([
            f"--{boundary}\r\n".encode(),
            f'Content-Disposition: form-data; name="files"; filename="{fp.name}"\r\n'.encode(),
            f"Content-Type: {ct}\r\n\r\n".encode(),
            data,
            b"\r\n",
        ])
    chunks.append(f"--{boundary}--\r\n".encode())
    body = b"".join(chunks)
    content_type = f"multipart/form-data; boundary={boundary}"
    req = urllib.request.Request(
        f"{base_url}/upload",
        data=body,
        headers={"Content-Type": content_type},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        server_paths = json.loads(resp.read().decode("utf-8"))
    return [
        {"name": sp, "data": None, "is_file": True, "orig_name": fp.name}
        for sp, fp in zip(server_paths, file_paths)
    ]


_MAX_SADTALKER_QUEUE = int(os.getenv("DN_SADTALKER_MAX_QUEUE", "10"))


def _sadtalker_ws_queue(base_url: str, fn_index: int, data: list[Any], timeout: int = 300) -> Any:
    """Call a Gradio 3.x Space via its WebSocket queue and return the output data list.

    Raises immediately if the queue length exceeds DN_SADTALKER_MAX_QUEUE (default 10).
    """
    import random
    import string

    try:
        from websockets.sync.client import connect as ws_connect  # type: ignore[import-not-found]
    except ImportError as exc:
        raise RuntimeError("websockets is not installed. Run: pip install websockets") from exc

    session_hash = "".join(random.choices(string.ascii_lowercase + string.digits, k=10))
    ws_url = base_url.replace("https://", "wss://").replace("http://", "ws://") + "/queue/join"

    with ws_connect(ws_url, open_timeout=30) as ws:
        while True:
            raw = ws.recv(timeout=timeout)
            msg = json.loads(raw)
            kind = msg.get("msg")

            if kind == "send_hash":
                ws.send(json.dumps({"fn_index": fn_index, "session_hash": session_hash}))

            elif kind == "estimation":
                rank = msg.get("rank", 0)
                eta = msg.get("rank_eta", 0)
                if rank > _MAX_SADTALKER_QUEUE:
                    eta_min = int(eta / 60)
                    raise RuntimeError(
                        f"SadTalker Space queue is too long: {rank} people ahead (~{eta_min} min wait).\n"
                        f"Set DN_REPLICATE_API_TOKEN in .env.local for instant processing instead."
                    )

            elif kind == "send_data":
                ws.send(json.dumps({"fn_index": fn_index, "data": data, "session_hash": session_hash}))

            elif kind == "process_completed":
                out = msg.get("output", {})
                if out.get("error"):
                    raise RuntimeError(f"SadTalker processing error: {out['error']}")
                return out.get("data", [])

            elif kind == "queue_full":
                raise RuntimeError("SadTalker queue is full — try again in a moment.")


def request_sadtalker_video(image_path: Path, audio_path: Path, output_dir: Path) -> str | None:
    """Generate a talking-head video using SadTalker (image + audio → video).

    Uses the Gradio 3.x WebSocket queue protocol directly (standard-library only
    except for websockets, which is already installed with gradio).
    Free option: set DN_SADTALKER_GRADIO_URL=https://kevinwang676-sadtalker.hf.space
    First call after the Space sleeps may take 1-2 minutes to wake up.
    """
    sadtalker_url = os.getenv("DN_SADTALKER_GRADIO_URL", "").strip().rstrip("/")
    if not sadtalker_url:
        return None

    preprocess = os.getenv("DN_SADTALKER_PREPROCESS", "crop")
    still_mode = os.getenv("DN_SADTALKER_STILL_MODE", "true").lower() == "true"
    use_gfpgan = os.getenv("DN_SADTALKER_GFPGAN", "true").lower() == "true"
    batch_size = int(os.getenv("DN_SADTALKER_BATCH_SIZE", "2"))
    face_resolution = os.getenv("DN_SADTALKER_FACE_RESOLUTION", "256")
    pose_style = int(os.getenv("DN_SADTALKER_POSE_STYLE", "0"))
    timeout = int(os.getenv("DN_SADTALKER_TIMEOUT_SEC", "300"))

    # Step 1: upload source files to the Space.
    img_ref, aud_ref = _sadtalker_upload_files(sadtalker_url, image_path, audio_path)

    # Step 2: run inference via the WebSocket queue.
    result_data = _sadtalker_ws_queue(
        sadtalker_url, 0,
        [img_ref, aud_ref, preprocess, still_mode, use_gfpgan, batch_size, face_resolution, pose_style],
        timeout=timeout,
    )

    if not result_data:
        raise RuntimeError("SadTalker returned empty result data.")

    video_ref = result_data[0]

    # Step 3: download the generated video from the Space.
    if isinstance(video_ref, dict):
        server_path = video_ref.get("name", "")
        video_dl_url = f"{sadtalker_url}/file={server_path}"
    else:
        video_dl_url = str(video_ref)

    dl_req = urllib.request.Request(video_dl_url, method="GET")
    try:
        with urllib.request.urlopen(dl_req, timeout=120) as dl_resp:
            video_bytes = dl_resp.read()
    except urllib.error.URLError as exc:
        raise RuntimeError(f"SadTalker video download failed from {video_dl_url!r}: {exc}") from exc

    ensure_dir(output_dir)
    out_name = f"dn-sadtalker-{int(time.time())}.mp4"
    out_path = output_dir / out_name
    out_path.write_bytes(video_bytes)
    return f"/avatar/generated/{out_name}"


def request_sadtalker_via_replicate(image_path: Path, audio_path: Path, output_dir: Path) -> str | None:
    """Generate a talking-head video via Replicate's SadTalker API.

    Requires DN_REPLICATE_API_TOKEN (free sign-up at https://replicate.com).
    Free credits cover ~100 videos. After that ~$0.02–0.05 per video.
    No queue, starts in seconds, reliable.
    """
    api_token = os.getenv("DN_REPLICATE_API_TOKEN", "").strip()
    if not api_token:
        return None

    import base64

    img_b64 = base64.b64encode(image_path.read_bytes()).decode()
    aud_b64 = base64.b64encode(audio_path.read_bytes()).decode()
    img_uri = f"data:image/jpeg;base64,{img_b64}"
    aud_suffix = audio_path.suffix.lower().lstrip(".")
    aud_mime = "audio/wav" if aud_suffix in ("wav",) else f"audio/{aud_suffix}"
    aud_uri = f"data:{aud_mime};base64,{aud_b64}"

    auth_header = {"Authorization": f"Bearer {api_token}"}

    # POST directly to the model endpoint — no version lookup needed.
    predict_body = json.dumps({
        "input": {
            "source_image": img_uri,
            "driven_audio": aud_uri,
            "preprocess": os.getenv("DN_SADTALKER_PREPROCESS", "crop"),
            "still_mode": os.getenv("DN_SADTALKER_STILL_MODE", "true").lower() == "true",
            "use_enhancer": os.getenv("DN_SADTALKER_GFPGAN", "true").lower() == "true",
            "batch_size": int(os.getenv("DN_SADTALKER_BATCH_SIZE", "2")),
            "size": int(os.getenv("DN_SADTALKER_FACE_RESOLUTION", "256")),
            "pose_style": int(os.getenv("DN_SADTALKER_POSE_STYLE", "0")),
        },
    }).encode()
    pred_req = urllib.request.Request(
        "https://api.replicate.com/v1/models/cjwbw/sadtalker/predictions",
        data=predict_body,
        headers={**auth_header, "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(pred_req, timeout=30) as r:
            pred = json.loads(r.read())
    except Exception as exc:
        raise RuntimeError(f"Replicate prediction creation failed: {exc}") from exc

    poll_url = pred["urls"]["get"]
    timeout = int(os.getenv("DN_SADTALKER_TIMEOUT_SEC", "300"))
    start = time.time()

    # Poll until the prediction succeeds.
    while time.time() - start < timeout:
        poll_req = urllib.request.Request(poll_url, headers=auth_header, method="GET")
        with urllib.request.urlopen(poll_req, timeout=15) as r:
            status = json.loads(r.read())

        s = status.get("status", "")
        if s == "succeeded":
            video_url = status.get("output")
            if not video_url:
                raise RuntimeError("Replicate returned success but no output URL.")
            break
        if s in ("failed", "canceled"):
            raise RuntimeError(f"Replicate prediction {s}: {status.get('error', 'no details')}")

        time.sleep(3)
    else:
        raise RuntimeError(f"Replicate prediction timed out after {timeout}s.")

    dl_req = urllib.request.Request(video_url, method="GET")
    try:
        with urllib.request.urlopen(dl_req, timeout=120) as r:
            video_bytes = r.read()
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Replicate video download failed: {exc}") from exc

    ensure_dir(output_dir)
    out_name = f"dn-sadtalker-{int(time.time())}.mp4"
    out_path = output_dir / out_name
    out_path.write_bytes(video_bytes)
    return f"/avatar/generated/{out_name}"


def render_sadtalker_smoke_test(image_path: Path, audio_path: Path, output_dir: Path) -> None:
    """Smoke-test SadTalker: generate one talking-head clip and report the output path."""
    if not image_path.exists():
        raise FileNotFoundError(f"Source image not found: {image_path}")
    if not audio_path.exists():
        raise FileNotFoundError(
            f"Audio file not found: {audio_path}\n"
            "  Provide --audio <wav> or set DN_QWEN_VOICE_SAMPLE in .env.local."
        )

    replicate_token = os.getenv("DN_REPLICATE_API_TOKEN", "").strip()
    sadtalker_url = os.getenv("DN_SADTALKER_GRADIO_URL", "").strip()

    print(f"Source image    : {image_path}")
    print(f"Source audio    : {audio_path}")
    print(f"Output dir      : {output_dir}")
    print(f"Replicate token : {'SET' if replicate_token else '(not set)'}")
    print(f"SadTalker Space : {sadtalker_url or '(not set)'}")
    print()

    if not replicate_token and not sadtalker_url:
        raise RuntimeError(
            "No SadTalker provider is configured.\n\n"
            "Recommended — Replicate (free credits, no queue):\n"
            "  1. Sign up at https://replicate.com (free)\n"
            "  2. Copy your API token from https://replicate.com/account/api-tokens\n"
            "  3. Add to .env.local:\n"
            "       DN_REPLICATE_API_TOKEN=r8_your_token_here\n"
            "  4. Re-run: npm run avatar:test:sadtalker\n\n"
            "Alternative — HF Space (free but queue may be very long):\n"
            "  DN_SADTALKER_GRADIO_URL=https://kevinwang676-sadtalker.hf.space\n"
        )

    video_url: str | None = None

    if replicate_token:
        print("Trying Replicate (no queue, ~10-30s)...")
        video_url = request_sadtalker_via_replicate(image_path, audio_path, output_dir)

    if not video_url and sadtalker_url:
        print("Trying SadTalker HF Space (may queue)...")
        video_url = request_sadtalker_video(image_path, audio_path, output_dir)

    if video_url:
        print(f"\nSmoke test PASSED — video written to: {video_url}")
        print(f"Full path: {output_dir / Path(video_url).name}")
    else:
        raise RuntimeError("All SadTalker providers returned no video.")


def qwen_load_model(model_name: str) -> Any:
    global _qwen_model, _qwen_model_name
    if _qwen_model is not None and _qwen_model_name == model_name:
        return _qwen_model

    import torch
    from qwen_tts import Qwen3TTSModel

    cuda_ready = torch.cuda.is_available()
    device_map = os.getenv("DN_QWEN_DEVICE", "cuda:0" if cuda_ready else "cpu")
    dtype_name = os.getenv("DN_QWEN_DTYPE", "bfloat16" if cuda_ready else "float32")
    dtype = getattr(torch, dtype_name)
    attn = os.getenv("DN_QWEN_ATTN", "flash_attention_2" if cuda_ready else "sdpa")

    _qwen_model = Qwen3TTSModel.from_pretrained(
        model_name,
        device_map=device_map,
        dtype=dtype,
        attn_implementation=attn,
    )
    _qwen_model_name = model_name
    return _qwen_model


def synthesize_qwen_tts(text: str, output_path: Path, voice_sample: Path) -> Path:
    global _qwen_clone_prompt
    import soundfile as sf

    model_name = resolve_qwen_model_name(voice_sample)
    model = qwen_load_model(model_name)
    language = os.getenv("DN_QWEN_LANGUAGE", "English")
    clean_text = " ".join(text.split()).strip()[:900]
    if not clean_text:
        raise ValueError("Missing text for TTS.")

    ensure_dir(output_path.parent)
    if "Base" in model_name and voice_sample.exists():
        ref_text = os.getenv("DN_QWEN_REF_TEXT", "").strip()
        x_vector_only = os.getenv("DN_QWEN_X_VECTOR_ONLY", "1" if not ref_text else "0") == "1"
        if _qwen_clone_prompt is None:
            _qwen_clone_prompt = model.create_voice_clone_prompt(
                ref_audio=str(voice_sample),
                ref_text=ref_text,
                x_vector_only_mode=x_vector_only,
            )
        wavs, sr = model.generate_voice_clone(
            text=clean_text,
            language=language,
            voice_clone_prompt=_qwen_clone_prompt,
        )
    else:
        speaker = os.getenv("DN_QWEN_SPEAKER", "Ryan")
        instruct = os.getenv(
            "DN_QWEN_INSTRUCT",
            "Sound warm, confident, conversational, and natural, like a helpful AI portfolio guide.",
        )
        wavs, sr = model.generate_custom_voice(
            text=clean_text,
            language=language,
            speaker=speaker,
            instruct=instruct,
        )

    sf.write(output_path, wavs[0], sr)
    return output_path


def infer_ditto(
    image_path: Path,
    audio_path: Path,
    output_path: Path,
    workspace: Path,
    mode: str = "trt",
) -> Path:
    repo_dir = workspace / "ditto-talkinghead"
    checkpoints_dir = workspace / "ditto-checkpoints"
    data_root = checkpoints_dir / ("ditto_trt_Ampere_Plus" if mode == "trt" else "ditto_onnx")
    cfg_pkl = checkpoints_dir / "ditto_cfg" / "v0.4_hubert_cfg_trt.pkl"
    inference_py = repo_dir / "inference.py"

    missing = [p for p in [image_path, audio_path, data_root, cfg_pkl, inference_py] if not p.exists()]
    if missing:
        names = "\n".join(f"- {p}" for p in missing)
        raise FileNotFoundError(
            "Ditto runtime is not ready. Run `npm run avatar:setup:ditto` and provide audio first.\n"
            f"Missing:\n{names}"
        )

    ensure_dir(output_path.parent)
    run(
        [
            sys.executable,
            str(inference_py),
            "--data_root",
            str(data_root),
            "--cfg_pkl",
            str(cfg_pkl),
            "--audio_path",
            str(audio_path),
            "--source_path",
            str(image_path),
            "--output_path",
            str(output_path),
        ],
        cwd=repo_dir,
    )
    return output_path


def setup_ditto(workspace: Path) -> None:
    ensure_dir(workspace)
    repo_dir = workspace / "ditto-talkinghead"
    checkpoints_dir = workspace / "ditto-checkpoints"

    if not which("git"):
        raise RuntimeError("git is required to clone Ditto and its checkpoints.")

    if not repo_dir.exists():
        run(["git", "clone", DITTO_REPO, str(repo_dir)])
    else:
        print(f"Ditto code already exists at {repo_dir}")

    if not checkpoints_dir.exists():
        run(["git", "clone", DITTO_MODEL, str(checkpoints_dir)])
    else:
        print(f"Ditto checkpoints already exist at {checkpoints_dir}")

    print("\nNext: create/activate the Ditto Python environment from .avatar-runtime/ditto-talkinghead/environment.yaml.")


def setup_live_avatar(workspace: Path) -> None:
    ensure_dir(workspace / "live-avatar" / "ckpt")
    if not which("huggingface-cli"):
        raise RuntimeError('Install the Hugging Face CLI first: pip install "huggingface_hub[cli]"')

    ckpt_dir = workspace / "live-avatar" / "ckpt"
    run(["huggingface-cli", "download", WAN_MODEL_ID, "--local-dir", str(ckpt_dir / "Wan2.2-S2V-14B")])
    run(["huggingface-cli", "download", LIVE_AVATAR_MODEL.removeprefix("https://huggingface.co/"), "--local-dir", str(ckpt_dir / "LiveAvatar")])
    print("\nLive-Avatar checkpoints are staged. Use its upstream multi-GPU scripts for real-time TPP inference.")


def setup_qwen_tts(workspace: Path) -> None:
    ensure_dir(workspace)
    venv_dir = workspace / "qwen-tts-venv"
    venv_python = qwen_venv_python(workspace)
    if not venv_python.exists():
        run([sys.executable, "-m", "venv", str(venv_dir)])
    run([str(venv_python), "-m", "pip", "install", "-U", "pip"])
    run([str(venv_python), "-m", "pip", "install", "-U", "qwen-tts", "soundfile", "huggingface_hub"])
    print("\nQwen TTS package installed. The first synthesis will download model weights unless they are already cached.")
    print(f"Bridge commands will automatically use: {venv_python}")


def status_payload(image_path: Path, workspace: Path, output_dir: Path) -> dict[str, Any]:
    checkpoints = workspace / "ditto-checkpoints"
    voice_sample = Path(os.getenv("DN_QWEN_VOICE_SAMPLE", str(DEFAULT_VOICE_SAMPLE))).expanduser()
    qwen_model = resolve_qwen_model_name(voice_sample)
    sample_profile = audio_file_profile(voice_sample)
    return {
        "ok": True,
        "imageReady": image_path.exists(),
        "imagePath": str(image_path),
        "workspace": str(workspace),
        "outputDir": str(output_dir),
        "ditto": {
            "codeReady": (workspace / "ditto-talkinghead" / "inference.py").exists(),
            "checkpointsReady": checkpoints.exists(),
            "trtReady": (checkpoints / "ditto_trt_Ampere_Plus").exists(),
            "cfgReady": (checkpoints / "ditto_cfg" / "v0.4_hubert_cfg_trt.pkl").exists(),
        },
        "sadTalker": {
            "replicate": {
                "configured": bool(os.getenv("DN_REPLICATE_API_TOKEN", "").strip()),
                "note": "Recommended — no queue, ~10-30s per video. Free credits at replicate.com.",
                "signupUrl": "https://replicate.com",
                "model": "cjwbw/sadtalker",
            },
            "gradioSpace": {
                "url": os.getenv("DN_SADTALKER_GRADIO_URL", ""),
                "configured": bool(os.getenv("DN_SADTALKER_GRADIO_URL", "").strip()),
                "warningLongQueue": "The kevinwang676-sadtalker Space is public and often has 100+ person queues (hours of wait).",
            },
            "anyProviderConfigured": bool(os.getenv("DN_REPLICATE_API_TOKEN", "").strip()) or bool(os.getenv("DN_SADTALKER_GRADIO_URL", "").strip()),
            "smokeTestCommand": "npm run avatar:test:sadtalker",
        },
        "liveAvatar": {
            "hardwareNote": "Live-Avatar requires ≥80 GB GPU VRAM (single-GPU) or 5×H800 80 GB (multi-GPU). Cannot run locally on consumer hardware.",
            "model": LIVE_AVATAR_MODEL,
            "githubRepo": "https://github.com/Alibaba-Quark/LiveAvatar",
            "service": live_avatar_config(),
            "endpointConfigured": bool(live_avatar_config()["configured"]),
            "endpointReachable": check_endpoint_reachable(
                (live_avatar_config()["endpoint"] + "/health") if live_avatar_config()["configured"] else ""
            ),
            "gradioUrl": os.getenv("DN_LIVE_AVATAR_GRADIO_URL", ""),
            "gradioConfigured": bool(os.getenv("DN_LIVE_AVATAR_GRADIO_URL", "").strip()),
            "videoReady": bool(live_avatar_config()["configured"]) or bool(os.getenv("DN_LIVE_AVATAR_GRADIO_URL", "").strip()),
            "setupCommand": "bash scripts/setup_live_avatar_host.sh  # run on GPU host",
            "smokeTestCommand": "npm run avatar:test:live-avatar",
        },
        "qwenTts": {
            "runtimeReady": qwen_runtime_ready(),
            "activeModel": qwen_model,
            "requestedCustomVoiceModel": QWEN_CUSTOM_VOICE_MODEL,
            "sampleReady": voice_sample.exists(),
            "samplePath": str(voice_sample),
            "sampleProfile": sample_profile,
            "refTextReady": bool(os.getenv("DN_QWEN_REF_TEXT", "").strip()),
            "cloneUsesSample": "Base" in qwen_model and voice_sample.exists(),
            "speaker": os.getenv("DN_QWEN_SPEAKER", "Ryan"),
            "language": os.getenv("DN_QWEN_LANGUAGE", "English"),
        },
    }


class AvatarBridge(BaseHTTPRequestHandler):
    image_path = DEFAULT_IMAGE
    workspace = DEFAULT_WORKSPACE
    output_dir = DEFAULT_OUTPUT_DIR
    mode = "trt"
    voice_sample = DEFAULT_VOICE_SAMPLE

    def log_message(self, fmt: str, *args: Any) -> None:
        print(f"[avatar-bridge] {self.address_string()} {fmt % args}")

    def send_json(self, payload: dict[str, Any], code: int = 200) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:
        self.send_json({"ok": True}, 204)

    def do_GET(self) -> None:
        path = urlparse(self.path).path
        if path == "/":
            self.send_json(
                {
                    "ok": True,
                    "service": "DN avatar bridge",
                    "message": "This is the local avatar API. Open the Vite app URL, usually http://127.0.0.1:5173, to use the DN engine.",
                    "endpoints": ["/health", "/status", "POST /speak"],
                }
            )
            return
        if path in {"/health", "/status"}:
            self.send_json(status_payload(self.image_path, self.workspace, self.output_dir))
            return
        self.send_json({"error": "Unknown endpoint."}, 404)

    def do_POST(self) -> None:
        path = urlparse(self.path).path
        if path != "/speak":
            self.send_json({"error": "Unknown endpoint."}, 404)
            return

        length = int(self.headers.get("content-length", "0") or "0")
        raw = self.rfile.read(length).decode("utf-8") if length else "{}"
        try:
            payload = json.loads(raw)
        except json.JSONDecodeError:
            self.send_json({"error": "Invalid JSON."}, 400)
            return

        try:
            ensure_dir(self.output_dir)
            audio_value = str(payload.get("audioPath") or os.getenv("DN_AVATAR_AUDIO_PATH") or "").strip()
            if audio_value:
                output_path = self.output_dir / f"dn-avatar-{int(time.time())}.mp4"
                infer_ditto(self.image_path, Path(audio_value).expanduser(), output_path, self.workspace, self.mode)
                self.send_json({"ok": True, "status": "rendered", "videoUrl": f"/avatar/generated/{output_path.name}"})
                return

            text = str(payload.get("text") or "").strip()
            if qwen_runtime_ready() and text:
                audio_path = self.output_dir / f"dn-qwen-tts-{int(time.time())}.wav"
                synthesize_qwen_tts(text, audio_path, self.voice_sample)

                # Try REST endpoint first, then Gradio client direct path.
                video_url = request_live_avatar_video(self.image_path, audio_path, self.output_dir)
                if not video_url:
                    try:
                        video_url = request_live_avatar_via_gradio(self.image_path, audio_path, self.output_dir)
                    except Exception as gradio_exc:
                        print(f"[avatar-bridge] Live-Avatar Gradio fallback failed: {gradio_exc}")

                if not video_url:
                    try:
                        video_url = request_sadtalker_via_replicate(self.image_path, audio_path, self.output_dir)
                    except Exception as repl_exc:
                        print(f"[avatar-bridge] Replicate fallback failed: {repl_exc}")

                if not video_url:
                    try:
                        video_url = request_sadtalker_video(self.image_path, audio_path, self.output_dir)
                    except Exception as sadtalker_exc:
                        print(f"[avatar-bridge] SadTalker Space fallback failed: {sadtalker_exc}")

                provider: str
                if video_url:
                    provider = "sadtalker" if "sadtalker" in (video_url or "") else "live-avatar"
                else:
                    provider = "qwen-tts"
                self.send_json(
                    {
                        "ok": True,
                        "status": "rendered",
                        "imageUrl": "/avatar/danish.jpg",
                        "audioUrl": f"/avatar/generated/{audio_path.name}",
                        "videoUrl": video_url,
                        "provider": provider,
                    }
                )
                return

            self.send_json(
                {
                    "ok": True,
                    "status": "preview",
                    "imageUrl": "/avatar/danish.jpg",
                    "message": "Bridge is running. Install qwen-tts with `npm run avatar:setup:qwen-tts` for generated voice.",
                }
            )
        except Exception as exc:  # noqa: BLE001 - bridge should return model/runtime errors to the UI.
            self.send_json({"ok": False, "status": "error", "error": str(exc)}, 500)


def serve(args: argparse.Namespace) -> None:
    AvatarBridge.image_path = Path(args.image).expanduser().resolve()
    AvatarBridge.workspace = Path(args.workspace).expanduser().resolve()
    AvatarBridge.output_dir = Path(args.output_dir).expanduser().resolve()
    AvatarBridge.mode = args.mode
    AvatarBridge.voice_sample = Path(args.voice_sample).expanduser().resolve()
    ensure_dir(AvatarBridge.output_dir)
    server = ThreadingHTTPServer((args.host, args.port), AvatarBridge)
    print(f"DN avatar bridge ready at http://{args.host}:{args.port}")
    print(f"Using source image: {AvatarBridge.image_path}")
    print(f"Using Qwen voice sample: {AvatarBridge.voice_sample}")
    server.serve_forever()


def main() -> None:
    parser = argparse.ArgumentParser(description="DN live avatar pipeline bridge.")
    parser.add_argument("--workspace", default=str(DEFAULT_WORKSPACE))
    parser.add_argument("--image", default=str(DEFAULT_IMAGE))
    sub = parser.add_subparsers(dest="command", required=True)

    bridge = sub.add_parser("bridge", help="Run the local HTTP bridge used by the DN engine UI.")
    bridge.add_argument("--host", default=os.getenv("DN_AVATAR_HOST", "127.0.0.1"))
    bridge.add_argument("--port", type=int, default=int(os.getenv("DN_AVATAR_PORT", "7869")))
    bridge.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
    bridge.add_argument("--mode", choices=["trt", "onnx"], default=os.getenv("DN_AVATAR_DITTO_MODE", "trt"))
    bridge.add_argument("--voice-sample", default=os.getenv("DN_QWEN_VOICE_SAMPLE", str(DEFAULT_VOICE_SAMPLE)))

    sub.add_parser("setup-ditto", help="Clone Ditto code and Hugging Face checkpoints into .avatar-runtime.")
    sub.add_parser("setup-live-avatar", help="Download Live-Avatar/Wan checkpoints for the external runtime.")
    sub.add_parser("setup-qwen-tts", help="Install the qwen-tts Python package used for live TTS.")

    render = sub.add_parser("render-ditto", help="Render one Ditto MP4 from an image and audio file.")
    render.add_argument("--audio", required=True)
    render.add_argument("--output", default=str(DEFAULT_OUTPUT_DIR / "dn-avatar-result.mp4"))
    render.add_argument("--mode", choices=["trt", "onnx"], default=os.getenv("DN_AVATAR_DITTO_MODE", "trt"))

    sadtalker = sub.add_parser(
        "render-sadtalker",
        help="Smoke-test SadTalker: generate a talking-head clip from danish.jpg + audio via DN_SADTALKER_GRADIO_URL.",
    )
    sadtalker.add_argument(
        "--audio",
        default=str(DEFAULT_VOICE_SAMPLE),
        help="WAV audio file to animate the avatar with.",
    )
    sadtalker.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))

    smoke = sub.add_parser(
        "render-live-avatar",
        help="Smoke-test: generate a talking-head clip from danish.jpg + audio via the configured Live-Avatar endpoint.",
    )
    smoke.add_argument(
        "--audio",
        default=str(DEFAULT_VOICE_SAMPLE),
        help="WAV audio file to animate the avatar with.",
    )
    smoke.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))

    status = sub.add_parser("status", help="Print runtime readiness as JSON.")
    status.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))

    args = parser.parse_args()
    workspace = Path(args.workspace).expanduser().resolve()
    image = Path(args.image).expanduser().resolve()
    maybe_reexec_in_qwen_venv(workspace, args.command)

    if args.command == "render-sadtalker":
        audio = Path(args.audio).expanduser().resolve()
        render_sadtalker_smoke_test(image, audio, Path(args.output_dir).expanduser().resolve())
    elif args.command == "render-live-avatar":
        audio = Path(args.audio).expanduser().resolve()
        render_live_avatar_smoke_test(image, audio, Path(args.output_dir).expanduser().resolve())
    elif args.command == "setup-ditto":
        setup_ditto(workspace)
    elif args.command == "setup-live-avatar":
        setup_live_avatar(workspace)
    elif args.command == "setup-qwen-tts":
        setup_qwen_tts(workspace)
    elif args.command == "render-ditto":
        infer_ditto(image, Path(args.audio).expanduser().resolve(), Path(args.output).expanduser().resolve(), workspace, args.mode)
    elif args.command == "status":
        print(json.dumps(status_payload(image, workspace, Path(args.output_dir).expanduser().resolve()), indent=2))
    elif args.command == "bridge":
        serve(args)


if __name__ == "__main__":
    main()
