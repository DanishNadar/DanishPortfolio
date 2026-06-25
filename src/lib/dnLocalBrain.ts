import knowledge from "../data/dn_profile_knowledge.json";

export type DNEngineAnswer = {
  reply: string;
  suggestedRoute?: string;
  suggestedLabel?: string;
  confidence?: "high" | "medium" | "low";
  source?: "llm" | "local";
};

type AnyRecord = Record<string, unknown>;

type KnowledgeItem = {
  kind: "project" | "skill" | "achievement" | "page" | "article" | "focus" | "autonomy" | "hobby" | "experience" | "education";
  title: string;
  summary: string;
  route?: string;
  tags: string[];
  raw?: unknown;
};

const DN_KNOWLEDGE = knowledge as AnyRecord;

function asArray<T = AnyRecord>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#.\-/\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function compactText(value: string, max = 360) {
  return value.replace(/\s+/g, " ").trim().slice(0, max).trim();
}

function sentenceLimit(text: string, maxSentences = 2, maxChars = 340) {
  const cleaned = compactText(text, maxChars + 200);
  if (!cleaned) return "";
  const parts = cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [cleaned];
  return compactText(parts.slice(0, maxSentences).join(" "), maxChars);
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function itemText(item: KnowledgeItem) {
  return `${item.title} ${item.summary} ${item.tags.join(" ")}`;
}

function allTextFields(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(allTextFields);
  if (value && typeof value === "object") return Object.values(value as AnyRecord).flatMap(allTextFields);
  return [];
}

function fuzzyDanishQuery(query: string) {
  const q = query.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  return (
    /\bwho\b/.test(q) && (/\bdanish\b/.test(q) || /\bdani\s*h\b/.test(q) || /\bdn\b/.test(q))
  ) || /\babout\s+(danish|dn)\b/.test(q) || /\bwho\s+is\s+he\b/.test(q);
}

function contactQuery(query: string) {
  return /hire|contact|email|collab|collaborate|reach|recruit|interview|connect/.test(query.toLowerCase());
}

function autonomyQuery(query: string) {
  return /auton|vehicle|car|drive|lane|fusion|ecocar|adas|rl|sensor/.test(query.toLowerCase());
}

function guideIdentityQuery(query: string) {
  const q = query.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  return /\bwho\s+are\s+you\b/.test(q) || /\bwhat\s+are\s+you\b/.test(q) || /\bare\s+you\s+danish\b/.test(q);
}

export function dnEngineMetaQuery(query: string) {
  const q = query
    .toLowerCase()
    .replace(/[^a-z0-9+\s]/g, " ")
    .replace(/\ba\s*i\b/g, "ai")
    .replace(/\bi\s*this\b/g, "is this")
    .replace(/\bthi\b/g, "this")
    .replace(/\s+/g, " ")
    .trim();

  return (
    /\b(is|are|was)\s+(this|you|the\s+engine|dn)\s+((a|an)\s+)?(actual\s+|real\s+)?(llm|ai|model|language\s+model|chatbot)\b/.test(q) ||
    /\b(real|actual)\s+(llm|ai|model|language\s+model)\b/.test(q) ||
    /\bwhat\s+model\s+(are|is)\s+(you|this|it)\b/.test(q) ||
    /\bwhat\s+(llm|ai|model)\s+(are|is)\s+(you|this|it)\s+using\b/.test(q) ||
    /\bhardcoded\b/.test(q) ||
    /\busing\s+(groq|openai|llm|ai|a\s+model|an\s+llm)\b/.test(q) ||
    /\bpowered\s+by\s+(groq|an\s+llm|a\s+model|ai)\b/.test(q)
  );
}

export function dnEngineMetaAnswer(groqConfigured = false): DNEngineAnswer {
  return {
    reply: groqConfigured
      ? "Yes  -  this guide sends questions to a Groq-hosted LLM through a server-side API, then grounds the answer in Danish's portfolio context. If Groq is unavailable, it falls back to a smaller local responder so the site still works."
      : "It is built to use Groq through a server-side LLM endpoint, but this deployment does not appear to have the Groq key available. Without that key, it uses a simpler local fallback instead of a full dynamic model.",
    confidence: groqConfigured ? "high" : "medium",
    source: "local",
  };
}

function brokenSiteQuery(query: string) {
  return /not working|broken|hardcoded|api key|groq|vercel|fallback|why.*not/.test(query.toLowerCase());
}


type ConversationTurn = {
  role: "user" | "avatar";
  text: string;
};

function normalizeForIntent(query: string) {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\bdani\s*h\b/g, "danish")
    // Repair common missing-"s" inputs from older broken iframe builds.
    .replace(/\bkill\b/g, "skill")
    .replace(/\bkills\b/g, "skills")
    .replace(/\bdoe\b/g, "does")
    .replace(/\bthi\b/g, "this")
    .replace(/\bthi\s/g, "this ")
    .replace(/\bi\s*this\b/g, "is this")
    .replace(/\bwhat\s*i\b/g, "what is")
    .replace(/\bwho\s*i\b/g, "who is")
    .replace(/\bwhat\s*s\b/g, "what is")
    .replace(/\bwho\s*s\b/g, "who is")
    .replace(/\bli\s*t\b/g, "list")
    .replace(/\bu\s*eful\b/g, "useful")
    .replace(/\baobut\b/g, "about")
    .replace(/\baoubt\b/g, "about")
    .replace(/\s+/g, " ")
    .trim();
}

function recentConversationText(history: ConversationTurn[] = []) {
  return history
    .slice(-8)
    .map((turn) => turn.text)
    .join(" ")
    .toLowerCase();
}

function recentDanishAnchor(history: ConversationTurn[] = []) {
  const recent = recentConversationText(history);
  return /danish|nadar|dn response engine|portfolio|his projects|his work|about him/.test(recent);
}

function danishCoreferenceQuery(query: string, history: ConversationTurn[] = []) {
  const q = normalizeForIntent(query);
  if (guideIdentityQuery(query)) return false;

  const hasPronoun = /\b(he|him|his|himself|that guy|this guy|that person|this person)\b/.test(q);
  const asksForPerson = /\b(who|about|tell me|what has|what is|what can|worked on|capable|projects|skills|resume|background|story|contact|hire)\b/.test(q);

  // On Danish's portfolio, ambiguous he/him/his questions should almost always resolve to Danish.
  // History makes it even stronger, but the site context itself is enough for short follow-ups like "Who is he?".
  return hasPronoun && (asksForPerson || recentDanishAnchor(history) || q.length < 80);
}

function questionMentionsDanish(query: string) {
  const q = normalizeForIntent(query);
  return /\b(danish|nadar|dn)\b/.test(q);
}

function clarifiesDanishReference(query: string) {
  const q = normalizeForIntent(query);
  return /talking about danish|mean danish|meant danish|about danish|him means danish|he means danish|his means danish|referring to danish/.test(q);
}

function negatedIdentityQuery(query: string, history: ConversationTurn[] = []) {
  const q = normalizeForIntent(query);
  const aboutDanish = questionMentionsDanish(query) || danishCoreferenceQuery(query, history) || recentDanishAnchor(history);
  return aboutDanish && (
    /\bwho\s+(is|s)?\s*(he|danish)?\s*not\b/.test(q) ||
    /\bwhat\s+(is|s)?\s*(he|danish)?\s*not\b/.test(q) ||
    /\bwhat\s+(isn\s*t|isnt)\s*(he|danish)\b/.test(q) ||
    /\bnot\s+just\b/.test(q) ||
    /\bnot\s+only\b/.test(q)
  );
}

function negatedIdentityAnswer() {
  return "Danish is not just one project, one title, or a generic AI portfolio persona. He is a student engineer and builder whose work spans applied AI, robotics, autonomy, security automation, full-stack tools, and technical leadership.";
}

function identityAnswer() {
  return "Danish Nadar is an AI engineer and AI student at Illinois Tech in Chicago. His work focuses on applied AI, robotics, autonomous systems, security automation, full-stack product tools, and technical leadership.";
}

function asksForDanishIdentity(query: string, history: ConversationTurn[] = []) {
  const q = normalizeForIntent(query);
  return fuzzyDanishQuery(query) || danishCoreferenceQuery(query, history) && /\b(who|about|tell me|background|story)\b/.test(q);
}

function capabilityQuery(query: string) {
  const q = normalizeForIntent(query);
  return /capable|capability|capabilities|strength|strengths|what can|what does|what do|do professionally|good at|skilled at|skill set|stack|experience/.test(q);
}

function followUpWantsBroaderAnswer(query: string) {
  const q = normalizeForIntent(query);
  return /just that|one thing|only one|more than|anything else|what else|list|broader|all of|more detail/.test(q);
}

function unclearFeedbackQuery(query: string) {
  const q = normalizeForIntent(query);
  return /nothing to do|not related|not what|unclear|confusing|wrong answer|that had/.test(q);
}

function professionalQuestion(query: string) {
  const q = normalizeForIntent(query);
  return /project|work|professional|career|resume|skill|stack|robot|ai|ml|autonom|security|engineer|intern|hire|build|experience|leadership/.test(q);
}

function capabilityAnswer() {
  return "Danish is strongest at turning technical ideas into working systems: applied AI/ML, robotics and autonomy workflows, security automation, full-stack product builds, and technical leadership. He is especially good at connecting the model, code, user experience, and real-world purpose behind a project.";
}

function capabilityListAnswer() {
  return [
    "Danish can work across several lanes:",
    "• applied AI/ML prototypes and LLM-powered tools",
    "• robotics, sensor fusion, and autonomous vehicle workflows",
    "• security automation, especially DNS and email-authentication scanning",
    "• full-stack product builds with React, APIs, Supabase, Vercel, and integrations",
    "• technical leadership, workshops, project strategy, and mentoring"
  ].join("\n");
}

function projectOverviewAnswer() {
  return [
    "Danish has worked on accessibility robotics, EcoCAR-style sensor fusion and ADAS logic, lane detection/autonomous driving experiments, DNS/email security automation, AI avatars, and full-stack AI product prototypes.",
    "The common thread is applied AI systems that connect software, data, hardware, and a real user need."
  ].join(" ");
}

function projectOverviewListAnswer() {
  return [
    "Danish has worked on a wide mix of projects:",
    "• accessibility robotics and environmental guidance systems",
    "• EcoCAR, ADAS, sensor fusion, and driver-monitoring work",
    "• lane detection and reinforcement-learning driving simulations",
    "• DNS, SPF, DKIM, and DMARC security automation",
    "• AI portfolio guides, avatars, and LLM-powered product ideas",
    "• full-stack web apps, database-backed tools, and technical demos"
  ].join("\n");
}

function generalScopeAnswer(query: string) {
  const q = normalizeForIntent(query);
  if (/^(hi|hey|hello|yo)\b/.test(q)) {
    return "Hey  -  ask me about Danish's projects, skills, autonomy work, achievements, resume, or contact info.";
  }
  if (/how are you|how is it going|how are u|how r u|what s going on|what is going on/.test(q)) {
    return "I'm a portfolio AI, so I do not have real feelings, but I'm running fine. I mainly answer questions about Danish's work, projects, skills, and background.";
  }
  if (/cool|nice|awesome|sounds good|that s cool|ok|okay|alright|bruh/.test(q)) {
    return "Got you. I'm mainly here to answer questions about Danish, especially his projects, skills, autonomy work, achievements, resume, and contact info.";
  }
  if (/what is your name|who are you|what are you/.test(q)) {
    return "I'm the DN Response Engine, a small AI guide for Danish's portfolio. I answer questions about Danish's background, projects, skills, and work.";
  }
  if (/\b2\s*\+\s*2\b|two plus two/.test(q)) {
    return "2 + 2 is 4. I mainly answer questions about Danish's work, projects, skills, and background.";
  }
  return "I'm not sure how to connect that to Danish. I mainly answer questions about his projects, skills, autonomy work, achievements, resume, and contact info.";
}

function unclearAnswer(query: string) {
  if (professionalQuestion(query)) {
    return "I'm not fully sure what you mean, but if you mean Danish professionally, his main lanes are applied AI, robotics/autonomy, security automation, full-stack product systems, and technical leadership.";
  }
  return "I'm not fully sure what you mean. I mainly answer questions about Danish's projects, skills, autonomy work, achievements, resume, and contact info.";
}

function projectQuery(query: string) {
  const q = normalizeForIntent(query);
  return /worked on|work on|projects|built|made|created|portfolio|examples|show me work|past work|experience/.test(q);
}

function feedbackQuery(query: string) {
  const q = normalizeForIntent(query);
  return /terrible|bad|suck|not good|wrong|improve|not what|not needed|nothing to do|try again|fix/.test(q);
}

function casualAcknowledgementQuery(query: string) {
  const q = normalizeForIntent(query);
  return (
    /^(cool|nice|awesome|great|sweet|ok|okay|alright|got it|bruh|lol)\b/.test(q) ||
    /^(that is|that s|this is|this s)\s+(cool|nice|awesome|great|interesting|helpful)\b/.test(q) ||
    /\b(sounds good|makes sense|that helps)\b/.test(q)
  );
}

function topicRouteForQuery(query: string) {
  const q = normalizeForIntent(query);
  if (/contact|email|hire|reach|connect|collab/.test(q)) return { route: "/contact", label: "Contact" };
  if (/resume|experience|intern|education/.test(q)) return { route: "/resume", label: "Resume" };
  if (/autonom|vehicle|ecocar|sensor|fusion|lane|adas|driving/.test(q)) return { route: "/autonomous-vehicles", label: "Autonomy" };
  if (/skill|stack|tool|language|framework|capable|capability/.test(q)) return { route: "/stack-map", label: "Stack Map" };
  if (/project|worked|built|created|made/.test(q)) return { route: "/projects", label: "Projects" };
  if (/who|about|background|story/.test(q)) return { route: "/about", label: "About" };
  return undefined;
}

function previousUserQuestion(history: ConversationTurn[]) {
  return [...history].reverse().find((turn) => turn.role === "user")?.text ?? "";
}

export function getDNProfileKnowledge() {
  return DN_KNOWLEDGE;
}

export function buildKnowledgeItems(): KnowledgeItem[] {
  const items: KnowledgeItem[] = [];

  for (const project of asArray<AnyRecord>(DN_KNOWLEDGE.projects)) {
    const title = asString(project.title);
    if (!title) continue;
    const skills = asArray<string>(project.skills);
    const outcomes = asArray<string>(project.outcomes);
    const notes = allTextFields(project.implementationNotes).join(" ");
    items.push({
      kind: "project",
      title,
      summary: [asString(project.summary), asString(project.role), outcomes.join(" "), notes].filter(Boolean).join(" "),
      route: asString(project.route) || "/projects",
      tags: unique([asString(project.domain), asString(project.slug), ...skills, ...outcomes.flatMap(tokenize)]).filter(Boolean),
      raw: project,
    });
  }

  for (const skill of asArray<AnyRecord>(DN_KNOWLEDGE.skills)) {
    const title = asString(skill.name);
    if (!title) continue;
    const projects = asArray<string>(skill.projects);
    items.push({
      kind: "skill",
      title,
      summary: asString(skill.short),
      route: "/stack-map",
      tags: unique([asString(skill.category), asString(skill.slug), ...projects]).filter(Boolean),
      raw: skill,
    });
  }

  for (const achievement of asArray<AnyRecord>(DN_KNOWLEDGE.achievements)) {
    const title = asString(achievement.title);
    if (!title) continue;
    items.push({
      kind: "achievement",
      title,
      summary: asString(achievement.context),
      route: asString(achievement.route) || "/about",
      tags: tokenize(`${title} ${asString(achievement.context)}`),
      raw: achievement,
    });
  }

  for (const exp of asArray<AnyRecord>(DN_KNOWLEDGE.experience)) {
    const title = [asString(exp.role), asString(exp.organization) || asString(exp.company)].filter(Boolean).join(" · ");
    if (!title) continue;
    items.push({
      kind: "experience",
      title,
      summary: [asString(exp.period), (asArray<string>(exp.bullets).length ? asArray<string>(exp.bullets) : asArray<string>(exp.points)).join(" ")].filter(Boolean).join(" "),
      route: "/resume",
      tags: tokenize(`${title} ${(asArray<string>(exp.bullets).length ? asArray<string>(exp.bullets) : asArray<string>(exp.points)).join(" ")}`),
      raw: exp,
    });
  }

  for (const edu of asArray<AnyRecord>(DN_KNOWLEDGE.education)) {
    const title = [asString(edu.school), asString(edu.degree)].filter(Boolean).join(" · ");
    if (!title) continue;
    items.push({
      kind: "education",
      title,
      summary: [asString(edu.period), asString(edu.notes)].filter(Boolean).join(" "),
      route: "/resume",
      tags: tokenize(`${title} ${asString(edu.notes)}`),
      raw: edu,
    });
  }

  for (const page of asArray<AnyRecord>(DN_KNOWLEDGE.navigation)) {
    const title = asString(page.label);
    if (!title) continue;
    items.push({
      kind: "page",
      title,
      summary: `Portfolio page: ${title}`,
      route: asString(page.route) || "/",
      tags: tokenize(title),
      raw: page,
    });
  }

  for (const article of asArray<AnyRecord>(DN_KNOWLEDGE.articles)) {
    const title = asString(article.title);
    if (!title) continue;
    items.push({
      kind: "article",
      title,
      summary: asString(article.summary),
      route: "/posts",
      tags: tokenize(`${title} ${asString(article.summary)}`),
      raw: article,
    });
  }

  for (const lane of asArray<AnyRecord>(DN_KNOWLEDGE.focusLanes)) {
    const title = asString(lane.title);
    if (!title) continue;
    items.push({
      kind: "focus",
      title,
      summary: asString(lane.copy) || asString(lane.body) || asString(lane.summary),
      route: "/projects",
      tags: tokenize(`${title} ${asString(lane.copy)} ${asArray<string>(lane.points).join(" ")}`),
      raw: lane,
    });
  }

  const av = DN_KNOWLEDGE.autonomousVehicleStory as AnyRecord | undefined;
  if (av) {
    items.push({
      kind: "autonomy",
      title: "Autonomous vehicle mission",
      summary: `${asString(av.coreMessage)} ${asArray<string>(av.themes).join(" ")} ${allTextFields(av).join(" ")}`,
      route: asString(av.route) || "/autonomous-vehicles",
      tags: unique(["autonomy", "autonomous", "vehicle", "car", "ecocar", "sensor", "fusion", "lane", ...asArray<string>(av.themes)]),
      raw: av,
    });
  }

  for (const hobby of asArray<AnyRecord>(DN_KNOWLEDGE.hobbiesAndPersonalTexture)) {
    const title = asString(hobby.name);
    if (!title) continue;
    items.push({
      kind: "hobby",
      title,
      summary: asString(hobby.whyItMatters),
      route: "/about",
      tags: tokenize(`${title} ${asString(hobby.whyItMatters)}`),
      raw: hobby,
    });
  }

  return items;
}

export function getRelevantDNContext(query: string, limit = 7) {
  const lower = query.toLowerCase();
  const tokens = tokenize(query);
  const items = buildKnowledgeItems();

  const scored = items
    .map((item) => {
      const searchable = itemText(item).toLowerCase();
      let score = 0;
      for (const token of tokens) {
        if (searchable.includes(token)) score += token.length > 5 ? 3 : 2;
        if (item.title.toLowerCase().includes(token)) score += 5;
        if (item.tags.some((tag) => tag.toLowerCase().includes(token))) score += 4;
      }
      if (fuzzyDanishQuery(query) && ["education", "experience", "achievement", "focus"].includes(item.kind)) score += 7;
      if (contactQuery(lower) && item.route === "/contact") score += 10;
      if (autonomyQuery(lower) && ["autonomy", "project"].includes(item.kind)) score += 7;
      if (/skill|stack|tool|language|framework|tech/.test(lower) && item.kind === "skill") score += 5;
      if (/award|win|achievement|accomplish/.test(lower) && item.kind === "achievement") score += 8;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (scored.length > 0) return scored.map(({ item }) => item);

  return [];
}

function listProjectLine(project: AnyRecord) {
  return `- ${asString(project.title)} (${asString(project.domain)}): ${asString(project.summary)} Role: ${asString(project.role)}. Skills: ${asArray<string>(project.skills).join(", ")}. Outcomes: ${asArray<string>(project.outcomes).join(" ")}. Route: ${asString(project.route)}.`;
}

function listExperienceLine(exp: AnyRecord) {
  const org = asString(exp.organization) || asString(exp.company);
  const bullets = asArray<string>(exp.bullets).length ? asArray<string>(exp.bullets) : asArray<string>(exp.points);
  return `- ${asString(exp.role)} · ${org} (${asString(exp.period)}): ${bullets.join(" ")}`;
}

function listSkillLine(skill: AnyRecord) {
  return `- ${asString(skill.name)} [${asString(skill.category)}]: ${asString(skill.short)} Projects: ${asArray<string>(skill.projects).join(", ")}.`;
}

export function buildFullProfileMarkdown() {
  const identity = DN_KNOWLEDGE.identity as AnyRecord;
  const positioning = DN_KNOWLEDGE.positioning as AnyRecord;
  const sections = [
    "# Danish Nadar full portfolio context",
    `Name: ${asString(identity.name)}`,
    `Title: ${asString(identity.title)}`,
    `Location: ${asString(identity.location)}`,
    `Email: ${asString(identity.email)}`,
    `LinkedIn: ${asString(identity.linkedin)}`,
    `GitHub: ${asString(identity.github)}`,
    "",
    "## Positioning and mission",
    `Headline: ${asString(positioning.headline)}`,
    `Mission: ${asString(positioning.mission)}`,
    `Voice: ${asString(positioning.voice)}`,
    `Audiences: ${asArray<string>(positioning.audiences).join(", ")}`,
    "",
    "## Focus lanes",
    ...asArray<AnyRecord>(DN_KNOWLEDGE.focusLanes).map((lane) => `- ${asString(lane.title)}: ${asString(lane.copy)} ${asArray<string>(lane.points).join(" ")}`),
    "",
    "## Projects",
    ...asArray<AnyRecord>(DN_KNOWLEDGE.projects).map(listProjectLine),
    "",
    "## Experience",
    ...asArray<AnyRecord>(DN_KNOWLEDGE.experience).map(listExperienceLine),
    "",
    "## Education",
    ...asArray<AnyRecord>(DN_KNOWLEDGE.education).map((edu) => `- ${asString(edu.school)}: ${asString(edu.degree)} ${asString(edu.period)} ${asString(edu.notes)}`),
    "",
    "## Achievements",
    ...asArray<AnyRecord>(DN_KNOWLEDGE.achievements).map((item) => `- ${asString(item.title)}: ${asString(item.context)} Route: ${asString(item.route) || "/about"}.`),
    "",
    "## Autonomous vehicle story",
    ...allTextFields(DN_KNOWLEDGE.autonomousVehicleStory).map((text) => `- ${text}`),
    "",
    "## Hobbies and personal texture",
    ...asArray<AnyRecord>(DN_KNOWLEDGE.hobbiesAndPersonalTexture).map((hobby) => `- ${asString(hobby.name)}: ${asString(hobby.whyItMatters)}`),
    "",
    "## Skills and stack",
    ...asArray<AnyRecord>(DN_KNOWLEDGE.skills).map(listSkillLine),
    "",
    "## Routes",
    ...asArray<AnyRecord>(DN_KNOWLEDGE.navigation).map((route) => `- ${asString(route.label)}: ${asString(route.route)}`),
  ];

  return sections.join("\n").replace(/\n{3,}/g, "\n\n");
}

export function compactDNContextForLLM(query: string, history: ConversationTurn[] = []) {
  const relevant = getRelevantDNContext(query, 12);
  const identity = DN_KNOWLEDGE.identity as AnyRecord;
  const positioning = DN_KNOWLEDGE.positioning as AnyRecord;
  return {
    identity,
    positioning,
    conversationHistory: history.slice(-6).map((turn) => ({ role: turn.role, text: compactText(turn.text, 240) })),
    interpretedIntent: {
      asksAboutCapability: capabilityQuery(query),
      asksForBroaderAnswer: followUpWantsBroaderAnswer(query),
      soundsLikeUnclearFeedback: unclearFeedbackQuery(query),
      soundsProfessional: professionalQuestion(query),
      isMetaQuestionAboutThisEngine: dnEngineMetaQuery(query),
      isNegatedIdentityQuestion: negatedIdentityQuery(query, history),
      mentionsDanishDirectly: questionMentionsDanish(query),
      clarifiesDanishReference: clarifiesDanishReference(query),
      shouldResolveHeHimHisToDanish: danishCoreferenceQuery(query, history),
      recentConversationAlreadyAboutDanish: recentDanishAnchor(history),
    },
    directAnswerRules: {
      maxLength: "Usually 1-2 short sentences. For capability/list questions, use at most 5 short bullets.",
      identityQuestion: "If asked who Danish/he/him is, say Danish Nadar is an AI engineer and AI student at Illinois Tech in Chicago focused on applied AI, robotics, autonomous systems, security automation, full-stack product tools, and technical leadership.",
      negatedIdentityQuestion: "If asked who/what Danish is not, do NOT repeat the normal identity answer. Give a short contrast: he is not just one project, one title, or a generic chatbot; his work spans applied AI, robotics, autonomy, security automation, product building, and leadership.",
      engineMetaQuestion: "If asked whether this is a real LLM, answer directly about the DN Response Engine itself instead of matching the word LLM to a skill entry.",
      pronounRule: "In this portfolio chat, he/him/his/himself usually means Danish Nadar unless the visitor explicitly asks about the DN engine. Use conversation history to resolve pronouns and short follow-ups.",
      capabilityQuestion: "If asked what Danish is capable of, answer broadly across capabilities. Do not pick one random project.",
      followUpQuestion: "If the visitor says 'just that one thing' or asks for a list, use the previous Danish-related question from conversationHistory and give a broader list.",
      unclearQuestion: "If the question is too unclear, say it is unclear. If it can reasonably be connected to Danish, answer it in relation to Danish before saying anything is outside scope.",
      outOfScopeQuestion: "For casual or non-Danish questions, briefly answer if safe/simple, then say you mainly answer questions about Danish. Avoid old broad-scope fallback phrasing that says the answer is only broad without actually answering.",
      noGenericRouting: "Do not answer every question by recommending a project. Never dump project-card text. Answer the question first, then optionally suggest a page only when genuinely helpful.",
    },
    relevant: relevant.map((item) => ({
      kind: item.kind,
      title: item.title,
      summary: compactText(item.summary, 420),
      route: item.route,
      tags: item.tags.slice(0, 16),
    })),
    fullProfileDocument: buildFullProfileMarkdown(),
    routes: DN_KNOWLEDGE.navigation,
    guardrails: DN_KNOWLEDGE.llmGuardrails,
  };
}

function suggestedLabel(item: KnowledgeItem) {
  if (item.kind === "page") return item.title;
  if (item.kind === "skill") return "Open Stack Map";
  if (item.kind === "education" || item.kind === "experience") return "Open Resume";
  return `Open ${item.title}`;
}

export function createLocalDNAnswer(query: string, history: ConversationTurn[] = []): DNEngineAnswer {
  const clean = query.trim();
  const identity = DN_KNOWLEDGE.identity as AnyRecord;
  const positioning = DN_KNOWLEDGE.positioning as AnyRecord;
  const q = normalizeForIntent(clean);
  const routeHint = topicRouteForQuery(clean);

  if (!clean) {
    return {
      reply: "Ask me anything. I'll answer normally, and I can connect it back to Danish's projects, skills, resume, or background when it helps.",
      confidence: "medium",
      source: "local",
    };
  }

  if (dnEngineMetaQuery(clean)) {
    return dnEngineMetaAnswer(false);
  }

  if (guideIdentityQuery(clean)) {
    return {
      reply: "I'm the DN Response Engine, a portfolio assistant for Danish Nadar. I can answer normal questions, but I'm most useful for explaining Danish's projects, skills, background, and contact info.",
      confidence: "high",
      source: "local",
    };
  }

  if (/^(hi|hey|hello|yo)\b/.test(q)) {
    return {
      reply: "Hey  -  what would you like to know? I can answer generally, but I'm especially useful for Danish's projects, skills, resume, and AI/robotics work.",
      confidence: "medium",
      source: "local",
    };
  }

  if (/how are you|how is it going|how are u|how r u|what is going on|what s going on/.test(q)) {
    return {
      reply: "I'm just an AI guide, so I don't have real feelings, but I'm running fine. I can help with general questions, and I'm especially useful for questions about Danish.",
      confidence: "medium",
      source: "local",
    };
  }

  if (casualAcknowledgementQuery(clean)) {
    return {
      reply: "Got you. Ask me anything, or ask about Danish's projects, skills, autonomy work, resume, or story.",
      confidence: "low",
      source: "local",
    };
  }

  const aboutDanish = questionMentionsDanish(clean) || danishCoreferenceQuery(clean, history) || clarifiesDanishReference(clean);

  if (negatedIdentityQuery(clean, history)) {
    return {
      reply: negatedIdentityAnswer(),
      suggestedRoute: "/about",
      suggestedLabel: "About",
      confidence: "high",
      source: "local",
    };
  }

  if (asksForDanishIdentity(clean, history) || (aboutDanish && /\b(who|what is|what s|tell me about|actually)\b/.test(q))) {
    return {
      reply: identityAnswer(),
      suggestedRoute: "/about",
      suggestedLabel: "About",
      confidence: "high",
      source: "local",
    };
  }

  if (contactQuery(clean)) {
    return {
      reply: sentenceLimit(`The best way to reach Danish is through the Contact page or his listed email, ${asString(identity.email)}.`),
      suggestedRoute: "/contact",
      suggestedLabel: "Contact",
      confidence: "high",
      source: "local",
    };
  }

  if (capabilityQuery(clean) || (aboutDanish && /\b(can|do|skill|skills|capable|capabilities|stack|good at)\b/.test(q))) {
    const wantsList = followUpWantsBroaderAnswer(clean) || /list|several|all|many|capabilities|strengths|what can/i.test(clean);
    return {
      reply: wantsList ? capabilityListAnswer() : capabilityAnswer(),
      suggestedRoute: "/stack-map",
      suggestedLabel: "Stack Map",
      confidence: "high",
      source: "local",
    };
  }

  if (projectQuery(clean) || /\b(this|one|a)\s+project\b/.test(q)) {
    if (/one|single|example|one of/.test(q)) {
      return {
        reply: "One good example is OBSERV-E, Danish's accessibility robotics ecosystem for helping visually impaired users perceive and navigate environments through robots, drones, and haptic feedback. It shows how he connects AI, robotics, product thinking, and a real user need.",
        suggestedRoute: "/projects/observ-e",
        suggestedLabel: "OBSERV-E",
        confidence: "medium",
        source: "local",
      };
    }
    const wantsList = followUpWantsBroaderAnswer(clean) || /list|examples|all|several|what has/i.test(clean);
    return {
      reply: wantsList ? projectOverviewListAnswer() : projectOverviewAnswer(),
      suggestedRoute: "/projects",
      suggestedLabel: "Projects",
      confidence: "high",
      source: "local",
    };
  }

  if (autonomyQuery(clean)) {
    return {
      reply: "Danish's autonomy work centers on safer transportation: sensor fusion, ADAS-style reasoning, lane detection, reinforcement-learning driving simulations, and connecting AI systems to real road-safety goals.",
      suggestedRoute: "/autonomous-vehicles",
      suggestedLabel: "Autonomy",
      confidence: "high",
      source: "local",
    };
  }

  if (/mission|why|purpose|care/.test(q)) {
    return {
      reply: sentenceLimit(asString(positioning.mission) || "Danish's mission is to build useful AI systems that move beyond demos and help people interact with technology more clearly."),
      suggestedRoute: "/about",
      suggestedLabel: "About",
      confidence: "high",
      source: "local",
    };
  }

  const whoIsOtherPerson = q.match(/\bwho\s+(is|s)\s+([a-z][a-z0-9-]{2,})\b/);
  if (whoIsOtherPerson && !/danish|nadar|he|him/.test(q)) {
    const name = whoIsOtherPerson[2];
    return {
      reply: `I don't know who ${name} is from Danish's portfolio context. If you meant Danish, he's an AI engineer at Illinois Tech focused on applied AI, robotics, autonomy, security automation, and product systems.`,
      suggestedRoute: "/about",
      suggestedLabel: "About",
      confidence: "low",
      source: "local",
    };
  }

  if (/\b2\s*\+\s*2\b|two plus two/.test(q)) {
    return {
      reply: "2 + 2 is 4. I can also help answer questions about Danish's work if that's what you're here for.",
      confidence: "low",
      source: "local",
    };
  }

  return {
    reply: "I can answer that generally, but I don't have enough context to connect it confidently to Danish. Ask it another way or ask about his projects, skills, resume, autonomy work, or contact info.",
    suggestedRoute: routeHint?.route,
    suggestedLabel: routeHint?.label,
    confidence: "low",
    source: "local",
  };
}
