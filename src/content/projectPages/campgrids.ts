import type { ProjectPageContent } from "./types";

export const project: ProjectPageContent = {
  slug: "campgrids",
  title: "CampGrids",
  subtitle:
    "A curriculum workbook turned into a live platform for Museum of Science and Industry Fab Lab camps.",
  heroStatement:
    "CampGrids turns a hyperlink-heavy Excel curriculum into a live site with student and staff accounts, rosters, progress tracking and partner pages, secured with Postgres row-level security.",
  pageTheme: {
    eyebrow: "Full-Stack Platform",
    gradient: "from-rose-500/20 via-slate-900/30 to-sky-700/20",
    icon: "CaseStudy",
  },
  quickFacts: [
    { label: "Role", value: "Interface, workbook sync and account layer" },
    { label: "Status", value: "Live site · open source" },
    { label: "Origin", value: "Built from an MSI intern's idea" },
    { label: "AWS target", value: "Documented, not deployed" },
  ],
  problem:
    "Camp curriculum lived in an Excel workbook full of hyperlinks. Staff needed rosters and progress tracking, and students needed a simple way in, without exposing one person's data to another.",
  motivation:
    "Keep the workbook as the source of truth staff already used, and put a secure, role-aware platform on top of it.",
  myRole: [
    "Built the interface and the workbook-to-site sync.",
    "Built the Supabase account layer: row-level security, admin-only provisioning and staff one-time codes.",
    "Documented an AWS deployment target in CloudFormation.",
  ],
  whatIBuilt: [
    "generateCampgrids.py: generates the site from the workbook and upserts content keyed on (belt, column).",
    "Student and staff sign-in, with emailed one-time codes for staff.",
    "Postgres RPCs, admin-only Edge Functions for provisioning, and Realtime navigation.",
    "Rosters, progress tracking and partner pages on the secured data.",
  ],
  architecture: [
    {
      title: "Content pipeline",
      body: "Excel workbook → generator script → static site on Vercel.",
    },
    {
      title: "Accounts",
      body: "Supabase Auth with students and staff; Postgres RLS defines access.",
    },
    { title: "Administration", body: "Provisioning runs only in admin-gated Edge Functions." },
  ],
  stackMap: [
    { name: "JavaScript", category: "Language", usedFor: "Site interface." },
    {
      name: "Supabase",
      category: "Backend",
      usedFor: "Auth, Postgres, Edge Functions and Realtime.",
    },
    { name: "Postgres RLS", category: "Security", usedFor: "Role-based access at the row level." },
    { name: "Edge Functions", category: "Backend", usedFor: "Admin-only account provisioning." },
    { name: "Python", category: "Language", usedFor: "Workbook-to-site generator." },
    {
      name: "AWS CloudFormation",
      category: "Infrastructure",
      usedFor: "Documented AWS target (not deployed).",
    },
  ],
  implementationDetails: [
    {
      title: "Fail-closed data sync",
      body: "Upserts keyed on (belt, column) keep the workbook and site consistent.",
    },
    {
      title: "Least privilege",
      body: "Clients never provision accounts; only admin-gated functions can.",
    },
    { title: "Staff OTP", body: "Staff sign in with emailed one-time codes." },
  ],
  challengeSolutions: [
    {
      title: "Keeping staff in Excel",
      body: "The generator respects the workbook as the source of truth.",
    },
    {
      title: "Multi-role privacy",
      body: "RLS policies, not front-end checks, decide what each role can see.",
    },
  ],
  outcomes: [
    { title: "Live platform", body: "Deployed on Vercel with Supabase." },
    {
      title: "Path to AWS",
      body: "A CloudFormation-defined target (Cognito, RDS, EC2 API, S3, Redshift for reporting) is documented.",
    },
  ],
  metrics: [],
  gallery: [],
  relatedProjectSlugs: ["compute-collaborative", "confusion-classifier"],
  relatedPostSlugs: ["debugging-vercel-supabase-deploys"],
  impactTakeaway:
    "CampGrids shows production instincts beyond ML: row-level security, admin-gated functions, a fail-closed sync and infrastructure as code.",
  interviewTalkingPoints: [
    "Why RLS is the right boundary for a multi-role education platform.",
    "Designing a sync that respects a non-technical team's existing workflow.",
  ],
  resumeBullets: [
    "Built CampGrids for MSI Fab Lab camps: workbook-to-site sync, Supabase auth with staff OTP, Postgres RLS and admin-only Edge Functions; documented an AWS CloudFormation target.",
  ],
  futureWork: ["Deploy the documented AWS target if usage outgrows the Supabase tier."],
  links: [{ label: "Live site", href: "https://camp-grids.vercel.app", type: "demo" }],
};
