#!/usr/bin/env python3
"""
DN Live-Avatar GPU service — deploy this on a GPU host, not locally.

This wraps the Gradio server that Live-Avatar's gradio_single_gpu.sh (or
gradio_multi_gpu.sh) starts and re-exposes it as a plain multipart POST
endpoint that the DN bridge already knows how to call.

Architecture on the GPU host:
  ├── bash gradio_single_gpu.sh    →  Gradio app at :7860  (holds the model)
  └── python live_avatar_service.py →  FastAPI  at :7861  (/generate)

Your local bridge calls the FastAPI service via:
  DN_LIVE_AVATAR_ENDPOINT=http://<GPU_HOST>:7861/generate

Quick start (run on the GPU host, inside the LiveAvatar conda env):
  pip install fastapi 'uvicorn[standard]' python-multipart gradio_client
  python /path/to/live_avatar_service.py

Environment variables (all optional, can set in shell or a .env):
  DN_LIVE_AVATAR_GRADIO_URL     Gradio server this service wraps
                                 default: http://127.0.0.1:7860
  DN_LIVE_AVATAR_SERVICE_PORT   Port this FastAPI service listens on
                                 default: 7861
  DN_LIVE_AVATAR_SERVICE_HOST   Bind address
                                 default: 0.0.0.0
  DN_LIVE_AVATAR_OUTPUT_DIR     Where to stash generated MP4s temporarily
                                 default: /tmp/dn-live-avatar

Hardware requirements for the GPU host:
  Single-GPU mode:  1× GPU with ≥80 GB VRAM  (gradio_single_gpu.sh)
  Multi-GPU mode:   5× H800 80 GB GPUs        (gradio_multi_gpu.sh)
  FP8 reduces per-GPU need to ~48 GB but still requires the right driver.

If you don't have the hardware, use an HF Space instead:
  Set DN_LIVE_AVATAR_GRADIO_URL to the Space URL in the bridge .env and
  skip running this service entirely (the bridge calls the Space directly
  via gradio_client when DN_LIVE_AVATAR_GRADIO_URL is set).
"""

from __future__ import annotations

import os
import shutil
import tempfile
import time
from pathlib import Path
from typing import Any

SERVICE_PORT = int(os.getenv("DN_LIVE_AVATAR_SERVICE_PORT", "7861"))
SERVICE_HOST = os.getenv("DN_LIVE_AVATAR_SERVICE_HOST", "0.0.0.0")
GRADIO_URL = os.getenv("DN_LIVE_AVATAR_GRADIO_URL", "http://127.0.0.1:7860")
OUTPUT_DIR = Path(os.getenv("DN_LIVE_AVATAR_OUTPUT_DIR", "/tmp/dn-live-avatar"))
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

_gradio_client: Any = None


def get_gradio_client() -> Any:
    global _gradio_client
    if _gradio_client is None:
        try:
            from gradio_client import Client  # type: ignore[import-not-found]
        except ImportError as exc:
            raise RuntimeError(
                "gradio_client is not installed. Run: pip install gradio_client"
            ) from exc
        _gradio_client = Client(GRADIO_URL, verbose=False)
    return _gradio_client


try:
    from fastapi import FastAPI, File, Form, UploadFile  # type: ignore[import-not-found]
    from fastapi.responses import FileResponse, JSONResponse  # type: ignore[import-not-found]

    app = FastAPI(title="DN Live-Avatar Service", version="1.0.0")

    @app.get("/")
    def root() -> dict[str, Any]:
        return {
            "service": "DN Live-Avatar GPU Service",
            "gradio": GRADIO_URL,
            "endpoints": ["/health", "POST /generate"],
        }

    @app.get("/health")
    def health() -> Any:
        try:
            get_gradio_client()
            return {"ok": True, "gradio": GRADIO_URL}
        except Exception as exc:
            return JSONResponse({"ok": False, "error": str(exc)}, status_code=503)

    @app.post("/generate")
    async def generate(
        image: UploadFile = File(...),
        audio: UploadFile = File(...),
        prompt: str = Form(
            "A realistic, natural conversational avatar. "
            "Subtle head movement, blinking, expressive face, accurate lip sync."
        ),
        size: str = Form("704*384"),
        num_clip: int = Form(1),
        sample_steps: int = Form(4),
        sample_guide_scale: float = Form(4.0),
        infer_frames: int = Form(48),
        base_seed: int = Form(-1),
        sample_solver: str = Form("euler"),
    ) -> Any:
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            img_suffix = Path(image.filename or "image.jpg").suffix or ".jpg"
            aud_suffix = Path(audio.filename or "audio.wav").suffix or ".wav"
            img_path = tmp_path / f"image{img_suffix}"
            aud_path = tmp_path / f"audio{aud_suffix}"
            img_path.write_bytes(await image.read())
            aud_path.write_bytes(await audio.read())

            try:
                from gradio_client import handle_file  # type: ignore[import-not-found]

                client = get_gradio_client()
                result = client.predict(
                    prompt=prompt,
                    image=handle_file(str(img_path)),
                    audio=handle_file(str(aud_path)),
                    num_clip=num_clip,
                    sample_steps=sample_steps,
                    sample_guide_scale=sample_guide_scale,
                    infer_frames=infer_frames,
                    size=size,
                    base_seed=base_seed,
                    sample_solver=sample_solver,
                    api_name="/generate_wrapper",
                )
            except Exception as exc:
                return JSONResponse({"ok": False, "error": str(exc)}, status_code=500)

            video_path_str = result[0] if isinstance(result, (list, tuple)) else str(result)
            src = Path(video_path_str)
            if not src.exists():
                return JSONResponse(
                    {
                        "ok": False,
                        "error": f"Gradio returned a path that does not exist: {video_path_str}",
                    },
                    status_code=500,
                )

            out_name = f"dn-live-avatar-{int(time.time())}.mp4"
            out_path = OUTPUT_DIR / out_name
            shutil.copy2(src, out_path)

        return FileResponse(str(out_path), media_type="video/mp4", filename=out_name)

except ImportError:
    app = None  # type: ignore[assignment]
    print(
        "WARNING: fastapi is not installed — the service cannot start.\n"
        "Run: pip install fastapi 'uvicorn[standard]' python-multipart gradio_client"
    )


if __name__ == "__main__":
    if app is None:
        raise SystemExit(
            "Install required packages first:\n"
            "  pip install fastapi 'uvicorn[standard]' python-multipart gradio_client"
        )
    try:
        import uvicorn  # type: ignore[import-not-found]
    except ImportError as exc:
        raise SystemExit("uvicorn not installed: pip install 'uvicorn[standard]'") from exc

    print(f"DN Live-Avatar Service starting on {SERVICE_HOST}:{SERVICE_PORT}")
    print(f"Wrapping Gradio at {GRADIO_URL}")
    uvicorn.run(app, host=SERVICE_HOST, port=SERVICE_PORT)
