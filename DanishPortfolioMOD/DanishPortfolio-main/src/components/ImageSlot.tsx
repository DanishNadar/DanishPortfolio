import { useEffect, useState, type CSSProperties } from "react";
import { ImmersiveImage } from "@/components/ImmersiveImage";

type ImageSlotProps = {
  id: string;
  title: string;
  guidance: string;
  src?: string;
  fallbackSrc?: string;
  className?: string;
  aspect?: string;
  imgPosition?: string;
  imgScale?: number;
  imgOrigin?: string;
  /** When provided and image is missing/failed, shows an initials avatar instead of the generic placeholder */
  initials?: string;
  /** Tailwind gradient classes e.g. "from-cyan-700 to-blue-800" */
  initialsGradient?: string;
};

export function ImageSlot({
  id: _id,
  title,
  guidance,
  src,
  fallbackSrc,
  className = "",
  aspect = "aspect-video",
  imgPosition,
  imgScale,
  imgOrigin,
  initials,
  initialsGradient = "from-slate-700 to-slate-800",
}: ImageSlotProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showImage = Boolean(src) && !failed;

  const embedded = className.includes("rounded-none");
  const wrapperClass = embedded
    ? `group relative overflow-hidden ${className}`
    : `group relative overflow-hidden rounded-3xl glass premium-border ${className}`;
  const imgStyle = {
    objectPosition: imgPosition,
    "--image-scale": imgScale ? String(imgScale) : undefined,
    "--image-hover-scale": imgScale ? String(imgScale + 0.045) : undefined,
    "--image-origin": imgOrigin ?? imgPosition,
  } as CSSProperties;

  if (showImage) {
    return (
      <div className={wrapperClass}>
        <ImmersiveImage
          src={src!}
          alt={title}
          aspect={aspect}
          animated={false}
          variant="gallery"
          className="rounded-none"
          imgStyle={imgStyle}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  if (fallbackSrc) {
    return (
      <div className={wrapperClass}>
        <ImmersiveImage
          src={fallbackSrc}
          alt={`${title}: ${guidance}`}
          aspect={aspect}
          animated={false}
          variant="gallery"
          className="rounded-none"
          imgStyle={imgStyle}
        />
      </div>
    );
  }

  if (initials) {
    return (
      <div className={wrapperClass}>
        <div
          className={`relative ${aspect} bg-gradient-to-br ${initialsGradient} flex items-center justify-center`}
        >
          <span className="select-none text-6xl font-display font-bold text-white/20 tracking-tight">
            {initials}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <ImmersiveImage
        src="/portfolio_images/generated/featured-portfolio-immersive.png"
        alt={`${title}: ${guidance}`}
        aspect={aspect}
        animated={false}
        variant="gallery"
        className="rounded-none"
      />
    </div>
  );
}
