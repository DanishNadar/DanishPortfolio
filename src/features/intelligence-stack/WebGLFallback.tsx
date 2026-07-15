import { Link } from "@tanstack/react-router";
import { ArrowLeft, Boxes, Cpu, Sparkles } from "lucide-react";

export function WebGLFallback() {
  return (
    <div className="intelligence-stack-fallback">
      <div className="intelligence-stack-fallback-orbit" aria-hidden="true" />
      <div className="intelligence-stack-fallback-card">
        <div className="intelligence-stack-eyebrow">
          <Boxes size={15} /> Navigating the journey
        </div>
        <h1>THE STORY OF THE STACK</h1>
        <p className="intelligence-stack-subtitle">Navigate the systems behind my work.</p>
        <p>
          This browser cannot start the 3D scene, but the architecture remains visible: reliable
          intelligence is built from connected foundations, perception, planning, and action.
        </p>
        <div
          className="intelligence-stack-fallback-grid"
          aria-label="Six major intelligence systems"
        >
          {[
            "Machine Learning",
            "Computer Vision",
            "Robotics",
            "Autonomous Systems",
            "Sensor Fusion",
            "AI Infrastructure",
          ].map((label, index) => (
            <div key={label} className={"intelligence-stack-fallback-node node-" + index}>
              <Cpu size={16} />
              <span>{label}</span>
            </div>
          ))}
          <div className="intelligence-stack-fallback-final">
            <Sparkles size={18} /> Integrated Intelligence
          </div>
        </div>
        <div className="intelligence-stack-fallback-actions">
          <Link to="/projects" className="intelligence-stack-primary-action">
            Explore Danish’s projects
          </Link>
          <Link to="/" className="intelligence-stack-secondary-action">
            <ArrowLeft size={16} /> Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
