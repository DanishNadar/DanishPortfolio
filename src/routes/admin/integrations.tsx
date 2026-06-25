import { createFileRoute } from "@tanstack/react-router";
import { allIntegrations } from "@/lib/integrations";

export const Route = createFileRoute("/admin/integrations")({ component: IntegrationsAdmin });

function IntegrationsAdmin() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold">Integrations</h1>
        <p className="text-sm text-muted-foreground mt-1">Each integration is optional. The site degrades gracefully when one isn't configured.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {allIntegrations.map((i) => {
          const s = i.describe();
          return (
            <div key={s.provider} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold">{s.displayName}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${s.enabled ? "bg-accent text-background" : "bg-muted text-muted-foreground"}`}>
                  {s.enabled ? "configured" : "not configured"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{s.purpose}</p>
              <div className="mt-3 text-[10px] uppercase tracking-wide text-muted-foreground">Required env</div>
              <div className="font-mono text-xs">{s.requiredEnv.join(", ") || " - "}</div>
              {s.optionalEnv && s.optionalEnv.length > 0 && (
                <>
                  <div className="mt-2 text-[10px] uppercase tracking-wide text-muted-foreground">Optional env</div>
                  <div className="font-mono text-xs">{s.optionalEnv.join(", ")}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
