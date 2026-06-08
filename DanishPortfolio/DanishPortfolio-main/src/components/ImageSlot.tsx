import { ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";

type ImageSlotProps = {
  id: string;
  title: string;
  guidance: string;
  src?: string;
  className?: string;
  aspect?: string;
};

export function ImageSlot({ id, title, guidance, src, className = "", aspect = "aspect-video" }: ImageSlotProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showImage = Boolean(src) && !failed;

  if (showImage) {
    return (
      <div className={`group overflow-hidden rounded-3xl glass premium-border ${className}`}>
        <div className={`relative ${aspect} bg-muted/20`}>
          <img
            src={src}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            onError={() => setFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep/30 via-transparent to-transparent opacity-60" />
        </div>
      </div>
    );
  }

  return (
    <div className={`group overflow-hidden rounded-3xl glass premium-border ${className}`}>
      <div className={`relative ${aspect} bg-muted/20 grid place-items-center`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-background/30 to-rose-900/15" />
        <div className="relative z-10 px-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-border/80 bg-background/50">
            <ImageIcon className="h-7 w-7 text-accent" />
          </div>
          <div className="mt-4 text-xs uppercase tracking-[0.2em] text-accent font-tech">Image slot</div>
          <div className="mt-2 font-display text-lg font-semibold">{title}</div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{guidance}</p>
        </div>
        <div className="absolute left-4 top-4 rounded-full border border-border/70 bg-background/75 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-accent backdrop-blur">
          {id}
        </div>
      </div>
    </div>
  );
}
