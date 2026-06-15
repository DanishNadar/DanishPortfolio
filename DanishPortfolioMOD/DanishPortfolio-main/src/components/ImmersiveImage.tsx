import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";

type ImmersiveImageProps = {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  imgClassName?: string;
  imgStyle?: CSSProperties;
  animated?: boolean;
  priority?: boolean;
  variant?: "card" | "hero" | "gallery";
  onError?: () => void;
  expandable?: boolean;
};

const LIGHTBOX_EXIT_MS = 220;

export function ImmersiveImage({
  src,
  alt,
  aspect = "aspect-video",
  className = "",
  imgClassName = "",
  imgStyle,
  animated = false,
  priority = false,
  variant = "card",
  onError,
  expandable = true,
}: ImmersiveImageProps) {
  const [lightboxMounted, setLightboxMounted] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const clearScheduledWork = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  }, []);

  const closeLightbox = useCallback(() => {
    clearScheduledWork();
    setLightboxVisible(false);
    closeTimerRef.current = window.setTimeout(() => {
      setLightboxMounted(false);
      closeTimerRef.current = null;
    }, LIGHTBOX_EXIT_MS);
  }, [clearScheduledWork]);

  const openLightbox = useCallback(
    (event?: MouseEvent | KeyboardEvent) => {
      if (!expandable) return;
      event?.preventDefault();
      event?.stopPropagation();
      clearScheduledWork();
      setLightboxMounted(true);
      openTimerRef.current = window.setTimeout(() => {
        setLightboxVisible(true);
        openTimerRef.current = null;
      }, 20);
    },
    [clearScheduledWork, expandable],
  );

  useEffect(() => {
    if (!lightboxMounted) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKeyDown);

    if (lightboxVisible) closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [closeLightbox, lightboxMounted, lightboxVisible]);

  useEffect(() => clearScheduledWork, [clearScheduledWork]);

  const lightbox =
    expandable && lightboxMounted && document.getElementById("image-lightbox-root")
      ? createPortal(
          <div
            className={`image-lightbox ${lightboxVisible ? "image-lightbox-visible" : "image-lightbox-closing"}`}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (event.target === event.currentTarget) closeLightbox();
            }}
          >
            <div className="image-lightbox-glow" aria-hidden="true" />
            <figure
              className="image-lightbox-figure"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <img src={src} alt={alt} className="image-lightbox-media" />
              <figcaption className="image-lightbox-caption">{alt}</figcaption>
            </figure>
            <button
              ref={closeButtonRef}
              type="button"
              className="image-lightbox-close"
              aria-label="Close expanded image"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                closeLightbox();
              }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>,
          document.getElementById("image-lightbox-root")!,
        )
      : null;

  return (
    <>
      <div
        className={`immersive-image immersive-image-${variant} ${animated ? "immersive-image-animated" : ""} ${expandable ? "immersive-image-expandable" : ""} ${className}`}
      >
        <div className={`relative ${aspect} overflow-hidden rounded-[inherit] bg-muted/20`}>
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            className={`immersive-image-media absolute inset-0 h-full w-full object-cover ${imgClassName}`}
            style={imgStyle}
            onError={onError}
          />
          <div className="immersive-image-vignette" aria-hidden="true" />
          <div className="immersive-image-scan" aria-hidden="true" />
          <div className="immersive-image-sweep" aria-hidden="true" />
          {expandable && (
            <span
              className="immersive-image-expand-hint"
              role="button"
              tabIndex={0}
              aria-label={`Expand image: ${alt}`}
              onClick={openLightbox}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") openLightbox(event);
              }}
            >
              <Maximize2 className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
      {lightbox}
    </>
  );
}
