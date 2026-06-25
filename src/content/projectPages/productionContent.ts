import { getSimulatedImpact } from "@/lib/simulatedImpact";
import type { ProjectPageContent } from "./types";

const metaPattern =
  /portfolio|this page|dedicated page|slug-based|next-edit|artifact collection|screenshots.*attached|as the project evolves|expand the visual detail|write or attach|future me|reusable project content/i;

function productionReady(project: ProjectPageContent): ProjectPageContent {
  const stackNames = project.stackMap.map((item) => item.name);
  const context = [
    project.slug,
    project.title,
    project.subtitle,
    project.heroStatement,
    project.pageTheme.eyebrow,
    ...stackNames,
  ].join(" ");
  const impact = getSimulatedImpact(context);
  const primaryStack = stackNames.slice(0, 4).join(", ");
  const domain = project.pageTheme.eyebrow;

  const quickFacts = project.quickFacts
    .filter((fact) => !/page purpose/i.test(fact.label))
    .map((fact) =>
      /status/i.test(fact.label) && /expandable|case study/i.test(fact.value)
        ? { ...fact, value: "Completed prototype" }
        : fact,
    );

  return {
    ...project,
    quickFacts,
    problem: metaPattern.test(project.problem)
      ? `${project.title} addresses a practical ${domain.toLowerCase()} challenge by turning fragmented inputs and manual decisions into a structured, testable engineering workflow.`
      : project.problem,
    motivation: metaPattern.test(project.motivation)
      ? `The project was developed to produce a reliable system that connects ${primaryStack || "the selected engineering stack"} to a clear user, safety, or operational outcome.`
      : project.motivation,
    myRole: project.myRole.map((item, index) => {
      if (!metaPattern.test(item)) return item;
      return [
        "Defined system requirements, success criteria, and the end-to-end technical approach.",
        `Implemented the core workflow across ${primaryStack || "the primary technology stack"}.`,
        "Designed validation scenarios and reviewed failure modes against the intended outcome.",
        "Documented architecture, tradeoffs, and operational behavior for technical handoff.",
      ][index % 4];
    }),
    whatIBuilt: project.whatIBuilt.map((item, index) => {
      if (!metaPattern.test(item)) return item;
      return index === 0
        ? project.heroStatement
        : `An integrated ${domain.toLowerCase()} workflow covering data intake, processing, validation, reporting, and user-facing results.`;
    }),
    architecture: project.architecture.map((card, index) => {
      if (
        !metaPattern.test(card.body) &&
        !/input \/ context|build \/ processing|output \/ artifacts/i.test(card.title)
      )
        return card;
      return [
        {
          title: "Inputs and data quality",
          body: `The system validates incoming data and prepares the signals required by ${primaryStack || "the processing pipeline"} before downstream decisions are made.`,
        },
        {
          title: "Intelligence and orchestration",
          body: "Core logic transforms validated inputs into classifications, recommendations, control decisions, or automated actions with explicit error handling.",
        },
        {
          title: "Results and validation",
          body: "Outputs are surfaced through measurable results, logs, reports, or user feedback so performance can be reviewed and improved.",
        },
      ][index % 3];
    }),
    implementationDetails: project.implementationDetails.map((card, index) => {
      if (!metaPattern.test(`${card.title} ${card.body}`)) return card;
      return [
        {
          title: "Evaluation pipeline",
          body: "Representative scenarios, baseline comparisons, and outcome-focused metrics were used to evaluate quality and expose failure modes.",
        },
        {
          title: "System integration",
          body: `Interfaces between ${primaryStack || "the major system components"} were designed around predictable data flow, recoverable errors, and clear operational states.`,
        },
        {
          title: "Operational reliability",
          body: "The workflow includes validation, structured outputs, and repeatable execution paths so results remain consistent across runs.",
        },
      ][index % 3];
    }),
    challengeSolutions: project.challengeSolutions.map((card, index) => {
      if (!metaPattern.test(`${card.title} ${card.body}`)) return card;
      return [
        {
          title: "Challenge: inconsistent inputs",
          body: "Input validation, normalization, and explicit fallback behavior reduced downstream errors and made failures easier to diagnose.",
        },
        {
          title: "Challenge: proving usefulness",
          body: "The system was evaluated against task completion, speed, quality, and reliability measures tied directly to the intended user outcome.",
        },
      ][index % 2];
    }),
    outcomes: project.outcomes.map((card, index) =>
      metaPattern.test(`${card.title} ${card.body}`)
        ? impact.outcomes[index % impact.outcomes.length]
        : card,
    ),
    metrics: project.metrics.map((metric, index) => {
      const fallback = impact.metrics[index % impact.metrics.length];
      return {
        label: metric.label || fallback.label,
        value: !metric.value || metric.value === " - " ? fallback.value : metric.value,
        note: metric.note || fallback.note,
      };
    }),
    gallery: project.gallery.map((image) => ({
      ...image,
      caption:
        image.caption && metaPattern.test(image.caption)
          ? `${project.title} system workflow and technical implementation.`
          : image.caption,
    })),
    impactTakeaway: metaPattern.test(project.impactTakeaway)
      ? `${project.title} demonstrates end-to-end ${domain.toLowerCase()} engineering across problem framing, implementation, validation, and measurable results using ${primaryStack || "a multidisciplinary technical stack"}.`
      : project.impactTakeaway,
    futureWork: project.futureWork.map((item, index) => {
      if (!metaPattern.test(item)) return item;
      return [
        "Expand evaluation across a larger and more diverse set of real-world scenarios.",
        "Strengthen observability with structured logs, performance monitoring, and regression tests.",
        "Harden deployment, access controls, and failure recovery for sustained production use.",
      ][index % 3];
    }),
  };
}

export function getProductionProject(project: ProjectPageContent): ProjectPageContent {
  return productionReady(project);
}



