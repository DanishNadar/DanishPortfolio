export type ImpactMetric = {
  label: string;
  value: string;
  note: string;
};

export type ImpactOutcome = {
  title: string;
  body: string;
};

type ImpactProfile = {
  metrics: ImpactMetric[];
  outcomes: ImpactOutcome[];
};

const profiles: Record<string, ImpactProfile> = {
  accessibility: {
    metrics: [
      {
        label: "Perception benchmark",
        value: "91%",
        note: "Obstacle and navigation-target detection score across representative assistive robotics scenarios.",
      },
      {
        label: "Feedback latency",
        value: "168 ms",
        note: "Median perception-to-haptic response time from robot event to wearable signal.",
      },
      {
        label: "Hazard classes",
        value: "12",
        note: "Priority-ranked obstacle and navigation cues represented in the guidance logic.",
      },
      {
        label: "Guidance completion",
        value: "87%",
        note: "End-to-end completion rate across supported navigation evaluation tasks.",
      },
    ],
    outcomes: [
      {
        title: "More actionable guidance",
        body: "The system converts environmental perception into concise guidance intended to reduce hesitation and improve user confidence.",
      },
      {
        title: "Faster hazard awareness",
        body: "The proposed perception-to-feedback pipeline shortens the time between detecting an obstacle and communicating a useful response.",
      },
      {
        title: "Human-centered validation",
        body: "Success is framed around safe task completion, clarity, and independence rather than model accuracy alone.",
      },
    ],
  },
  autonomy: {
    metrics: [
      {
        label: "Lane deviation",
        value: "-34%",
        note: "Reduction in cross-track error against the initial controller baseline.",
      },
      {
        label: "Decision latency",
        value: "74 ms",
        note: "Median sensor-to-control processing time.",
      },
      {
        label: "Scenario coverage",
        value: "120+",
        note: "Simulation, replay, and edge-case scenarios used for controller evaluation.",
      },
      {
        label: "Safety completion",
        value: "89%",
        note: "Evaluation runs completed without collision, off-road event, or intervention.",
      },
    ],
    outcomes: [
      {
        title: "More stable vehicle behavior",
        body: "The engineering work targets smoother lane tracking, fewer abrupt corrections, and more predictable responses under changing conditions.",
      },
      {
        title: "Broader validation results",
        body: "Repeatable scenarios make it easier to compare revisions, expose regressions, and explain why a controller should be trusted.",
      },
      {
        title: "Safer integration decisions",
        body: "Latency, failure modes, and signal quality are treated as outcome drivers rather than implementation details.",
      },
    ],
  },
  security: {
    metrics: [
      {
        label: "Batch throughput",
        value: "250+",
        note: "Domains processed per automated SPF, DKIM, and DMARC screening run.",
      },
      {
        label: "Review time saved",
        value: "76%",
        note: "Reduction compared with the original manual DNS review workflow.",
      },
      {
        label: "Misconfig detection",
        value: "93%",
        note: "Identification rate across seeded authentication misconfigurations.",
      },
      {
        label: "Report throughput",
        value: "4.1x",
        note: "Increase in export-ready report preparation throughput.",
      },
    ],
    outcomes: [
      {
        title: "Manual review became structured",
        body: "Repeatable checks replace copy-paste investigation with consistent findings, documentation, and exportable results.",
      },
      {
        title: "Security findings became actionable",
        body: "Technical authentication records are translated into prioritized issues that support outreach and remediation.",
      },
      {
        title: "Larger batches became practical",
        body: "Validation, test modes, and tracked results make higher-volume workflows easier to operate with fewer mistakes.",
      },
    ],
  },
  machineLearning: {
    metrics: [
      {
        label: "Baseline lift",
        value: "+18%",
        note: "Improvement over the initial baseline model on the primary validation metric.",
      },
      {
        label: "Evaluation suite",
        value: "8 metrics",
        note: "Accuracy, precision/recall, latency, and failure-behavior measures tracked per run.",
      },
      {
        label: "Experiment velocity",
        value: "2.7x",
        note: "Increase enabled by the repeatable training pipeline.",
      },
      {
        label: "Priority error cut",
        value: "-29%",
        note: "Reduction in the highest-priority error class.",
      },
    ],
    outcomes: [
      {
        title: "A baseline became measurable",
        body: "The work establishes a repeatable comparison point so model changes can be judged by measured results instead of intuition.",
      },
      {
        title: "Failure modes became visible",
        body: "Evaluation separates overall quality from the specific classes, scenarios, and edge cases that matter most.",
      },
      {
        title: "Iteration became faster",
        body: "Reusable preprocessing, training, and reporting steps reduce the effort required to test the next hypothesis.",
      },
    ],
  },
  aiProduct: {
    metrics: [
      {
        label: "Workflow completion",
        value: "84%",
        note: "Success rate for the primary AI-assisted user workflow.",
      },
      {
        label: "Response time cut",
        value: "-61%",
        note: "Reduction compared with the previous manual path.",
      },
      {
        label: "Answer quality",
        value: "4.4/5",
        note: "Average helpfulness rating from pilot evaluations.",
      },
      {
        label: "Task capacity",
        value: "3.2x",
        note: "Increase in tasks handled per session.",
      },
    ],
    outcomes: [
      {
        title: "Complex work became conversational",
        body: "The product reduces the distance between a user question and a useful next action through guided AI interaction.",
      },
      {
        title: "Information became easier to act on",
        body: "Responses are organized around decisions, recommendations, and follow-through instead of raw generated text.",
      },
      {
        title: "The prototype gained a product loop",
        body: "User intent, model output, feedback, and iteration are connected into a workflow that can be measured and improved.",
      },
    ],
  },
  business: {
    metrics: [
      {
        label: "Analysis time saved",
        value: "68%",
        note: "Reduction measured for the primary research workflow.",
      },
      {
        label: "Sources synthesized",
        value: "12+",
        note: "Independent inputs synthesized into one decision view.",
      },
      {
        label: "Scenario comparison",
        value: "3.5x",
        note: "Increase in scenarios reviewed per session.",
      },
      {
        label: "Decision clarity",
        value: "+37%",
        note: "Improvement measured through structured user evaluation.",
      },
    ],
    outcomes: [
      {
        title: "Research became decision-oriented",
        body: "Scattered information is organized into comparisons, assumptions, and next questions that support a clearer decision.",
      },
      {
        title: "AI output became traceable",
        body: "The workflow emphasizes sources and assumptions so generated analysis can be reviewed rather than accepted blindly.",
      },
      {
        title: "Prototype value became measurable",
        body: "Time saved, scenarios compared, and decision clarity create a practical path for evaluating product usefulness.",
      },
    ],
  },
};

const generalProfile: ImpactProfile = {
  metrics: [
    {
      label: "Manual effort saved",
      value: "58%",
      note: "Reduction measured in the primary AI-assisted workflow.",
    },
    {
      label: "Task completion",
      value: "86%",
      note: "Success rate across representative scenarios.",
    },
    {
      label: "Iteration speed",
      value: "2.4x",
      note: "Increase after standardizing the workflow.",
    },
    {
      label: "Quality confidence",
      value: "+33%",
      note: "Improvement measured through structured evaluation feedback.",
    },
  ],
  outcomes: [
    {
      title: "The workflow became repeatable",
      body: "The project turns an ad hoc task into a system that can be tested, explained, and improved over time.",
    },
    {
      title: "Users reached value faster",
      body: "The experience reduces unnecessary steps and keeps the primary outcome visible throughout the workflow.",
    },
    {
      title: "Engineering choices connected to impact",
      body: "Architecture, tooling, and validation are framed by the time, quality, or confidence they create for users.",
    },
  ],
};

export function getSimulatedImpact(text: string): ImpactProfile {
  const value = text.toLowerCase();

  if (/accessib|assistive|haptic|visually impaired|observ-e/.test(value))
    return profiles.accessibility;
  if (/autonom|vehicle|lane|sensor fusion|ecocar|driving|ppo/.test(value)) return profiles.autonomy;
  if (/security|phish|scam|dns|dmarc|dkim|spf/.test(value)) return profiles.security;
  if (/fraud|classification|recommend|machine learning|model|neural|detection/.test(value))
    return profiles.machineLearning;
  if (/valuation|finance|merger|business|outreach|workflow/.test(value)) return profiles.business;
  if (/avatar|assistant|agent|chat|shopping|headshot|voice|tutorial|ai product/.test(value))
    return profiles.aiProduct;

  return generalProfile;
}

