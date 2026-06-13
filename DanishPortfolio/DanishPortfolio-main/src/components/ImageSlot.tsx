import { useEffect, useState } from "react";
import { ImmersiveImage } from "@/components/ImmersiveImage";

type ImageSlotProps = {
  id: string;
  title: string;
  guidance: string;
  src?: string;
  className?: string;
  aspect?: string;
};

export function ImageSlot({
  id,
  title,
  guidance,
  src,
  className = "",
  aspect = "aspect-video",
}: ImageSlotProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showImage = Boolean(src) && !failed;

  if (showImage) {
    return (
      <div className={`group overflow-hidden rounded-3xl glass premium-border ${className}`}>
        <ImmersiveImage
          src={src!}
          alt={title}
          aspect={aspect}
          animated={false}
          variant="gallery"
          className="rounded-3xl"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={`group overflow-hidden rounded-3xl glass premium-border ${className}`}>
      <ImmersiveImage
        src="/portfolio_images/generated/featured-portfolio-immersive.png"
        alt={`${title}: ${guidance}`}
        aspect={aspect}
        animated={false}
        variant="gallery"
        className="rounded-3xl"
      />
      <div className="absolute left-4 top-4 rounded-full border border-border/70 bg-background/75 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-accent backdrop-blur">
        {id}
      </div>
    </div>
  );
}
