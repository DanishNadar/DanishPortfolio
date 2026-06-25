import { Fragment } from "react";

const technicalPhrases = [
  "perception-to-decision pipelines",
  "production-minded implementation",
  "accessibility robotics",
  "cloud/backend tooling",
  "robotics and autonomy",
  "autonomous-vehicle pipelines",
  "real-time vehicle integration",
  "AI-assisted engineering workflows",
  "AI engineering",
  "AI/ML engineering",
  "autonomous systems",
  "security automation",
  "applied machine learning",
  "machine learning",
  "computer vision",
  "sensor fusion",
  "backend systems",
  "vehicle signals",
  "systems engineering",
  "AI automation",
  "AI workflows",
  "AI products",
  "AI systems",
  "model evaluation",
  "production systems",
  "robotics",
  "autonomy",
  "validation",
  "Linux",
];

const escapedPhrases = technicalPhrases
  .sort((left, right) => right.length - left.length)
  .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

const technicalPattern = new RegExp(`(${escapedPhrases.join("|")})`, "gi");
const technicalPhraseSet = new Set(technicalPhrases.map((phrase) => phrase.toLowerCase()));

type TechnicalHighlightProps = {
  text: string;
};

export function TechnicalHighlight({ text }: TechnicalHighlightProps) {
  return text.split(technicalPattern).map((part, index) =>
    technicalPhraseSet.has(part.toLowerCase()) ? (
      <span key={`${part}-${index}`} className="technical-keyword">
        {part}
      </span>
    ) : (
      <Fragment key={`${part}-${index}`}>{part}</Fragment>
    ),
  );
}
