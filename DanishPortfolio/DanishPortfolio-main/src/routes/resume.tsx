import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Award,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  GraduationCap,
  Layers3,
  Network,
  Rocket,
  ShieldCheck,
  Terminal,
  Users,
} from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";
import { institutionLogos, logoShowcase } from "@/data/institutionLogos";
import { MotionPage } from "@/components/MotionPage";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume Path - Danish Nadar" },
      {
        name: "description",
        content:
          "A professional timeline for Danish Nadar across AI engineering, robotics, autonomy, ML projects, security automation, leadership, education, and purposeful product work.",
      },
    ],
  }),
  component: ResumePage,
});

const quickLinks = [
  ["Projects", "/projects"],
  ["Stack Map", "/stack-map"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

const featuredEvidence = [
  {
    eyebrow: "Award-winning robotics",
    title: "OBSERV-E Accessibility Robotics",
    body: "Qualcomm Robotics Track winner connecting computer vision, VLMs, assistive guidance, and human-centered product direction.",
    to: "/projects/observ-e",
  },
  {
    eyebrow: "Real vehicle autonomy",
    title: "EcoCAR Sensor Fusion",
    body: "C++, RTMaps, CAN signals, perception modules, requirements, and validation for autonomous-vehicle systems.",
    to: "/projects/ecocar-sensor-fusion",
  },
  {
    eyebrow: "Applied ML research",
    title: "Lane Detection Study",
    body: "PyTorch experimentation across model backbones, augmentation, robustness, and evidence-based evaluation.",
    to: "/projects/lane-detection-salad",
  },
] as const;

function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

const resumeSections = [
  { id: "resume-experience", label: "AI Engineering Experience" },
  { id: "resume-robotics", label: "Robotics & Autonomy" },
  { id: "resume-ai-ml", label: "Applied AI / ML Projects" },
  { id: "resume-linux", label: "Engineering Workflow" },
  { id: "resume-leadership", label: "Service & Leadership" },
  { id: "resume-education", label: "Education" },
  { id: "resume-courses", label: "Course Foundations" },
  { id: "resume-certifications", label: "Credentials" },
] as const;

type ResumeItem = {
  id: string;
  section: (typeof resumeSections)[number]["id"];
  date: string;
  title: string;
  org: string;
  type: string;
  icon: typeof BriefcaseBusiness;
  summary: string;
  bullets: string[];
  stack: string[];
  links?: [string, string][];
};

const timeline: ResumeItem[] = [
  {
    id: "eloria-ml-engineer",
    section: "resume-experience",
    date: "May 2026 – Present",
    title: "Machine Learning Engineer",
    org: "Grupo Eloria",
    type: "ML Engineering / Product Systems",
    icon: BriefcaseBusiness,
    summary:
      "Current ML engineering role connected to practical software, data, and product-facing AI systems that need to serve real workflows.",
    bullets: [
      "Builds experience at the intersection of applied ML, product systems, cultural platforms, AI-assisted delivery, and practical user workflows.",
      "Connects model thinking to evaluation, data workflows, product requirements, and user-facing system behavior.",
      "Strengthens the portfolio through employer-facing AI engineering experience connected to practical responsibility, not only academic projects.",
    ],
    stack: [
      "Applied ML",
      "Data Science",
      "Product Systems",
      "AI Tools",
      "Machine Learning",
      "Product Review",
    ],
  },
  {
    id: "linux-development-workflow",
    section: "resume-linux",
    date: "Daily Workflow",
    title: "Linux-First AI Engineering Workflow",
    org: "Personal Development Environment",
    type: "Developer Systems / Automation",
    icon: Terminal,
    summary:
      "I use Linux as the foundation for my development workflow across AI products, robotics/autonomy tooling, security automation, and deployment debugging.",
    bullets: [
      "Build and test projects through terminal-first workflows using Bash, Git, Python environments, package managers, local services, and repeatable launch scripts.",
      "Use Linux habits to debug deployments, inspect logs, manage dependencies, automate setup steps, and keep AI product work reproducible instead of fragile.",
      "Connect Linux to robotics and autonomy through ROS-oriented workflows, CAN/SocketCAN concepts, embedded-systems thinking, and command-line validation.",
      "Apply the same open-source tooling discipline across TTP automation, EcoCAR tooling, Grupo Eloria ML work, OfficePro deployments, and portfolio/product engineering.",
    ],
    stack: [
      "Linux",
      "Bash",
      "Git",
      "Docker",
      "Python",
      "CLI Tools",
      "Shell Scripting",
      "Developer Workflow",
    ],
    links: [
      ["Linux workflow article", "/posts/linux-first-ai-engineering-workflow"],
      ["Stack Map", "/stack-map"],
    ],
  },
  {
    id: "founders-frequency",
    section: "resume-experience",
    date: "Nov 2025 – Present",
    title: "Data & AI Software Engineering Intern",
    org: "Founders Frequency",
    type: "Consulting-style Data / AI Engineering",
    icon: Database,
    summary:
      "Production-oriented data and AI software work across client projects, backend features, data pipelines, and application delivery.",
    bullets: [
      "Collaborated on client projects for startups and established companies, helping move software and data solutions toward reliable delivery.",
      "Built and maintained backend systems, data pipelines, and application features based on client requirements.",
      "Assisted with data analysis, automation, early-stage AI/ML experimentation, and debugging across multiple industries and tech stacks.",
    ],
    stack: [
      "Data Pipelines",
      "Backend",
      "AI/ML",
      "SDLC",
      "Test-Driven Development",
      "Functional Requirements",
    ],
  },
  {
    id: "ttp-security-automation",
    section: "resume-experience",
    date: "Aug 2025 – Present",
    title: "Software Automation Engineer",
    org: "Technology Transition Paradigm, LLC",
    type: "Security Automation / Business Tooling",
    icon: ShieldCheck,
    summary:
      "Built a DNS Authentication & Security Screening Tool to automate detection and validation of SPF, DKIM, and DMARC issues.",
    bullets: [
      "Automated DNS record lookups, parsing, structured JSON/CSV output, and misconfiguration reporting for email-security analysis.",
      "Compared scanner output against EasyDMARC-style verification platforms to improve accuracy and reliability.",
      "Designed the tool for scalability and modularity so it can support broader MSP security workflows and outreach automation.",
      "Connected security findings to practical workflows that help organizations reduce phishing and spoofing risk.",
    ],
    stack: [
      "Python",
      "Security Automation",
      "DNS",
      "SPF/DKIM/DMARC",
      "CSV/JSON",
      "Process Automation",
      "Microsoft Graph API",
    ],
    links: [
      ["TTP automation", "/projects/ttp-outreach-automation"],
      ["DNS scanner", "/projects/dns-security-scanner"],
    ],
  },
  {
    id: "officepro-ai-internship",
    section: "resume-experience",
    date: "May 2025 – Aug 2025",
    title: "AI Software Development Intern",
    org: "OfficePro, Inc.",
    type: "AI / Cloud / Full-Stack Product",
    icon: Rocket,
    summary:
      "AI development, automation, full-stack engineering, IT operations, and product-support experience grounded in useful internal and customer-facing workflows.",
    bullets: [
      "Designed and deployed an AI-instructor prototype using Azure AI Foundry, Cognitive Services, Speech Services, and serverless Azure Functions.",
      "Scaled a 50+ computer rental fleet by over 50% with Python and PowerShell automation for deployment/setup tasks.",
      "Contributed to aiheadshotmasters.com by debugging production workflows, Supabase SQL behavior, Vercel CI/CD, Stripe integration, and support-facing product issues.",
      "Collaborated with marketing on WordPress/Elementor performance, accessibility, SEO, navigation, documentation, and reusable widgets.",
    ],
    stack: [
      "Azure AI Foundry",
      "Azure Functions",
      "Cognitive Services",
      "Supabase",
      "Vercel",
      "Stripe",
      "Selenium",
      "AI Tools",
    ],
    links: [["AI Headshot Platform", "/projects/ai-headshot-platform"]],
  },
  {
    id: "ecocar-autonomy",
    section: "resume-robotics",
    date: "Nov 2024 – May 2026",
    title: "Sensor Fusion / DMS / Lateral Controls Engineer",
    org: "EcoCAR EV Challenge",
    type: "Autonomous Vehicle Software",
    icon: Network,
    summary:
      "Autonomy work spanning sensor fusion, driver monitoring, lane centering, vehicle signals, and validation-oriented engineering.",
    bullets: [
      "Authored functional requirements and test cases, then executed validation tests for coverage and compliance.",
      "Worked with RTMaps and C++ to implement/refine sensor-fusion pipelines integrating LiDAR, radar, camera, and vehicle data.",
      "Designed and implemented a C++ lead-vehicle detection module for perception reliability in dynamic traffic environments.",
      "Built a C++ finite-state machine for Driver Monitoring System validation using CAN signals, integrated into dSPACE AUTERA workflows.",
    ],
    stack: [
      "C++",
      "RTMaps",
      "CAN bus",
      "ADAS",
      "DMS",
      "Sensor Fusion",
      "Systems Integration",
      "Requirements Engineering",
    ],
    links: [["EcoCAR case study", "/projects/ecocar-sensor-fusion"]],
  },
  {
    id: "illinois-tech-robotics",
    section: "resume-leadership",
    date: "Dec 2024 – Present",
    title: "Treasurer / Instructor / Robotics Leader",
    org: "Illinois Tech Robotics",
    type: "Leadership / Technical Training / Operations",
    icon: Users,
    summary:
      "Operational and technical leadership focused on sustainable club systems, funding, workshops, documentation, and AI robotics projects.",
    bullets: [
      "Created and managed the annual budget, securing 100% funding approval and building treasury pipelines to track expenditures.",
      "Designed Microsoft Teams architecture and documentation systems to improve collaboration, onboarding, and knowledge sharing.",
      "Led and organized workshops on AI/ML, Linux, Python, and systems programming for member development.",
      "Spearheaded design and implementation of the club's AI Robotic Assistant (AIRA), leading software direction and team contributions.",
    ],
    stack: [
      "Leadership",
      "Budget Management",
      "Documentation",
      "Python",
      "Linux",
      "TensorFlow",
      "PyTorch",
      "Robotics",
    ],
  },
  {
    id: "leadership-academy-tech-lead",
    section: "resume-leadership",
    date: "Aug 2025 – May 2026",
    title: "Tech Committee Lead — Leadership Academy",
    org: "Illinois Institute of Technology",
    type: "Team Leadership / AI Platform Architecture",
    icon: Layers3,
    summary:
      "Led a cross-disciplinary engineering team building technologies for the Leadership Academy, including an AI-powered Leadership Avatar platform.",
    bullets: [
      "Led a cross-disciplinary team using agile methods to coordinate sprints, manage tasks, and ensure timely deliverables.",
      "Designed, researched, and deployed an AI-powered Leadership Avatar platform for simulated leadership and interpersonal role-play experiences.",
      "Used open-source solutions to keep the system cost-effective, scalable, and sustainable for the Leadership Academy.",
      "Translated organizational leadership needs into technical architecture, project requirements, engagement metrics, and actionable execution plans.",
    ],
    stack: [
      "Team Leadership",
      "AI Platform",
      "Agile",
      "Architecture",
      "Stakeholder Engagement",
      "Data-Driven Planning",
    ],
    links: [["AILA Avatar", "/projects/aila-avatar"]],
  },
  {
    id: "ml-iit-president",
    section: "resume-leadership",
    date: "Apr 2026 – Present",
    title: "President",
    org: "ML@IIT",
    type: "AI/ML Club Leadership",
    icon: Cpu,
    summary:
      "Campus ML leadership role focused on building learning pipelines, practical AI project culture, and cross-organization collaboration.",
    bullets: [
      "Shapes an AI/ML learning community around practical projects, applied models, and professional development.",
      "Connects ML Club work with robotics, game development, AI assistants, and autonomy-focused communities.",
      "Provides leadership record for building teams, curricula, and applied technical momentum.",
    ],
    stack: ["Machine Learning", "Applied ML", "Leadership", "Workshops", "Technical Community"],
  },
  {
    id: "career-services-volunteer",
    section: "resume-leadership",
    date: "Sep 2025 – Oct 2025",
    title: "Operations Volunteer — Career Services",
    org: "Illinois Institute of Technology",
    type: "Professional Development / Coaching",
    icon: Users,
    summary:
      "Supported students with resumes, LinkedIn branding, networking, interview prep, and career strategy while building scalable workshop resources.",
    bullets: [
      "Provided one-on-one guidance on resume optimization, LinkedIn branding, and translating technical/non-technical work into professional stories.",
      "Designed and led professional development workshops reaching 30+ attendees weekly across student organizations.",
      "Collaborated with campus organizations to tailor professional development for STEM, data science, and AI-focused students.",
    ],
    stack: [
      "Professional Communication",
      "Stakeholder Engagement",
      "Workshop Design",
      "Career Strategy",
    ],
  },

  {
    id: "a-little-tech-for-you",
    section: "resume-ai-ml",
    date: "2026 – Present",
    title: "A Little Tech For You",
    org: "In-progress AI Product",
    type: "Accessible AI / TTS / Product Strategy",
    icon: Rocket,
    summary:
      "An accessible AI guide for older adults that combines simple technology answers, short tutorials, voice narration, and optional consulting paths.",
    bullets: [
      "Defined the product around baby boomers and families who need patient help with phones, AI, Bluetooth, smart TVs, car technology, online safety, and everyday tech questions.",
      "Designed a content path across AI chat, short tutorial scripts, voice-generated narration, consulting, and membership ideas.",
      "Planned a Python/FastAPI voice service using Hugging Face TTS models including ResembleAI/chatterbox and coqui/XTTS-v2.",
    ],
    stack: [
      "Claude",
      "ChatGPT",
      "Hugging Face",
      "Chatterbox",
      "XTTS-v2",
      "FastAPI",
      "AI Tools",
      "Accessibility",
    ],
    links: [["A Little Tech case study", "/projects/a-little-tech-for-you"]],
  },
  {
    id: "rl-driving-sim",
    section: "resume-ai-ml",
    date: "2026",
    title: "Reinforcement Learning Autonomous Driving Simulator",
    org: "CS484 / Personal Portfolio",
    type: "ML / Simulation / Autonomy Project",
    icon: Cpu,
    summary:
      "Built a simulated multi-lane driving environment using reinforcement learning with configurable sensor suites, evaluation metrics, and autonomous-driving behaviors.",
    bullets: [
      "Implemented a lane-keeping/no-crash RL driving simulation with PPO using Stable-Baselines3.",
      "Compared camera-only, LiDAR-only, camera+LiDAR, and full-stack sensor suite configurations.",
      "Tracked reward, collision rate, off-road rate, task completion, lane deviation, and distance traveled across evaluations.",
    ],
    stack: [
      "Python",
      "PPO",
      "Reinforcement Learning",
      "Pygame",
      "Sensor Simulation",
      "Model Evaluation",
    ],
    links: [["RL driving case study", "/projects/rl-autonomous-driving"]],
  },
  {
    id: "lane-detection-study",
    section: "resume-ai-ml",
    date: "2026",
    title: "Monocular Lane Detection Improvement Study",
    org: "CS584 / ML Research Adaptation",
    type: "Machine Learning / Computer Vision",
    icon: Code2,
    summary:
      "Adapted ONCE-3DLanes ideas into a feasible lane-regression pipeline and studied backbone/augmentation tradeoffs for lane detection robustness.",
    bullets: [
      "Built a simplified lane-regression pipeline with a ResNet-style baseline and PyTorch workflow.",
      "Explored robustness through augmentation: brightness/contrast, blur, noise, random shadows, shifts, and crops.",
      "Communicated performance through MSE, MAE, lane accuracy, and distance-error-style metrics.",
    ],
    stack: ["PyTorch", "CNNs", "Computer Vision", "Data Augmentation", "Matplotlib", "NumPy"],
    links: [["Lane detection case study", "/projects/lane-detection-salad"]],
  },
  {
    id: "observ-e-starkhacks",
    section: "resume-robotics",
    date: "2026",
    title: "Qualcomm Robotics Track Winner - OBSERV-E",
    org: "StarkHacks 2026 · Qualcomm Robotics Track Winner",
    type: "Hackathon / Robotics / Product Build",
    icon: Award,
    summary:
      "Helped build and pitch OBSERV-E, an accessibility robotics ecosystem combining perception, scene understanding, and assistive guidance for visually impaired users, earning first place in the Qualcomm Robotics Track at StarkHacks.",
    bullets: [
      "Connected computer vision, user-following robotics, VLM scene descriptions, hazard detection, and TTS guidance into a coherent accessibility product story.",
      "Contributed to technical architecture, pitch direction, roadmap framing, and future concepts including GRVI, DRVI, and HRVI.",
      "Practiced product judgment, team execution, and accessible robotics storytelling under hackathon pressure.",
    ],
    stack: ["Computer Vision", "OpenCV", "YOLO", "VLMs", "Robotics", "TTS", "Product Pitch"],
    links: [["OBSERV-E case study", "/projects/observ-e"]],
  },
  {
    id: "p33-java-engineer",
    section: "resume-experience",
    date: "Aug 2023 – Dec 2023",
    title: "Java Software Engineer",
    org: "P33 Chicago",
    type: "Java / Agile / Financial Literacy Game",
    icon: Code2,
    summary:
      "Collaborated with peers and industry mentors to build a Java text-adventure game inspired by The Oregon Trail for financial literacy education.",
    bullets: [
      "Built core mechanics with object-oriented programming, data structures, and command-line interaction.",
      "Applied agile practices, sprint collaboration, and industry mentor feedback during professional meetings/check-ins.",
      "Developed narrative decision-making to simulate real-world financial choices for learners.",
    ],
    stack: ["Java", "OOP", "Data Structures", "Agile", "Teamwork", "Problem Solving"],
  },
  {
    id: "ptech-steering",
    section: "resume-leadership",
    date: "Oct 2021 – Jun 2023",
    title: "Steering Committee Member",
    org: "P-TECH",
    type: "Program Leadership / Outreach",
    icon: Users,
    summary:
      "Early cohort leadership shaping events, digital resources, technical infrastructure, and student engagement for the P-TECH program.",
    bullets: [
      "Co-founded and facilitated the first P-TECH Showcase, supporting logistics, presentations, and participant engagement.",
      "Collaborated on networking, learning, and professional growth opportunities for students.",
      "Managed digital resources and technical infrastructure for events and committees.",
    ],
    stack: [
      "Leadership",
      "Program Development",
      "Event Management",
      "Technical Support",
      "Professional Communication",
    ],
  },
];

const resumeItemPriority = new Map<string, number>(
  [
    "eloria-ml-engineer",
    "founders-frequency",
    "officepro-ai-internship",
    "ttp-security-automation",
    "p33-java-engineer",
    "ecocar-autonomy",
    "observ-e-starkhacks",
    "lane-detection-study",
    "rl-driving-sim",
    "a-little-tech-for-you",
    "linux-development-workflow",
    "ml-iit-president",
    "illinois-tech-robotics",
    "leadership-academy-tech-lead",
    "career-services-volunteer",
    "ptech-steering",
  ].map((id, index) => [id, index]),
);

const education = [
  {
    school: "Illinois Institute of Technology",
    detail:
      "B.S. Artificial Intelligence; M.A.S. in Artificial Intelligence path; Minor in Data Science",
    dates: "Aug 2023 – May 2027",
    stack: ["AI", "Data Science", "Robotics", "Machine Learning", "Autonomy"],
  },
  {
    school: "Montgomery College",
    detail: "Cloud Computing and Network Technology / Computer Science foundation",
    dates: "Oct 2020 – Apr 2023",
    stack: ["Cloud Computing", "Networking", "Linux", "Systems", "Scripting"],
  },
  {
    school: "P-TECH / Clarksburg High School",
    detail:
      "High School Diploma with early technology, leadership, and steering committee experience",
    dates: "Sep 2019 – Jun 2023",
    stack: ["Leadership", "Program Development", "Technical Resources"],
  },
];

const certifications = [
  {
    name: "Data Catalyst — Illinois Tech",
    issuer: "Illinois Tech",
    href: undefined,
  },
  {
    name: "Python and Data Certification",
    issuer: "Global Career Accelerator",
    href: "https://www.credential.net/05178c0d-9635-4f50-b28e-a10ef849d5a1#acc.Tfsr6Ai2",
  },
  {
    name: "Intercultural Skills Certification",
    issuer: "Global Career Accelerator",
    href: "https://www.credential.net/03b9c634-567a-412b-a2dc-948aac21f0b2#acc.lfj2cPW7",
  },
  {
    name: "AI Professional Skills Certification",
    issuer: "Global Career Accelerator",
    href: "https://www.credential.net/906e8da6-7665-43b1-b628-1ccfb956179f#acc.j1Tk2Wld",
  },
  {
    name: "Querying Data Certification",
    issuer: "Global Career Accelerator",
    href: "https://www.credential.net/fc2dbcab-c3d7-4463-b1cb-cfffbec0a052#acc.OFuVey5N",
  },
  {
    name: "TestOut Network Pro Certification",
    issuer: "TestOut / CertMaster",
    href: "https://certification.testout.com/verifycert?certificateId=6-1C6-MQH5J",
  },
  {
    name: "TestOut PC Pro Certification",
    issuer: "TestOut / CertMaster",
    href: "https://certification.testout.com/verifycert?certificateId=6-1C6-WTCPL",
  },
];

const relevantCourses = [
  {
    area: "Artificial Intelligence & Machine Learning",
    courses: [
      "CS 480 Introduction to Artificial Intelligence",
      "CS 481 Intelligent Text Analysis / Knowledge Management",
      "CS 484 Introduction to Machine Learning",
      "CS 584 Machine Learning",
      "CS 577 Deep Learning",
      "CS 585 Natural Language Processing",
    ],
  },
  {
    area: "Software, Data, and Algorithms",
    courses: [
      "CS 201 Accelerated Introduction to Computer Science",
      "CS 330 Discrete Structures",
      "CS 331 Data Structures and Algorithms",
      "CS 340 Programming Paradigms / Patterns",
      "CS 425 Database Organization",
      "CS 430 Introduction to Algorithms",
    ],
  },
  {
    area: "Security, Privacy, and Responsible Systems",
    courses: [
      "CS 458 Introduction to Information Security",
      "CS 528 Data Privacy and Security",
      "DS 261 Ethics and Privacy in Data Science",
      "CS 485 Computers and Society",
      "CS 579 Online Social Network Analysis",
    ],
  },
  {
    area: "Data Science, Math, and Engineering Foundation",
    courses: [
      "DS 151 Introduction to Data Science",
      "DS 451 Data Science Life Cycle",
      "MATH 151 Calculus I",
      "MATH 152 Calculus II",
      "MATH 251 Multivariate & Vector Calculus",
      "MATH 332 Linear Algebra",
      "MATH 474 Probability and Statistics",
      "PHYS 123 Mechanics",
      "PHYS 221 Electricity & Magnetism",
    ],
  },
  {
    area: "Autonomy, Product, and Systems Practice",
    courses: [
      "IPRO 497 Electric Vehicle Design",
      "CS 497 Special Projects",
      "CSP 554 Big Data Technologies",
      "COM 421 Technical Communication",
      "SOC 362 Technology and Social Change",
    ],
  },
];

const skillGroups = [
  [
    "AI / Machine Learning",
    [
      "Applied ML",
      "Machine Learning",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "CNNs",
      "Deep Learning",
      "VLMs",
      "LLMs",
      "Reinforcement Learning",
      "Model Evaluation",
    ],
  ],
  [
    "Robotics / Autonomy",
    [
      "RTMaps",
      "ROS2",
      "Simulink",
      "CAN bus",
      "ADAS",
      "DMS",
      "Sensor Fusion",
      "Computer Vision",
      "OpenCV",
      "Vehicle Dynamics",
    ],
  ],
  [
    "Cloud / AI Infrastructure",
    [
      "AWS",
      "Azure",
      "Azure AI Foundry",
      "Azure Functions",
      "Supabase",
      "PostgreSQL",
      "Vercel",
      "Microsoft Graph API",
      "FastAPI",
      "Streamlit",
    ],
  ],
  [
    "AI Tools / Agents",
    [
      "Claude",
      "ChatGPT",
      "GitHub Copilot",
      "Microsoft Copilot",
      "Copilot Studio",
      "Hugging Face",
      "Chatterbox",
      "XTTS-v2",
      "Prompt Engineering",
      "Agentic Systems",
    ],
  ],
  [
    "Linux / Developer Workflow",
    [
      "Linux",
      "Bash",
      "Git",
      "Docker",
      "CLI Tools",
      "Shell Scripting",
      "Python Environments",
      "Deployment Debugging",
    ],
  ],
  [
    "Security / Automation",
    [
      "DNS",
      "SPF/DKIM/DMARC",
      "Security Automation",
      "Process Automation",
      "Scripting",
      "Email Security",
      "Testing",
    ],
  ],
  [
    "Leadership",
    [
      "Agile",
      "Budget Management",
      "Professional Communication",
      "Stakeholder Engagement",
      "Documentation",
      "Team Leadership",
    ],
  ],
];

function ResumePage() {
  return (
    <MotionPage
      mood="leadership"
      className="mx-auto max-w-[100rem] px-5 lg:px-10 py-14 md:py-16 resume-page"
    >
      <motion.section
        id="resume-top"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="rounded-[2rem] border border-border/60 bg-gradient-to-br from-blue-500/22 via-slate-950/72 to-[color-mix(in_oklab,var(--neon-red)_20%,transparent)] p-8 md:p-12 shadow-elevated premium-border animated-gradient-surface scroll-mt-28"
      >
        <div className="max-w-6xl">
          <div className="case-badge bg-gradient-rb text-background">AI engineering resume</div>
          <h1 className="mt-5 text-4xl md:text-7xl font-display font-bold leading-tight animated-title-glow">
            AI Engineer Building Models Into Real Systems
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-foreground/85 max-w-5xl">
            Applied machine learning, autonomous systems, computer vision, AI products, and
            production automation backed by real roles, technical case studies, and team leadership.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {quickLinks.map(([label, href]) => (
              <Link
                key={href}
                to={href}
                className="brand-button glass hover:glow-blue transition hover:-translate-y-0.5"
              >
                {label}
              </Link>
            ))}
            <SocialLinks variant="buttons" />
          </div>
        </div>
      </motion.section>

      <nav
        className="resume-jump-nav mt-8 glass premium-border rounded-[1.65rem] p-4"
        aria-label="Resume same-page navigation"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="font-tech text-xs uppercase tracking-[0.16em] text-accent">
            Trace the path
          </div>
          <div className="flex flex-wrap gap-2">
            {resumeSections.map((section) => (
              <button
                key={section.id}
                onClick={() => jumpTo(section.id)}
                className="stack-jump-chip stack-jump-chip-primary"
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="mt-10 grid md:grid-cols-4 gap-5">
        {[
          ["15+", "Project chapters across AI, robotics, and product"],
          ["EcoCAR", "DOE national autonomy competition, Year 2"],
          ["1st", "StarkHacks Qualcomm Robotics Track"],
          ["5+", "Engineering roles and internships"],
        ].map(([value, label]) => (
          <div key={label} className="glass rounded-2xl p-6 premium-border hover-lift ambient-card">
            <div className="text-4xl font-display font-bold text-gradient-rb">{value}</div>
            <div className="mt-2 text-sm text-muted-foreground">{label}</div>
          </div>
        ))}
      </section>

      <section className="mt-12 glass premium-border rounded-[2rem] p-6 md:p-8 resume-positioning-card ambient-card">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
              Professional direction
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">
              AI engineer connecting models, systems, leadership, and service.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Danish's work is strongest when connecting research ideas to working systems: ML
              models to evaluations, robotics concepts to user-centered tools, vehicle signals to
              control logic, cloud services to product workflows, and backend automation to business
              outcomes that reduce friction for people.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 xl:min-w-[42rem]">
            {skillGroups.map(([group, skills]) => (
              <article
                key={group as string}
                className="rounded-2xl border border-border/70 bg-background/35 p-4"
              >
                <div className="text-xs uppercase tracking-widest text-accent font-tech">
                  {group}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(skills as string[]).map((skill) => (
                    <Link
                      key={skill}
                      to="/stack-map"
                      className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-accent hover:text-accent transition"
                    >
                      {skill}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="featured-evidence-title">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
              Selected engineering evidence
            </div>
            <h2
              id="featured-evidence-title"
              className="mt-2 text-3xl md:text-4xl font-display font-bold"
            >
              The three case studies to scan first
            </h2>
          </div>
          <Link to="/projects" className="text-sm text-accent hover:underline">
            View all projects
          </Link>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {featuredEvidence.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group glass premium-border ambient-card rounded-3xl p-6 hover-lift"
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-tech">
                {item.eyebrow}
              </div>
              <h3 className="mt-3 text-2xl font-display font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Open case study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 space-y-12">
        {resumeSections.slice(0, 5).map((section) => {
          const items = timeline
            .filter((item) => item.section === section.id)
            .sort(
              (a, b) =>
                (resumeItemPriority.get(a.id) ?? 999) - (resumeItemPriority.get(b.id) ?? 999),
            );
          if (!items.length) return null;
          return (
            <section key={section.id} id={section.id} className="scroll-mt-36">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
                    Path chapter
                  </div>
                  <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">
                    {section.label}
                  </h2>
                </div>
                <button onClick={() => jumpTo("resume-top")} className="stack-back-button">
                  <ArrowUp className="h-3.5 w-3.5" /> Back to top
                </button>
              </div>
              <div className="space-y-6 resume-timeline-rail pl-10 md:pl-16">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.45 }}
                      className="glass premium-border ambient-card rounded-3xl border border-border/60 p-6 md:p-8 hover-lift"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-5">
                        <div className="shrink-0 h-14 w-14 rounded-2xl bg-gradient-rb text-background grid place-items-center shadow-lg shadow-red-950/20">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="case-badge glass">{item.date}</span>
                            <span className="case-badge border border-border/60 bg-background/30 text-accent">
                              {item.type}
                            </span>
                          </div>
                          <h3 className="mt-4 text-2xl md:text-3xl font-display font-bold leading-tight">
                            {item.title}
                          </h3>
                          <div className="mt-1 text-sm font-tech uppercase tracking-[0.12em] text-accent/80">
                            {item.org}
                          </div>
                          <p className="mt-3 text-foreground/85 leading-relaxed">{item.summary}</p>
                          <ul className="mt-5 space-y-2.5 readable-panel text-muted-foreground">
                            {item.bullets.map((bullet) => (
                              <li key={bullet} className="flex gap-3">
                                <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {item.stack.map((skill) => (
                              <Link
                                key={skill}
                                to="/stack-map"
                                className="rounded-md border border-border/70 px-2.5 py-1 text-[11px] uppercase tracking-wide text-muted-foreground hover:text-accent hover:border-accent"
                              >
                                {skill}
                              </Link>
                            ))}
                          </div>
                          {item.links && (
                            <div className="mt-5 flex flex-wrap gap-3">
                              {item.links.map(([label, href]) => (
                                <Link
                                  key={href}
                                  to={href}
                                  className="brand-button glass text-sm inline-flex items-center gap-2 hover:glow-blue transition"
                                >
                                  {label}
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section id="resume-education" className="scroll-mt-36">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
                Path chapter
              </div>
              <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Education</h2>
            </div>
            <button onClick={() => jumpTo("resume-top")} className="stack-back-button">
              <ArrowUp className="h-3.5 w-3.5" /> Back to top
            </button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {education.map((edu) => {
              const logo = institutionLogos[edu.school as keyof typeof institutionLogos];
              return (
                <article
                  key={edu.school}
                  className="glass premium-border ambient-card rounded-3xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 rounded-full bg-white border border-white/30 shadow-md grid place-items-center overflow-hidden">
                      {logo?.src ? (
                        <img
                          src={logo.src}
                          alt={`${edu.school} logo`}
                          className="h-9 w-9 object-contain"
                        />
                      ) : (
                        <GraduationCap className="h-6 w-6 text-slate-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold">{edu.school}</h3>
                      {logo?.url && (
                        <a
                          href={logo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-accent hover:underline"
                        >
                          Official site
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-7">{edu.detail}</p>
                  <div className="mt-3 case-badge glass">{edu.dates}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {edu.stack.map((skill) => (
                      <Link
                        key={skill}
                        to="/stack-map"
                        className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground hover:text-accent hover:border-accent"
                      >
                        {skill}
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-8 glass premium-border rounded-3xl p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
              Public logos & references
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {logoShowcase.map((logo) => (
                <a
                  key={logo.name}
                  href={logo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-border/70 bg-background/35 p-4 hover:border-accent/70 transition flex items-center gap-3"
                >
                  <span className="h-10 w-10 rounded-xl bg-background/50 grid place-items-center overflow-hidden">
                    {logo.src ? (
                      <img
                        src={logo.src}
                        alt={`${logo.name} logo`}
                        className="h-6 w-6 object-contain"
                      />
                    ) : (
                      <span className="text-xs text-accent">{logo.mark}</span>
                    )}
                  </span>
                  <span className="text-xs font-tech uppercase tracking-[0.1em] text-muted-foreground">
                    {logo.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="resume-courses" className="scroll-mt-36">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
                Path chapter
              </div>
              <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">
                Course foundations
              </h2>
            </div>
            <button onClick={() => jumpTo("resume-top")} className="stack-back-button">
              <ArrowUp className="h-3.5 w-3.5" /> Back to top
            </button>
          </div>
          <p className="max-w-5xl text-muted-foreground leading-7">
            Selected coursework that supports my AI engineering, autonomous systems, data science,
            security, and product-delivery work. This section shows the academic foundation behind
            the rebuilding and applied project work.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {relevantCourses.map((group) => (
              <article
                key={group.area}
                className="glass premium-border ambient-card rounded-3xl p-5"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-accent font-tech">
                  {group.area}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.courses.map((course) => (
                    <span
                      key={course}
                      className="rounded-full border border-border/70 bg-background/35 px-3 py-1.5 text-xs leading-5 text-muted-foreground"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="resume-certifications" className="scroll-mt-36">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-accent">
                Path chapter
              </div>
              <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">
                Credentials and recognition
              </h2>
            </div>
            <button onClick={() => jumpTo("resume-top")} className="stack-back-button">
              <ArrowUp className="h-3.5 w-3.5" /> Back to top
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {certifications.map((cert) => (
              <article
                key={cert.name}
                className="glass premium-border rounded-2xl p-5 flex gap-3 items-start hover-lift"
              >
                <Award className="h-5 w-5 text-accent shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-foreground">{cert.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {cert.issuer}
                  </div>
                  {cert.href ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-xs font-tech uppercase tracking-[0.12em] text-accent hover:underline"
                    >
                      Verify credential <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
            <article className="glass premium-border rounded-2xl p-5 flex gap-3 items-start hover-lift">
              <Award className="h-5 w-5 text-accent shrink-0" />
              <div>
                <div className="text-sm leading-6 text-muted-foreground">
                  <strong className="text-foreground">Leadership Academy Scholarship</strong> — M.A.
                  &amp; Lila Self Leadership Academy Scholar
                </div>
                <a
                  href="https://www.iit.edu/leadership-studies/ma-and-lila-self-leadership-academy/scholars/current-scholars#:~:text=Danish%20Nadar"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-tech uppercase tracking-[0.12em] text-accent hover:underline"
                >
                  Verify on current scholars page <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          </div>
        </section>
      </section>

      <section className="mt-16 glass premium-border rounded-3xl p-8 md:p-10">
        <div className="case-badge bg-gradient-rb text-background">Professional through-line</div>
        <h2 className="mt-5 text-3xl md:text-5xl font-display font-bold">
          The work keeps returning to{" "}
          <span className="text-gradient-rb">
            systems thinking, AI integration, and clear communication.
          </span>
        </h2>
        <div className="mt-6 grid md:grid-cols-3 gap-5 readable-panel text-muted-foreground">
          <p>
            <strong className="text-gradient-rb font-display">Systems Builder:</strong> turns ideas
            into structured AI, robotics, autonomy, web, and automation systems that can be built,
            tested, and explained, using Linux when it meaningfully improves the workflow.
          </p>
          <p>
            <strong className="text-gradient-rb font-display">AI Integrator:</strong> connects
            models, APIs, sensors, databases, cloud tools, and deployment constraints into practical
            workflows that serve a clear purpose.
          </p>
          <p>
            <strong className="text-gradient-rb font-display">Technical Communicator:</strong>{" "}
            translates complex engineering work into case studies, workshops, posts, presentations,
            and clear context for people who need to understand why the work matters.
          </p>
        </div>
      </section>
    </MotionPage>
  );
}
