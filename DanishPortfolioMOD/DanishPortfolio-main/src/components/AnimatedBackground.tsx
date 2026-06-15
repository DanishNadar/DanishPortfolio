import { useEffect } from "react";

// No Framer Motion — pure CSS keyframe animations so animation-play-state:paused
// works reliably when dn-engine-open is on <html>. Framer Motion uses the Web
// Animations API and ignores CSS animation-play-state entirely.

const particles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: 2 + (index % 4),
  delay: (index % 8) * 0.45,
  duration: 10 + (index % 7),
}));

const nodes = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  left: `${10 + ((index * 11) % 78)}%`,
  top: `${12 + ((index * 17) % 72)}%`,
  delay: index * 0.6,
}));

export function AnimatedBackground() {
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    let frame = 0;
    let zoomed = false;

    const syncZoomState = () => {
      frame = 0;
      const nextZoomed = viewport.scale > 1.03;
      if (nextZoomed === zoomed) return;
      zoomed = nextZoomed;
      document.documentElement.classList.toggle("viewport-zoomed", zoomed);
    };

    const scheduleSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncZoomState);
    };

    viewport.addEventListener("resize", scheduleSync, { passive: true });
    viewport.addEventListener("scroll", scheduleSync, { passive: true });
    scheduleSync();

    return () => {
      viewport.removeEventListener("resize", scheduleSync);
      viewport.removeEventListener("scroll", scheduleSync);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove("viewport-zoomed");
    };
  }, []);

  return (
    <div
      className="animated-background-root fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.18),transparent_42%),radial-gradient(ellipse_at_top_right,rgba(146,18,51,0.22),transparent_45%),linear-gradient(180deg,#071026,#050816)]" />
      <div className="absolute inset-0 grid-bg opacity-75" />
      <div className="absolute inset-0 neural-grid opacity-44" />
      <div className="absolute inset-0 sensor-fusion-radar opacity-18" />
      <div className="absolute inset-0 scanline-overlay opacity-12" />

      <div className="bg-orb bg-orb-a absolute -top-40 -left-36 h-[560px] w-[560px] rounded-full blur-3xl" />
      <div className="bg-orb bg-orb-b absolute top-1/4 -right-44 h-[620px] w-[620px] rounded-full blur-3xl" />
      <div className="bg-orb bg-orb-c absolute bottom-[-12rem] left-[36%] h-[540px] w-[540px] rounded-full blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="holographic-lyriq" aria-hidden="true">
          <div className="lyriq-road-layer">
            <span className="lyriq-road lyriq-road-a" />
            <span className="lyriq-road lyriq-road-b" />
          </div>
          <div className="lyriq-car">
            <span className="lyriq-underglow" />
            <span className="lyriq-airflow lyriq-airflow-a" />
            <span className="lyriq-airflow lyriq-airflow-b" />
            <span className="lyriq-airflow lyriq-airflow-c" />
            <span className="lyriq-sensor-halo lyriq-sensor-halo-front" />
            <span className="lyriq-sensor-halo lyriq-sensor-halo-rear" />
            <img
              className="lyriq-outline-img"
              src="/portfolio_images/shared/lyriq-outline-transparent.png"
              alt=""
              loading="eager"
              decoding="async"
            />
            <div className="lyriq-wheel-overlay lyriq-wheel-overlay-front" aria-hidden="true">
              <span className="lyriq-wheel-overlay-spokes" />
              <span className="lyriq-wheel-overlay-hub" />
            </div>
            <div className="lyriq-wheel-overlay lyriq-wheel-overlay-rear" aria-hidden="true">
              <span className="lyriq-wheel-overlay-spokes" />
              <span className="lyriq-wheel-overlay-hub" />
            </div>
          </div>
        </div>

        <div className="bg-system-flow bg-system-flow-top">
          Curiosity → Survival → Recovery → AI Engineering → Impact
        </div>
        <div className="bg-system-flow bg-system-flow-bottom">
          Sense → Model → Build → Validate → Empower
        </div>
      </div>

      {particles.map((p) => (
        <span
          key={p.id}
          className={`bg-particle ${p.id % 2 === 0 ? "bg-particle-l" : "bg-particle-r"} absolute rounded-full`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {nodes.map((n) => (
        <span
          key={n.id}
          className="bg-node absolute"
          style={{ left: n.left, top: n.top, animationDelay: `${n.delay}s` }}
        />
      ))}
    </div>
  );
}
