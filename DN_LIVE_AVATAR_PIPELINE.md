# DN Live Avatar Pipeline

The DN Response Engine shows a real talking-head avatar powered by
[Quark-Vision/Live-Avatar](https://github.com/Alibaba-Quark/LiveAvatar).
The browser panel calls a local Python bridge (`scripts/live_avatar_pipeline.py`)
which talks to a Live-Avatar service running on a GPU host.

---

## Hardware reality

**Live-Avatar cannot run locally on consumer hardware.**

| Mode | GPUs required | VRAM per GPU |
|------|---------------|--------------|
| Single-GPU (`gradio_single_gpu.sh`) | 1 | ≥80 GB |
| Multi-GPU (`gradio_multi_gpu.sh`) | 5× H800 | 80 GB |
| FP8 mode (Hopper/Ada arch) | same counts | ~48 GB |

If your machine has less than 80 GB of GPU VRAM you need either:
- **Option A** — a rented GPU host (Runpod, Vast.ai, Lambda Labs, Google Colab Pro+)
- **Option B** — a Hugging Face Space running the Gradio UI

---

## Architecture

```
Browser (FloatingAvatar.tsx)
  └─► POST /speak  → local bridge (live_avatar_pipeline.py :7869)
                          ├─► Qwen TTS  → WAV audio
                          ├─► POST /generate → live_avatar_service.py :7861 (Option A)
                          │     └─► gradio_client → Gradio app :7860 (on GPU host)
                          └─► gradio_client directly (Option B, DN_LIVE_AVATAR_GRADIO_URL)
```

The bridge returns `{ audioUrl, videoUrl, imageUrl }`.  
`FloatingAvatar.tsx` plays the audio and swaps the avatar image for the MP4 video.  
The CSS mouth overlay only appears when `media.kind === "image"` — it is **not shown** when a real video is playing.

---

## Quick-check (always start here)

```bash
npm run avatar:status
```

Look for:
- `liveAvatar.endpointConfigured` — is `DN_LIVE_AVATAR_ENDPOINT` set?
- `liveAvatar.endpointReachable` — is the GPU service reachable right now?
- `liveAvatar.gradioConfigured` — is `DN_LIVE_AVATAR_GRADIO_URL` set?
- `qwenTts.runtimeReady` — is Qwen TTS installed for voice synthesis?

---

## Option A — GPU host + DN service (recommended)

### 1. Provision a GPU host

Rent a machine with ≥80 GB GPU VRAM. Examples:
- Runpod: A100 80 GB or H100 pod
- Vast.ai: search for `gpu_ram > 79`
- Google Colab Pro+: A100 runtime

### 2. Run the setup script on the GPU host

```bash
# SSH into the GPU host, then:
bash scripts/setup_live_avatar_host.sh /path/to/ckpt
```

This clones [Alibaba-Quark/LiveAvatar](https://github.com/Alibaba-Quark/LiveAvatar),
installs the conda environment, downloads WanS2V-14B and Live-Avatar LoRA checkpoints,
and installs the DN service wrapper.

### 3. Start both servers on the GPU host

```bash
conda activate liveavatar
cd LiveAvatar

# Terminal 1: Gradio model server (loads model into GPU, stays resident)
bash gradio_single_gpu.sh &

# Terminal 2: DN FastAPI wrapper (accepts multipart POST from the bridge)
python /path/to/scripts/live_avatar_service.py
```

The DN service wraps the Gradio server and exposes `POST /generate`
at port 7861 — this is the URL the bridge understands.

### 4. Expose port 7861

```bash
# Using ngrok (simplest):
ngrok tcp 7861

# Runpod: enable TCP port 7861 in the pod settings.
# Vast.ai: add port 7861 to the instance configuration.
```

### 5. Configure your local `.env.local`

```bash
DN_LIVE_AVATAR_ENDPOINT=http://<GPU_HOST>:7861/generate
```

### 6. Run the smoke test

```bash
npm run avatar:test:live-avatar
```

This posts `public/avatar/danish.jpg` + the configured voice sample WAV to the
endpoint and saves the resulting MP4 to `public/avatar/generated/`.

---

## Option B — HF Space or local Gradio direct

If you have a Gradio server running (local or HF Space), skip the DN service
wrapper and point the bridge directly at the Gradio app using
`DN_LIVE_AVATAR_GRADIO_URL`. The bridge uses `gradio_client` to call it.

```bash
# In .env.local:
DN_LIVE_AVATAR_GRADIO_URL=https://<space-subdomain>.hf.space
# or
DN_LIVE_AVATAR_GRADIO_URL=http://127.0.0.1:7860  # local single-GPU Gradio
```

The bridge tries `DN_LIVE_AVATAR_ENDPOINT` first, then falls back to
`DN_LIVE_AVATAR_GRADIO_URL`. You can set both or just one.

---

## Running the local bridge

```bash
npm run avatar:bridge
```

The bridge listens on `http://127.0.0.1:7869`.  
The browser panel probes `/health` on open and POSTs to `/speak` on each reply.

---

## All commands

| Command | What it does |
|---------|--------------|
| `npm run avatar:status` | Print full readiness JSON including endpoint reachability |
| `npm run avatar:bridge` | Start the local HTTP bridge (port 7869) |
| `npm run avatar:test:live-avatar` | Smoke-test: generate a clip from danish.jpg + WAV audio |
| `npm run avatar:service` | Start the DN FastAPI service (run on GPU host, port 7861) |
| `npm run avatar:setup:live-avatar` | Download Live-Avatar + WanS2V checkpoints |
| `npm run avatar:setup:qwen-tts` | Install Qwen TTS into a local venv for speech synthesis |
| `npm run avatar:setup:ditto` | Clone Ditto (alternative talking-head model, smaller GPU req) |
| `npm run avatar:render:ditto` | Render one Ditto MP4 from an image + WAV |

---

## Qwen TTS (voice synthesis)

The bridge synthesizes speech with Qwen TTS before calling Live-Avatar:

```bash
npm run avatar:setup:qwen-tts
```

Voice cloning from `public/samples/danish1.wav` uses `Qwen3-TTS-12Hz-1.7B-Base`.
To force a preset speaker instead:

```bash
DN_QWEN_TTS_MODEL=Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice
DN_QWEN_SPEAKER=Ryan
```

---

## Source image

```
public/avatar/danish.jpg
```

Replace this file to change the avatar identity. The bridge reads it at startup.

---

## Environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `VITE_DN_AVATAR_BRIDGE_URL` | `http://127.0.0.1:7869` | Bridge URL seen by the browser |
| `DN_AVATAR_PORT` | `7869` | Bridge listen port |
| `DN_LIVE_AVATAR_ENDPOINT` | _(unset)_ | Option A: `POST /generate` on GPU host |
| `DN_LIVE_AVATAR_GRADIO_URL` | _(unset)_ | Option B: Gradio server URL |
| `DN_LIVE_AVATAR_GRADIO_URL` on GPU host | `http://127.0.0.1:7860` | Gradio the service wraps |
| `DN_LIVE_AVATAR_SIZE` | `704*384` | Video resolution |
| `DN_LIVE_AVATAR_NUM_CLIP` | `1` | Clips per request |
| `DN_LIVE_AVATAR_TIMEOUT_SEC` | `300` | Bridge request timeout |
| `DN_LIVE_AVATAR_PROMPT` | _(see .env.local)_ | Scene description |
| `DN_LIVE_AVATAR_SAMPLE_STEPS` | `4` | Diffusion steps (1-50) |
| `DN_LIVE_AVATAR_GUIDE_SCALE` | `4.0` | CFG guidance scale |
| `DN_LIVE_AVATAR_INFER_FRAMES` | `48` | Frames per clip |
| `DN_LIVE_AVATAR_SOLVER` | `euler` | Sampler: euler/unipc/dpm++ |
| `DN_QWEN_VOICE_SAMPLE` | `public/samples/danish1.wav` | Reference voice WAV |
| `DN_QWEN_LANGUAGE` | `English` | TTS language |
| `DN_QWEN_SPEAKER` | `Ryan` | Preset speaker (CustomVoice model) |

---

## Frontend behaviour

`src/components/FloatingAvatar.tsx` handles both states:

- **No video** (`media.kind === "image"`): shows `danish.jpg` with CSS breathing
  and the mouth-rig overlay. This is the fallback when no Live-Avatar service is running.
- **With video** (`media.kind === "video"`): shows the MP4 generated by Live-Avatar.
  The CSS mouth overlay is **not rendered** (`{media.kind === "image" && (...)}` guard).

The avatar swaps from image → video as soon as the bridge returns `videoUrl`.
It uses a `<video autoPlay muted playsInline loop>` element, so the mouth actually
moves from the model output, not from CSS.
