import { ArrowUpRight, BookOpen, ExternalLink, X } from "lucide-react";
import { SKILL_STORIES, STORY_BEATS } from "./level";
import type { SkillCubeNode } from "./types";

interface SkillStoryWindowProps {
  node: SkillCubeNode;
  onClose: () => void;
}

export function SkillStoryWindow({ node, onClose }: SkillStoryWindowProps) {
  const story = SKILL_STORIES[node.id];
  const storyBeat = STORY_BEATS[node.id];

  return (
    <aside
      className="intelligence-stack-skill-window"
      role="dialog"
      aria-labelledby="skill-story-title"
    >
      <button
        type="button"
        className="intelligence-stack-help-close"
        onClick={onClose}
        aria-label="Close skill story"
      >
        <X size={17} />
      </button>
      <div className="intelligence-stack-panel-topline">
        <span>{node.category}</span>
        <span className="intelligence-stack-status is-active">Activated</span>
      </div>
      <h2 id="skill-story-title">{node.label}</h2>
      <div className="intelligence-stack-story-image">
        <img src={story.image} alt={story.imageAlt} loading="lazy" decoding="async" />
      </div>
      <div className="intelligence-stack-story-beat">
        <span>{storyBeat.chapter}</span>
        <p>{storyBeat.beat}</p>
      </div>
      <p>{story.story}</p>
      <div className="intelligence-stack-story-references">
        <div className="intelligence-stack-story-reference-heading">
          <BookOpen size={14} /> Explore this work
        </div>
        {story.references.map((reference) => (
          <a
            key={reference.href}
            href={reference.href}
            target="_blank"
            rel="noreferrer"
            className="intelligence-stack-story-reference"
          >
            <span>
              <small>{reference.kind}</small>
              {reference.label}
            </span>
            <ArrowUpRight size={15} />
          </a>
        ))}
      </div>
      <div className="intelligence-stack-story-footer">
        <ExternalLink size={13} /> Portfolio references open in a new page.
      </div>
    </aside>
  );
}
