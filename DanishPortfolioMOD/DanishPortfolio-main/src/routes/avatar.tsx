import { createFileRoute } from "@tanstack/react-router";
import { AnimatedAvatarPortrait } from "@/components/avatar/AnimatedAvatarPortrait";
import { MessageCircle, Route as RouteIcon, Volume2, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/avatar")({ head: () => ({ meta: [{ title: "AI Guide — Danish Nadar" }, { name: "description", content: "An animated portfolio guide for navigating Danish Nadar's projects, posts, and stack map." }] }), component: AvatarPage });

function AvatarPage() {
  const [speaking, setSpeaking] = useState(false);
  const demo = () => { setSpeaking(true); window.setTimeout(() => setSpeaking(false), 2800); };
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center"><div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full text-xs text-accent"><Sparkles className="h-3 w-3" /> Animated portfolio guide</div><h1 className="mt-5 text-4xl md:text-6xl font-display font-bold">Danish's <span className="text-gradient-rb">AI Guide</span></h1><p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-lg">A lightweight animated guide that helps visitors route themselves through project case studies, posts, and the stack map. It uses animated mouth frames and browser TTS today, with a clean upgrade path to a rigged GLB/VRM avatar when a model with facial blendshapes is available.</p></div>
      <div className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center"><div className="glass rounded-3xl p-8 grid place-items-center"><AnimatedAvatarPortrait speaking={speaking} size="lg" /><button onClick={demo} className="mt-6 bg-gradient-rb text-background px-5 py-3 rounded-lg font-semibold hover:scale-[1.02] transition">Preview speaking animation</button></div>
      <div className="grid gap-4">{[{icon:<MessageCircle className="h-4 w-4" />,title:"Project-aware answers",body:"The guide recommends the right case study for questions about OBSERV-E, EcoCAR, security automation, AI/ML, or leadership."},{icon:<RouteIcon className="h-4 w-4" />,title:"Route suggestions",body:"Every response can surface a clear link instead of forcing visitors to hunt through the site."},{icon:<Volume2 className="h-4 w-4" />,title:"Animated speech fallback",body:"The current implementation cycles mouth frames while browser TTS speaks. True lip sync is ready for a future rigged GLB/VRM with mouth blendshapes."}].map((c)=><div key={c.title} className="glass rounded-2xl p-5"><div className="flex items-center gap-3"><div className="h-9 w-9 rounded-lg bg-gradient-rb text-background grid place-items-center">{c.icon}</div><div className="font-display font-semibold">{c.title}</div></div><p className="mt-3 text-sm text-muted-foreground">{c.body}</p></div>)}<div className="glass rounded-2xl p-5 border-l-2 border-accent"><div className="text-xs uppercase tracking-widest text-accent">Upgrade path</div><p className="mt-2 text-sm text-muted-foreground">To enable natural mouth motion, blinking, and emotional facial expressions, replace the sprite fallback with a rigged avatar model containing ARKit/Oculus visemes such as <code>jawOpen</code>, <code>mouthOpen</code>, <code>viseme_aa</code>, and blink targets.</p></div></div></div>
    </div>
  );
}
