import { Maximize2, X } from "lucide-react";
import {
  createContext,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type LightboxImage = {
  src: string;
  alt: string;
};

const ImageLightboxContext = createContext<((image: LightboxImage) => void) | null>(null);

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<LightboxImage | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollPositionRef = useRef({ x: 0, y: 0 });

  const close = useCallback(() => setImage(null), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !image) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    scrollPositionRef.current = { x: window.scrollX, y: window.scrollY };
    document.body.classList.add("image-lightbox-open");
    document.documentElement.classList.add("image-lightbox-open");
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.classList.remove("image-lightbox-open");
      document.documentElement.classList.remove("image-lightbox-open");
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      if (dialog.open) dialog.close();
      window.requestAnimationFrame(() => {
        window.scrollTo(scrollPositionRef.current.x, scrollPositionRef.current.y);
      });
    };
  }, [image]);

  return (
    <ImageLightboxContext.Provider value={setImage}>
      {children}
      {image && (
        <dialog
          ref={dialogRef}
          className="image-lightbox"
          aria-label={`Expanded image: ${image.alt}`}
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            event.preventDefault();
            event.stopPropagation();
            close();
          }}
        >
          <div className="image-lightbox-panel">
            <div className="image-lightbox-particles" aria-hidden="true">
              {Array.from({ length: 24 }, (_, index) => (
                <span key={index} className="image-lightbox-tech-icon" />
              ))}
            </div>
            <div className="image-lightbox-toolbar">
              <button
                type="button"
                className="image-lightbox-close"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  close();
                }}
                aria-label="Close expanded image"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="image-lightbox-frame">
              <img src={image.src} alt={image.alt} decoding="async" />
            </div>
            <div className="image-lightbox-caption">
              <span className="image-lightbox-signal" aria-hidden="true" />
              <span>{image.alt}</span>
              <span className="image-lightbox-hint">Press Esc or click outside to close</span>
            </div>
          </div>
        </dialog>
      )}
    </ImageLightboxContext.Provider>
  );
}

export function ImageZoomButton({
  src,
  alt,
  className = "",
}: LightboxImage & { className?: string }) {
  const openImage = useContext(ImageLightboxContext);

  if (!openImage || !src) return null;

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    openImage({ src, alt });
  };

  return (
    <button
      type="button"
      className={`image-zoom-trigger ${className}`}
      onClick={handleClick}
      aria-label={`Expand image: ${alt}`}
      title="Expand image"
    >
      <Maximize2 className="h-4 w-4" />
      <span>Expand</span>
    </button>
  );
}
