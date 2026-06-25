#!/usr/bin/env bash
# Setup script for deploying Live-Avatar on a GPU host.
#
# Run this on the GPU machine (Runpod, Vast.ai, Lambda Labs, etc.)
# inside a fresh conda base environment.
#
# Usage:
#   bash setup_live_avatar_host.sh [checkpoint-dir]
#
# After it finishes:
#   1. Set ckpt_dir in gradio_single_gpu.sh to match <checkpoint-dir>
#   2. Start the model server:   bash gradio_single_gpu.sh &
#   3. Start the DN service:     python /path/to/live_avatar_service.py
#   4. Expose port 7861 publicly (ngrok, Runpod TCP, Tailscale, etc.)
#   5. Add to your local .env.local:
#        DN_LIVE_AVATAR_ENDPOINT=http://<GPU_HOST>:7861/generate
#
# Hardware requirements:
#   Single-GPU path (gradio_single_gpu.sh):  1× GPU with ≥80 GB VRAM
#   Multi-GPU path  (gradio_multi_gpu.sh):   5× H800 80 GB GPUs
#
# FP8 mode (set ENABLE_FP8=true in the shell scripts) reduces per-GPU
# VRAM to ~48 GB but requires a Hopper or Ada architecture GPU.

set -euo pipefail

CKPT_DIR="${1:-$(pwd)/ckpt}"
CONDA_ENV="liveavatar"

echo ""
echo "===================================================================="
echo " DN Live-Avatar GPU Host Setup"
echo " Checkpoint dir : $CKPT_DIR"
echo " Conda env      : $CONDA_ENV"
echo "===================================================================="
echo ""

# ── 1. Conda environment ─────────────────────────────────────────────────
if conda env list | grep -q "^${CONDA_ENV} "; then
    echo "[skip] Conda env '${CONDA_ENV}' already exists."
else
    echo "[create] conda env ${CONDA_ENV} with Python 3.10..."
    conda create -n "${CONDA_ENV}" python=3.10 -y
fi

# Activate (works when script is sourced; for a standalone script we use
# conda run for subsequent commands).
CONDA_RUN="conda run -n ${CONDA_ENV} --no-capture-output"

# ── 2. PyTorch (CUDA 12.8) ───────────────────────────────────────────────
echo ""
echo "[install] PyTorch 2.8.0 + CUDA 12.8..."
$CONDA_RUN pip install torch==2.8.0 torchvision==0.23.0 \
    --index-url https://download.pytorch.org/whl/cu128 -q

# ── 3. Flash Attention ───────────────────────────────────────────────────
echo ""
echo "[install] Flash Attention 2.8.3..."
$CONDA_RUN pip install flash-attn==2.8.3 --no-build-isolation -q

# ── 4. Clone LiveAvatar ──────────────────────────────────────────────────
echo ""
if [ ! -d "LiveAvatar" ]; then
    echo "[clone] Alibaba-Quark/LiveAvatar..."
    git clone https://github.com/Alibaba-Quark/LiveAvatar
else
    echo "[skip] LiveAvatar/ already exists."
fi

# ── 5. LiveAvatar Python requirements ───────────────────────────────────
echo ""
echo "[install] LiveAvatar requirements..."
$CONDA_RUN pip install -r LiveAvatar/requirements.txt -q

# ── 6. DN service dependencies ───────────────────────────────────────────
echo ""
echo "[install] DN service deps (fastapi, uvicorn, gradio_client)..."
$CONDA_RUN pip install fastapi "uvicorn[standard]" python-multipart gradio_client -q

# ── 7. FFmpeg ────────────────────────────────────────────────────────────
echo ""
if ! command -v ffmpeg &>/dev/null; then
    echo "[install] ffmpeg..."
    apt-get update -q && apt-get install -y -q ffmpeg
else
    echo "[skip] ffmpeg already installed."
fi

# ── 8. HuggingFace CLI ──────────────────────────────────────────────────
echo ""
echo "[install] huggingface_hub CLI..."
$CONDA_RUN pip install "huggingface_hub[cli]" -q

# ── 9. Download checkpoints ──────────────────────────────────────────────
echo ""
echo "[download] WanS2V-14B base model (this is large — several GB)..."
mkdir -p "${CKPT_DIR}"
$CONDA_RUN huggingface-cli download Wan-AI/Wan2.2-S2V-14B \
    --local-dir "${CKPT_DIR}/Wan2.2-S2V-14B"

echo ""
echo "[download] Live-Avatar LoRA checkpoints..."
$CONDA_RUN huggingface-cli download Quark-Vision/Live-Avatar \
    --local-dir "${CKPT_DIR}/LiveAvatar"

# ── Done ─────────────────────────────────────────────────────────────────
echo ""
echo "===================================================================="
echo " Setup complete!"
echo ""
echo " Checkpoint dir:  ${CKPT_DIR}"
echo ""
echo " Next steps:"
echo "   1. Edit LiveAvatar/gradio_single_gpu.sh:"
echo "        set ckpt_dir=${CKPT_DIR}"
echo "   2. Start the Gradio model server (keeps model in GPU memory):"
echo "        conda activate ${CONDA_ENV}"
echo "        cd LiveAvatar && bash gradio_single_gpu.sh &"
echo "   3. Start the DN FastAPI service wrapper (different terminal):"
echo "        conda activate ${CONDA_ENV}"
echo "        python /path/to/scripts/live_avatar_service.py"
echo "   4. Expose port 7861 to the internet:"
echo "        ngrok tcp 7861    # or use your GPU provider's port mapping"
echo "   5. Add to your local .env.local:"
echo "        DN_LIVE_AVATAR_ENDPOINT=http://<GPU_HOST>:7861/generate"
echo "   6. Run the smoke test from your laptop:"
echo "        npm run avatar:test:live-avatar"
echo "===================================================================="
