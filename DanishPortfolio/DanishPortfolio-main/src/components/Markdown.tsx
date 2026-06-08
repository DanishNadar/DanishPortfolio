import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="article-body max-w-none font-body text-[1.03rem] leading-8 text-slate-100/90 md:text-lg md:leading-9">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="mb-5 mt-10 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">{children}</h1>,
          h2: ({ children }) => <h2 className="mb-3 mt-9 border-t border-border/60 pt-7 font-display text-2xl font-bold leading-tight text-foreground md:text-3xl">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-2 mt-7 font-semibold text-xl leading-snug text-accent md:text-2xl">{children}</h3>,
          h4: ({ children }) => <h4 className="mb-2 mt-6 font-semibold text-lg text-foreground">{children}</h4>,
          p: ({ children }) => <p className="my-4 max-w-[78ch] font-body text-slate-100/90">{children}</p>,
          ul: ({ children }) => <ul className="my-5 ml-6 max-w-[78ch] list-disc space-y-2 text-slate-100/90">{children}</ul>,
          ol: ({ children }) => <ol className="my-5 ml-6 max-w-[78ch] list-decimal space-y-2 text-slate-100/90">{children}</ol>,
          li: ({ children }) => <li className="pl-1 leading-8">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          a: ({ href, children }) => <a href={href} className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:text-foreground">{children}</a>,
          code: ({ children }) => <code className="rounded-md border border-border bg-background/55 px-1.5 py-0.5 font-mono text-[0.88em] text-accent">{children}</code>,
          blockquote: ({ children }) => <blockquote className="my-6 border-l-2 border-accent pl-5 text-slate-100/80">{children}</blockquote>,
          img: ({ src, alt }) => (
            <img
              src={src ?? ""}
              alt={alt ?? "Article visual"}
              loading="lazy"
              className="my-8 aspect-video w-full rounded-3xl border border-border/70 object-cover shadow-2xl shadow-blue-950/40"
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
