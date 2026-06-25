import { project as observ_e } from "./observ_e";
import { project as selvam_valuations } from "./selvam_valuations";
import { project as ecocar_sensor_fusion } from "./ecocar_sensor_fusion";
import { project as a_little_tech_for_you } from "./a_little_tech_for_you";
import { project as rl_autonomous_driving } from "./rl_autonomous_driving";
import { project as lane_detection_salad } from "./lane_detection_salad";
import { project as dns_security_scanner } from "./dns_security_scanner";
import { project as ttp_outreach_automation } from "./ttp_outreach_automation";
import { project as scammantha } from "./scammantha";
import { project as jtr_agent } from "./jtr_agent";
import { project as aila_avatar } from "./aila_avatar";
import { project as fraud_detection } from "./fraud_detection";
import { project as course_recommendation } from "./course_recommendation";
import { project as ai_headshot_platform } from "./ai_headshot_platform";
import { project as phishing_detector } from "./phishing_detector";
import { project as spiron_assistant } from "./spiron_assistant";
import { project as shopping_bot } from "./shopping_bot";
import { getProductionProject } from "./productionContent";

export const projectPages = [
  observ_e,
  selvam_valuations,
  ecocar_sensor_fusion,
  a_little_tech_for_you,
  rl_autonomous_driving,
  lane_detection_salad,
  dns_security_scanner,
  ttp_outreach_automation,
  scammantha,
  jtr_agent,
  aila_avatar,
  fraud_detection,
  course_recommendation,
  ai_headshot_platform,
  phishing_detector,
  spiron_assistant,
  shopping_bot,
];
export const projectPageBySlug: Record<string, (typeof projectPages)[number]> = Object.fromEntries(
  projectPages.map((p) => [p.slug, p]),
);
export function getProjectPage(slug: string) {
  const project = projectPageBySlug[slug];
  return project ? getProductionProject(project) : null;
}
export * from "./types";



