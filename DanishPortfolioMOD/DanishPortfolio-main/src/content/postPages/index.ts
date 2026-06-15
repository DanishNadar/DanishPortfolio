import { post as intelligent_systems_for_safer_roads } from "./intelligent_systems_for_safer_roads";
import { post as starkhacks_2026_observ_e_win } from "./starkhacks_2026_observ_e_win";
import { post as ecocar_sensor_fusion_reflection } from "./ecocar_sensor_fusion_reflection";
import { post as building_an_rl_lane_keeping_simulator } from "./building_an_rl_lane_keeping_simulator";
import { post as lane_detection_backbone_bake_off } from "./lane_detection_backbone_bake_off";
import { post as automating_spf_dkim_dmarc_screening } from "./automating_spf_dkim_dmarc_screening";
import { post as ttp_streamlit_outreach_automation } from "./ttp_streamlit_outreach_automation";
import { post as scammantha_scam_awareness_game } from "./scammantha_scam_awareness_game";
import { post as career_bootcamp_takeaways } from "./career_bootcamp_takeaways";
import { post as networking_event_ink_factory } from "./networking_event_ink_factory";
import { post as building_an_ai_avatar_portfolio } from "./building_an_ai_avatar_portfolio";
import { post as why_accessibility_robotics } from "./why_accessibility_robotics";
import { post as debugging_vercel_supabase_deploys } from "./debugging_vercel_supabase_deploys";
import { post as linux_first_ai_engineering_workflow } from "./linux_first_ai_engineering_workflow";

import { generatedStackPosts } from "./generatedStackPosts";

export const postPages = [linux_first_ai_engineering_workflow, intelligent_systems_for_safer_roads, starkhacks_2026_observ_e_win, ecocar_sensor_fusion_reflection, building_an_rl_lane_keeping_simulator, lane_detection_backbone_bake_off, automating_spf_dkim_dmarc_screening, ttp_streamlit_outreach_automation, scammantha_scam_awareness_game, career_bootcamp_takeaways, networking_event_ink_factory, building_an_ai_avatar_portfolio, why_accessibility_robotics, debugging_vercel_supabase_deploys, ...generatedStackPosts];
export const postPageBySlug: Record<string, (typeof postPages)[number]> = Object.fromEntries(postPages.map((p) => [p.slug, p]));
export function getPostPage(slug: string) { return postPageBySlug[slug] ?? null; }
export * from "./types";
