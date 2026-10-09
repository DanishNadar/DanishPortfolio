import type { ProjectPageContent } from "./types";

export const project: ProjectPageContent = {
  slug: "morph",
  title: "Morph",
  subtitle:
    "Depth compression for Hugging Face causal language models, with teacher–student distillation to recover quality.",
  heroStatement:
    "Morph removes transformer blocks from a causal LM in an architecture-aware way, keeps the survivors spread across the model's depth, and then distills the smaller student against the frozen teacher.",
  pageTheme: {
    eyebrow: "Model Optimization Research",
    gradient: "from-sky-300/20 via-slate-900/30 to-blue-900/25",
    icon: "CaseStudy",
  },
  quickFacts: [
    { label: "Role", value: "Sole author" },
    { label: "Status", value: "Research prototype · open source" },
    { label: "Results", value: "No benchmark numbers published yet" },
    { label: "Output", value: "Standard Transformers checkpoint + metadata" },
  ],
  problem:
    "Many deployment targets can't hold a model's full depth, and naive truncation throws away late-layer behaviour.",
  motivation:
    "Provide a reproducible way to make a model shallower while keeping representative blocks from across its depth, then recover what pruning loses through distillation.",
  myRole: [
    "Wrote the compression CLI and the layer-path resolution for supported architectures.",
    "Implemented uniform block selection and weight transfer into a reduced student.",
    "Implemented the distillation loop and objective.",
    "Defined the evaluation protocol in the README.",
  ],
  whatIBuilt: [
    "find_layer_path: locates the decoder-block list across Llama, Mistral, Gemma, Qwen2, GPT-2, Falcon, OPT, NeoX and MPT.",
    "select_uniform_layers and make_reduced_student: keep blocks spread uniformly across depth and copy their weights.",
    "A distillation loop: masked, T²-scaled KL to a frozen (optionally 4/8-bit) teacher, plus cross-entropy and optional hidden-state MSE.",
    "Training support for BF16/FP16, gradient checkpointing, AdamW with warmup and gradient accumulation.",
  ],
  architecture: [
    { title: "Locate", body: "Resolve where the architecture stores its decoder blocks." },
    {
      title: "Select and transfer",
      body: "Keep blocks uniformly across depth and copy their weights into a student.",
    },
    {
      title: "Distill and save",
      body: "Optionally distill against the frozen teacher; save a checkpoint with compression metadata.",
    },
  ],
  stackMap: [
    {
      name: "PyTorch",
      category: "Deep learning",
      usedFor: "Model surgery and the distillation loop.",
    },
    {
      name: "Transformers",
      category: "Deep learning",
      usedFor: "Loading teachers and saving the student checkpoint.",
    },
    { name: "Datasets", category: "Data", usedFor: "Distillation corpora." },
    { name: "Accelerate", category: "Training", usedFor: "Device placement and mixed precision." },
    { name: "bitsandbytes", category: "Quantization", usedFor: "4/8-bit teacher loading." },
    { name: "safetensors", category: "Serialization", usedFor: "Checkpoint output." },
  ],
  implementationDetails: [
    {
      title: "Uniform selection",
      body: "Kept blocks span from first to last, so late-layer behaviour isn't simply cut off.",
    },
    {
      title: "Objective",
      body: "Weighted next-token CE + masked T²-scaled KL + optional hidden-state MSE.",
    },
    {
      title: "Memory",
      body: "A quantized frozen teacher and gradient checkpointing keep training on one GPU.",
    },
  ],
  challengeSolutions: [
    {
      title: "Many architectures, one tool",
      body: "A layer-path table maps each supported family to its block list.",
    },
    {
      title: "Honest evaluation",
      body: "The README defines the protocol before any numbers are claimed.",
    },
  ],
  outcomes: [
    {
      title: "Reusable compression CLI",
      body: "Produces standard checkpoints that load with plain Transformers.",
    },
    {
      title: "Defined evaluation protocol",
      body: "Held-out perplexity, teacher–student KL and agreement, tokens/s and peak memory.",
    },
  ],
  metrics: [
    {
      label: "Supported architectures",
      value: "9",
      note: "Llama, Mistral, Gemma, Qwen2, GPT-2, Falcon, OPT, NeoX, MPT.",
    },
    {
      label: "Loss terms",
      value: "3",
      note: "Cross-entropy, temperature-scaled KL, optional hidden-state MSE.",
    },
  ],
  gallery: [],
  relatedProjectSlugs: ["taloncv", "lane-detection-salad", "confusion-classifier"],
  relatedPostSlugs: [],
  impactTakeaway:
    "Morph shows comfort working inside transformer internals, and the research discipline to define how a result will be measured before reporting one.",
  interviewTalkingPoints: [
    "Why uniform block selection beats truncation as a starting point for a shallower student.",
    "The role of temperature scaling and masking in the KL term.",
    "What the evaluation protocol measures, and why no numbers are published yet.",
  ],
  resumeBullets: [
    "Built an architecture-aware LLM depth-compression CLI supporting nine causal-LM families, with uniform block selection and weight transfer.",
    "Implemented teacher–student distillation (masked T²-scaled KL, CE, hidden-state MSE) with a 4/8-bit quantized teacher.",
  ],
  futureWork: [
    "Run GPT-2 12→6 layers with and without distillation on WikiText-2 and publish perplexity, agreement, tokens/s and peak memory.",
    "Commit the results alongside compression_metadata.json for reproducibility.",
  ],
  links: [
    {
      label: "Distillation objective",
      href: "https://github.com/DanishNadar/Morph#distillation-objective",
      type: "github",
    },
    {
      label: "Evaluating compression",
      href: "https://github.com/DanishNadar/Morph#evaluating-compression",
      type: "github",
    },
  ],
};
