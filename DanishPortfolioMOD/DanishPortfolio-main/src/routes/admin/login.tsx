import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — Danish Nadar" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center px-6">
      <div className="w-full max-w-sm glass rounded-2xl p-8">
        <h1 className="text-2xl font-display font-bold text-gradient-rb">Admin {mode === "signin" ? "Sign in" : "Sign up"}</h1>
        <p className="text-sm text-muted-foreground mt-1">First account created becomes admin automatically.</p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-input/40 border border-border rounded-lg px-3 py-2 text-sm" />
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-input/40 border border-border rounded-lg px-3 py-2 text-sm" />
          {err && <div className="text-xs text-destructive">{err}</div>}
          <button disabled={busy} className="w-full bg-gradient-rb text-background font-semibold py-2 rounded-lg disabled:opacity-50">
            {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-4 text-xs text-muted-foreground hover:text-accent">
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
        <div className="mt-6 text-xs"><Link to="/" className="text-muted-foreground hover:text-accent">← Back to site</Link></div>
      </div>
    </div>
  );
}
