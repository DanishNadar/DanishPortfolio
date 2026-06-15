export type PageMood =
  | "default"
  | "hero"
  | "projects"
  | "community"
  | "leadership"
  | "academic"
  | "autonomy";

export function PageAtmosphere({ mood }: { mood: PageMood }) {
  return (
    <div className={`page-atmosphere page-atmosphere-${mood}`} aria-hidden="true">
      <div className="page-atmosphere-wash" />
      <div className="page-atmosphere-grid" />
      <div className="page-atmosphere-noise" />
      <span className="page-atmosphere-orb page-atmosphere-orb-one" />
      <span className="page-atmosphere-orb page-atmosphere-orb-two" />
      <span className="page-atmosphere-orb page-atmosphere-orb-three" />
    </div>
  );
}
