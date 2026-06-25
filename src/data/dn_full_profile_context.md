# Danish Nadar Full Portfolio Knowledge Base

This file is the long-form source document for the DN Response Engine. It is intentionally detailed so the Groq-powered guide can answer questions about Danish without falling back to generic or repeated responses.

## Identity
- Name: Danish Nadar
- Title: AI Engineer
- Location: Chicago · Illinois Tech
- Email: danish.t.nadar@gmail.com
- LinkedIn: https://www.linkedin.com/in/danish-nadar
- GitHub: https://github.com/DanishNadar

## Positioning
- Headline: AI engineer building robotics, autonomy, and intelligent products from idea to working prototype.
- Mission: Build useful AI systems that move beyond demos: accessibility robotics, safer autonomous systems, security automation, and tools that help people understand technology instead of feeling pushed away by it.
- Voice: Professional, direct, technical when needed, warm enough for hiring teams and collaborators. Avoid sounding like a generic resume bot.
- Audiences: hiring teams, engineering managers, robotics teams, AI/ML collaborators, hackathon judges, students and mentors

## Navigation Routes
- Home: `/`
- Projects: `/projects`
- Posts: `/posts`
- Autonomy: `/autonomous-vehicles`
- Gallery: `/gallery`
- Stack Map: `/stack-map`
- About: `/about`
- Resume: `/resume`
- Contact: `/contact`

## Focus Lanes
### Accessibility Robotics
OBSERV-E, GRVI, DRVI, and HRVI connect assistive robotics with direct user feedback.
- Guide robot for visually impaired users
- Drone support for broader perception
- Haptic receiver with direct Bluetooth cues

### Applied AI
Models, agents, and voice systems that move past demo mode.
- LLM and speech prototypes
- Classification and anomaly detection
- Workflows that connect to useful outcomes

### Robotics
Real-time validation, perception, and autonomy support.
- Sensor fusion with RTMaps + C++
- Lead vehicle and driver monitoring work
- Requirements, testing, and integration coverage

### Security Automation
Operational tools that reduce manual effort and improve visibility.
- SPF, DKIM, and DMARC automation
- Reporting and downstream integrations
- Monitoring-minded architecture

### Product Systems
Cloud tooling, product clarity, and practical delivery.
- Azure, Supabase, and deployment tooling
- Internal tools and AI-facing product work
- Interfaces designed around clarity and useful routing

## Projects
### OBSERV-E Accessibility Robotics Ecosystem
- Slug: observ-e
- Domain: Robotics
- Role: Founder / technical product lead
- Period: 2026–Present
- Route: `/projects/observ-e`
- Summary: OBSERV-E is an accessibility robotics umbrella focused on helping visually impaired users perceive, navigate, and receive environmental guidance through robots, drones, and haptic feedback.
- Skills: Robotics, Computer Vision, Bluetooth, Haptics, Product Strategy, Accessibility
- Outcomes:
  - Reframed the architecture from robot → web app → end user to direct robot → end user Bluetooth signaling for faster feedback.
  - Defined OBSERV-E as the umbrella ecosystem that includes GRVI, DRVI, and HRVI instead of treating each robot as an isolated project.
  - Built the pitch direction around service-dog-inspired guidance, computer vision, and user-centered support for visually impaired people.
- Implementation notes:
  - GRVI · Guide Robot for the Visually Impaired: Ground robot that acts like a robotic guide companion, using perception to detect obstacles and route guidance cues to the user.
  - DRVI · Drone Robot for the Visually Impaired: Aerial support robot concept for broader environmental awareness, scouting, and overhead perception when ground-level sensing is limited.
  - HRVI · Haptic Receiver for the Visually Impaired: Wearable or handheld receiver that turns robot signals into direct tactile feedback for the end user through Bluetooth.
- Artifacts/context:
  - robotics: OBSERV-E connects mobile robotics, aerial robotics, and haptic receivers into one assistive navigation ecosystem.
  - cpp: Future embedded control and signal handling can connect robot state to haptic output.
  - python: Prototype logic and perception experiments can be supported through Python-based robotics tooling.

### Selvam Valuations · ScarletHacks M&A Intelligence Prototype
- Slug: selvam-valuations
- Domain: Applied AI / Finance
- Role: AI/product engineering contributor
- Period: ScarletHacks · 2026
- Route: `/projects/selvam-valuations`
- Summary: Built a team M&A intelligence prototype at ScarletHacks, exploring financial-data workflows, LLM-assisted article analysis, valuation context, ESG-style graphing, and merger-lab comparisons.
- Skills: Python, FastAPI, LLMs, Financial APIs, Supabase, Vercel, Product Strategy
- Outcomes:
  - Created a team prototype for M&A/valuation intelligence during ScarletHacks.
  - Explored how LLM-assisted summaries and structured data can support company comparison and deal reasoning.
  - Identified practical full-stack reliability issues around live APIs, CORS, environment variables, and deployment.
- Implementation notes:
  - Financial AI product concept: Company data, article analysis, valuation context, and merger-lab workflows.
  - Backend and API planning: FastAPI/Python backend direction with financial API and LLM-assisted analysis integration.
  - Deployment lessons: CORS, API keys, Vercel/FastAPI structure, and the difference between prototype and production reliability.
- Artifacts/context:
  - python: Project work involved practical prototype logic and demo-ready implementation.
  - apis: Hackathon builds often required connecting product interface, backend, and service workflows quickly.
  - product: The project emphasized product value and explainability, not only technical implementation.

### Monocular Lane Detection Improvement Study
- Slug: lane-detection-salad
- Domain: Applied AI
- Role: Computer vision research project
- Period: 2026
- Route: `/projects/lane-detection-salad`
- Summary: Compared backbone architectures and data augmentation strategies for lane detection, simplifying the original 3D problem into a feasible 2D lane-coordinate prediction pipeline.
- Skills: Python, Computer Vision, PyTorch, Data Augmentation, Model Evaluation
- Outcomes:
  - Compared ResNet-18, EfficientNet-B0, and MobileNetV2 to study accuracy versus efficiency.
  - Used augmentation such as blur, noise, brightness changes, and shadow simulation to test robustness.
  - Presented F1-score, precision, recall, and center-distance error to explain strengths and weaknesses clearly.
- Implementation notes:
  - Backbone comparison: ResNet-18 baseline versus EfficientNet-B0 and MobileNetV2.
  - Augmentation study: Weather and lighting-inspired transforms tested model robustness.
  - Results narrative: Explain F1-score, precision, recall, and CD error in terms of lane detection quality.
- Artifacts/context:
  - python: Training, preprocessing, metrics, and plotting were handled in Python.
  - sklearn: Evaluation used structured metrics and comparison tables to explain model behavior.
  - ml: The project focused on model performance, robustness, and architecture tradeoffs.

### A Little Tech For You · In-progress AI Guide for Older Adults
- Slug: a-little-tech-for-you
- Domain: Applied AI
- Role: Founder / AI product builder
- Period: 2026–Present
- Route: `/projects/a-little-tech-for-you`
- Summary: A friendly AI education and tech-support platform that helps older adults understand everyday technology through simple chats, short videos, accessible explainers, and private consulting workflows.
- Skills: Claude, ChatGPT, Hugging Face, ResembleAI Chatterbox, coqui XTTS-v2, FastAPI, Node/Express, Voice TTS, Accessible Design, Product Strategy
- Outcomes:
  - Defined the product around a real audience: older adults who want practical help with phones, AI, Bluetooth, smart TVs, car technology, online safety, and everyday tech questions.
  - Designed the app as a mix of short tutorial videos, simple chat answers, consulting paths, and membership options rather than a generic chatbot.
  - Planned an AI voice narration pipeline using a Python/FastAPI voice service with Hugging Face TTS models so tutorial content can sound patient, clear, and personal.
- Implementation notes:
  - Simple tech guidance: Older adults can ask technology questions and get patient, plain-language answers that avoid jargon.
  - Short tutorial content: Tutorial scripts can become short videos with AI-generated narration and step-by-step visuals.
  - Consulting and membership path: The project includes room for private consulting, memberships, and family support options.
- Artifacts/context:
  - ai-tools: Uses LLMs and AI-assisted development to rapidly prototype user flows, scripts, explanations, and knowledge-base content.
  - huggingface: Planned voice-service pipeline uses ResembleAI/chatterbox as a primary TTS model and coqui/XTTS-v2 as a fallback for cloned-voice narration.
  - accessibility: Product framing centers clarity, patience, plain language, large readable UI, and support paths for non-technical users.

### Reinforcement Learning Lane-Keeping Simulator
- Slug: rl-autonomous-driving
- Domain: Robotics
- Role: RL simulation and evaluation project
- Period: 2026
- Route: `/projects/rl-autonomous-driving`
- Summary: Built a lightweight lane-keeping simulator to compare sensor configurations and reward design for autonomous-driving-style reinforcement learning behavior.
- Skills: Python, Reinforcement Learning, PPO, Simulation, Evaluation
- Outcomes:
  - Compared Camera, Camera+LiDAR, and full-stack sensing configurations using driving metrics.
  - Tracked reward, collision rate, off-road rate, task completion, lane deviation, and distance traveled.
  - Used simulator videos and metric tables to explain why more sensor data is not always better for RL.
- Implementation notes:
  - Reward design: Show how good lane position, crashes, and off-road behavior affected learning.
  - Sensor comparison: Camera versus Camera+LiDAR versus full stack.
  - Demo video slot: Use for the cleanest driving replay or the most informative failure case.
- Artifacts/context:
  - python: The custom simulator, training loop, and evaluation scripts were built in Python.
  - ml: PPO training connected policy learning to reward feedback and state observations.
  - robotics: The task modeled autonomous lane keeping and sensor-based decision making.

### DNS Email Authentication Scanner
- Slug: dns-security-scanner
- Domain: Cybersecurity
- Role: Software Automation Engineer project direction
- Period: 2025–Present
- Route: `/projects/dns-security-scanner`
- Summary: Python automation that checks SPF, DKIM, and DMARC posture, validates findings against EasyDMARC, and fits MSP monitoring workflows.
- Skills: Python, APIs, JSON/CSV, Automation, Security
- Outcomes:
  - Built a reusable Python workflow for domain email-auth checks.
  - Designed JSON and CSV reporting for operational use.
  - Validated outputs against EasyDMARC instead of trusting raw automation blindly.
- Implementation notes:
  - Terminal or dashboard: Use this spot for the scanner UI, terminal output, or a reporting screenshot.
  - Workflow diagram: Map DNS lookup -> validation -> report -> monitoring handoff.
  - Before / after ops view: Show how manual checks became a repeatable workflow.
- Artifacts/context:
  - python: Core scanner logic, DNS parsing, result normalization, and reporting live in Python.
  - apis: The workflow is built to pass results into downstream systems and monitoring services.
  - security: The project centers on SPF, DKIM, DMARC posture, and domain security visibility.
  - data: Results are structured for downstream review and operations.

### AILA · AI Leadership Avatar
- Slug: aila-avatar
- Domain: Applied AI
- Role: Voice and AI portfolio assistant concept
- Period: 2025–Present
- Route: `/projects/aila-avatar`
- Summary: A voice-driven leadership assistant concept for Illinois Tech that explores conversational presence, speech, and accessible guidance.
- Skills: Python, Azure, Speech, LLMs, Product
- Outcomes:
  - Explores how speech, presence, and guidance can feel more human on the web.
  - Connects AI orchestration with design, narrative, and accessibility.
  - Acts as both a prototype and a statement about Danish’s direction in applied AI.
- Implementation notes:
  - Avatar render: Place a hero render or 3D scene still here.
  - Conversation flow: Show prompt -> response -> speech -> UI feedback.
  - Accessibility note: Use this card for fast-loading or low-friction UX notes.
- Artifacts/context:
  - python: Prototype orchestration and service glue logic were built in Python.
  - azure: Speech and AI service exploration leaned on Azure-based tooling.
  - apis: Voice and inference services are stitched together through backend service calls.

### JTR · AI Job-Seeking Agent
- Slug: jtr-agent
- Domain: Applied AI
- Role: Agent workflow and product direction
- Period: 2025
- Route: `/projects/jtr-agent`
- Summary: An AI-powered job-seeking system focused on matching, outreach ideas, and workflow automation for real-world career ops.
- Skills: Python, APIs, Automation, ML
- Outcomes:
  - Frames job-seeking as an operations problem, not just a chat problem.
  - Connects matching, outreach, and automation into a single system direction.
  - Demonstrates product thinking around AI assistance and workflow clarity.
- Implementation notes:
  - System overview: Show the end-to-end agent architecture or matching logic here.
  - Workflow board: Capture outreach generation, tracking, or job triage UI.
  - Reasoning example: Use this for prompt strategy or matching screenshots.
- Artifacts/context:
  - python: Python handled orchestration and system logic for the agent pipeline.
  - apis: External job, messaging, and enrichment workflows rely on API-first integration patterns.

### EcoCAR Sensor Fusion Lead
- Slug: ecocar-sensor-fusion
- Domain: Robotics
- Role: Connected Automated Vehicle Engineer · Sensor Fusion Lead
- Period: 2024
- Route: `/projects/ecocar-sensor-fusion`
- Summary: Authored requirements and test cases for perception and monitoring modules while implementing C++ components for lead vehicle detection and driver attention systems.
- Skills: C++, RTMaps, Validation, Sensor Fusion, Robotics
- Outcomes:
  - Wrote requirements and test cases with full validation coverage in mind.
  - Implemented real-time C++ modules for lead vehicle and driver attention work.
  - Worked across LiDAR, radar, camera data, and RTMaps synchronization.
- Implementation notes:
  - Sensor stack diagram: Show how camera, radar, and LiDAR inputs connect.
  - RTMaps view: Add a screenshot of timing, fusion, or anomaly handling.
  - Validation board: Use for test plans, results, or module requirements.
- Artifacts/context:
  - cpp: Core modules for lead vehicle detection and driver monitoring were implemented in C++.
  - rtmaps: Sensor synchronization and anomaly handling were managed in RTMaps.
  - robotics: The entire project is grounded in autonomous vehicle perception and validation.

### AI Headshot Platform Contribution
- Slug: ai-headshot-platform
- Domain: Product
- Role: Production contribution on AI product tooling
- Period: 2025
- Route: `/projects/ai-headshot-platform`
- Summary: Contributed to production fixes on an AI headshot platform using Production App Workflows, Supabase, Vercel CI/CD, and Stripe.
- Skills: Production App Workflows, Supabase, Vercel, Stripe, CI/CD
- Outcomes:
  - Contributed to production fixes rather than only local prototypes.
  - Touched deployment, backend support, and payments-related flows.
  - Shows comfort with fast-moving product environments around AI services.
- Implementation notes:
  - Deployment pipeline: Add a release flow, CI/CD view, or deployment showcase.
  - Product surface: Use this for a UI screenshot or issue-resolution example.
  - Operational note: Highlight reliability, debugging, or customer-facing impact.
- Artifacts/context:
  - supabase: Database and application flows were supported through Supabase-backed services.
  - vercel: Deployment and CI/CD were part of shipping fixes and stabilizing the product.
  - apis: Payments and service interactions required dependable integration work.

### Phishing Detection Model
- Slug: phishing-detector
- Domain: Applied AI
- Role: Model design, preprocessing, and evaluation
- Period: 2024
- Route: `/projects/phishing-detector`
- Summary: An AI-powered phishing detector built with RandomForestClassifier for anomaly-driven detection, reaching 92% accuracy.
- Skills: Python, Scikit-learn, Data Prep, Classification
- Outcomes:
  - Handled preprocessing, model training, and evaluation end to end.
  - Reached a reported detection accuracy of 92%.
  - Shows an showcase-based applied ML workflow with measurable output.
- Implementation notes:
  - Model workflow: Use for preprocessing, training, and evaluation flow.
  - Metrics view: Drop accuracy, precision, or confusion-matrix visuals here.
  - Feature board: Explain which signals helped classify phishing.
- Artifacts/context:
  - python: Data preprocessing, training, and evaluation were managed in Python.
  - sklearn: The detector used scikit-learn for the RandomForestClassifier workflow.
  - data: The project required structured feature preparation and model evaluation.

### Course Recommendation System
- Slug: course-recommendation
- Domain: Applied AI
- Role: Recommendation logic and similarity system build
- Period: 2024
- Route: `/projects/course-recommendation`
- Summary: Recommendation system using CountVectorizer and cosine similarity for course matching and relevance scoring.
- Skills: Python, NLP, Scikit-learn, Ranking
- Outcomes:
  - Used vectorization and cosine similarity to compare courses.
  - Framed recommendation as a structured ranking problem.
  - Shows practical feature engineering for user-facing relevance.
- Implementation notes:
  - Ranking UI: Show how the recommended courses are displayed.
  - Similarity logic: Map CountVectorizer + cosine similarity in a simple diagram.
  - Input / output: Add before-and-after recommendation examples here.
- Artifacts/context:
  - python: Recommendation logic and preprocessing were built in Python.
  - sklearn: Vectorization and similarity methods fit naturally into a scikit-learn style workflow.

### Credit Card Fraud Detection
- Slug: fraud-detection
- Domain: Applied AI
- Role: Anomaly detection experimentation and evaluation
- Period: 2024
- Route: `/projects/fraud-detection`
- Summary: Used Isolation Forest and One-Class SVM to detect anomalous or fraudulent transactions.
- Skills: Python, Scikit-learn, Anomaly Detection
- Outcomes:
  - Compared anomaly-detection approaches for fraud-style data.
  - Used unsupervised and semi-supervised style methods to flag outliers.
  - Shows range across practical ML tasks beyond standard classification.
- Implementation notes:
  - Anomaly map: Show clusters, outliers, or a flagged-transaction visual.
  - Method comparison: Contrast Isolation Forest with One-Class SVM here.
  - Risk summary: Use for thresholding logic or fraud-review workflow.
- Artifacts/context:
  - python: Experimentation and evaluation ran in Python notebooks and scripts.
  - sklearn: Isolation Forest and One-Class SVM align directly with scikit-learn usage.
  - security: Fraud analytics support security and risk-oriented problem solving.

### Spiron Virtual Assistant
- Slug: spiron-assistant
- Domain: Product
- Role: Early voice-assistant build
- Period: 2022
- Route: `/projects/spiron-assistant`
- Summary: A multifunctional voice assistant using pyttsx3 and speech_recognition for task automation and hands-free interaction.
- Skills: Python, Speech, Automation
- Outcomes:
  - Built an early voice-first system around commands and automation.
  - Explored how interaction changes when voice becomes the primary interface.
  - Signals a consistent long-term interest in conversational systems.
- Implementation notes:
  - Command gallery: Place example prompts or tasks handled by the assistant.
  - Voice flow: Show speech input -> action -> response.
  - Automation payoff: Use for practical tasks the assistant sped up.
- Artifacts/context:
  - python: Voice command handling and assistant behavior were built in Python.
  - apis: Even when local-first, the system reflects integration-oriented thinking.

### Automated Shopping Bot
- Slug: shopping-bot
- Domain: Product
- Role: Browser automation workflow
- Period: 2021–2022
- Route: `/projects/shopping-bot`
- Summary: Selenium-based automation bot that scraped product data and completed transactions from user-provided links.
- Skills: Python, Selenium, Automation
- Outcomes:
  - Automated scraping and browser-driven actions from user inputs.
  - Shows early comfort with web workflows and repetitive-task automation.
  - Adds depth to the automation side of the portfolio.
- Implementation notes:
  - Browser flow: Show Selenium-driven task steps or page-state transitions.
  - Data extraction: Use for scraped-product fields or automation logic.
  - Checkout sequence: Add a safe, redacted detail view of the workflow.
- Artifacts/context:
  - python: Automation, scraping, and orchestration were built in Python.
  - apis: Even with browser automation, the project reflects integration-style thinking.

### TTP DNS Screening & Outreach Automation
- Slug: ttp-outreach-automation
- Domain: Security Automation
- Role: Automation engineer / product builder
- Period: 2026
- Route: `/projects/ttp-outreach-automation`
- Summary: A Streamlit-based business workflow that scans domains for SPF, DKIM, and DMARC issues, generates tailored outreach, and supports safe test/live email sending through Microsoft Graph.
- Skills: Python, Streamlit, Microsoft Graph API, DNS, SPF/DKIM/DMARC, SQLite, CSV, Batch Processing
- Outcomes:
  - Designed a workflow that can test-send or live-send while keeping the Streamlit app stable for larger batches.
  - Connected DNS security findings to plain-language outreach messaging for business use.
  - Separated test overrides from prospect outreach to reduce mistakes during demos and production runs.
- Implementation notes:
  - Scanner pipeline: Runs domain checks and turns technical DNS results into structured findings.
  - Outreach workflow: Generates scenario-driven email messaging tied to each domain's findings.
  - Batch stability: Designed around test sends, live sends, rate limits, and failure recovery for 100+ contacts/domains.
- Artifacts/context:
  - security: Finds SPF, DKIM, and DMARC configuration issues that impact email trust.
  - automation: Combines scanning, contact ingestion, templating, and Microsoft Graph sending.
  - product: Wraps technical automation in a Streamlit interface designed for a boss or client to use.

## Experience
### Software Automation Engineer · Technology Transition Paradigm
- Period: Aug 2025 – Present
- Building a DNS/security outreach automation pipeline around SPF, DKIM, DMARC, dark-web indicators, Microsoft Graph email delivery, and tracking workflows.
- Developing Python tooling that turns manual client security checks into repeatable reporting and outreach operations.
- Designing structured CSV/JSON outputs, database persistence, and validation steps against external tools such as EasyDMARC.

### AI Software Development Intern · OfficePro, Inc.
- Period: May 2025 – Aug 2025
- Developed AI instructor and training-support prototypes using Azure Cognitive Services, Speech Services, Azure Functions, and web tooling.
- Automated and supported a 50+ computer training fleet with Python, PowerShell, and operational scripting.
- Contributed to AIHeadShotMasters production workflows involving Production App Workflows, Supabase, Vercel CI/CD, Stripe checkout, and debugging deployment issues.

### Connected Automated Vehicle Engineer · Sensor Fusion Lead · EcoCAR EV Challenge
- Period: Aug 2024 – Present
- Authored requirements and validation test cases for perception, lead-vehicle detection, and driver-monitoring modules.
- Implemented real-time C++ and RTMaps workflows across camera, radar, LiDAR, and vehicle-state signals.
- Built practical understanding of autonomy systems, signal routing, and test-driven validation for connected automated vehicles.

### Founder / Technical Product Lead · OBSERV-E
- Period: 2026 – Present
- Defining OBSERV-E as an accessibility robotics umbrella for GRVI, DRVI, and HRVI.
- Shifting the architecture toward direct Bluetooth robot-to-user feedback rather than relying on a web app as the main signal path.
- Building pitch materials around service-dog-inspired robotics, computer vision, haptics, and accessible navigation.

### Treasurer · Instructor · Developer · Illinois Tech Robotics
- Period: Nov 2024 – Present
- Secured budget approvals and coordinated purchasing, workshops, and student robotics operations.
- Led and supported workshops across AI/ML, Linux, Python, systems programming, and robotics fundamentals.
- Represented Illinois Tech Robotics in competitions and collaborative projects, including a winning StarkHacks 2026 build.

### Leadership Academy Scholar · M.A. and Lila Self Leadership Academy · Illinois Tech
- Period: 2025 – Present
- Selected for leadership development focused on service, execution, and interdisciplinary teamwork.
- Serves in student leadership contexts that connect engineering, communication, and community impact.
- Uses leadership training to strengthen project planning, technical storytelling, and team accountability.

## Education
- Illinois Institute of Technology: Bachelor of Science & Master of Science, Artificial Intelligence · GPA 3.42 Expected May 2027 
- Montgomery College: Associate of Applied Sciences, Cloud Computing & Network Technology · GPA 3.89 Apr 2023 

## Resume Stats
- 38+: AI experiments benchmarked
- 120+: simulation scenarios tested
- 91%: best perception benchmark
- 3: robotics + autonomy pipelines

## Resume Wins
- Builds across AI, robotics, autonomy, cloud tooling, and cybersecurity automation.
- Connects technical execution with pitch storytelling, product strategy, and user impact.
- Has hands-on work in Python, C++, Production App Workflows, RTMaps, Supabase, Vercel, Stripe, and Azure tooling.
- Brings leadership experience from Illinois Tech Robotics, EcoCAR, Leadership Academy, and OBSERV-E.

## Achievements
### StarkHacks 2026 Qualcomm Robotics Track winner
Team win connected to OBSERV-E, an accessibility robotics concept for visually impaired navigation.
Route: `/projects/observ-e`

### Microsoft Learn AI Skills Fest Badge
Earned a Microsoft Learn AI Skills Fest badge through Microsoft's AI learning challenge, reinforcing practical AI fluency, generative AI concepts, and responsible skill-building.
Route: `/resume`

### EcoCAR sensor-fusion and autonomy work
Real-time autonomy work involving sensors, driver attention, lead-vehicle detection, RTMaps/C++, and vehicle-level constraints.
Route: `/projects/ecocar-sensor-fusion`

### AI and robotics project portfolio
Built and documented projects across RL driving, lane detection, AI avatars, security automation, phishing/scam education, and recommendation systems.
Route: `/projects`

### Hackathon and product prototyping experience
Projects include OBSERV-E, Selvam Valuations, ScamMantha, and rapid AI product prototypes.
Route: `/projects`

### Technical storytelling and public writing
Posts connect engineering work to reflections, lessons learned, portfolio updates, and project narratives.
Route: `/posts`

## Autonomous Vehicle Story
- route: /autonomous-vehicles
- coreMessage: Autonomy is where AI has to become dependable engineering. The portfolio connects real vehicle work, lane detection, reinforcement learning simulation, and sensor-fusion thinking.
### themes
- sensor fusion
- lane detection
- driver attention
- lead vehicle tracking
- reinforcement learning
- simulation-to-real gap
- real-time constraints
- safe system design
### relatedProjects
- ecocar-sensor-fusion
- rl-autonomous-driving
- lane-detection-salad

## Hobbies and Personal Texture
- Guitar and music: Shows creativity, practice, performance discipline, and comfort improving through feedback.
- Astronomy and curiosity: Connects to a long-running interest in big technical questions and systems thinking.
- Fitness and sports: Reflects discipline, consistency, and the habit of rebuilding through effort.
- Travel and reflection: Adds perspective, empathy, and curiosity about how people live and build in different environments.
- Hands-on building: Links directly to robotics: taking things apart, rebuilding, prototyping, wiring, debugging, and learning by doing.
- Mentoring and community: Connects to helping others learn, explaining technical topics clearly, and building inclusive spaces.

## Articles / Posts
- OBSERV-E: accessibility robotics beyond a single robot: How GRVI, DRVI, and HRVI work together as an assistive ecosystem.
- Moving an AI idea past demo mode: How useful systems get shipped.
- Sensor fusion lessons from robotics: Validation, teamwork, and real-time constraints.
- Email auth automation for operations: Turning security checks into repeatable workflows.

## Skills and Stack
- C++ (Language): Real-time autonomy and systems language used across EcoCAR sensor-fusion and controller work. Projects: ecocar-sensor-fusion, rl-autonomous-driving
- Java (Language): Object-oriented programming foundation used in coursework and the P33 Chicago financial-literacy text adventure project. Projects: scammantha, jtr-agent
- MATLAB (Language): Math, modeling, and engineering-computation language to support controls, signal processing, and simulation-oriented coursework. Projects: ecocar-sensor-fusion, rl-autonomous-driving
- Python (Language): Primary language across AI/ML experiments, automation pipelines, DNS/security tooling, and data workflows. Projects: dns-security-scanner, ttp-outreach-automation, rl-autonomous-driving, lane-detection-salad, fraud-detection, course-recommendation, a-little-tech-for-you
- SQL (Language): Querying and relational data skill used across Supabase, analytics, and data-backed product workflows. Projects: ai-headshot-platform, fraud-detection, course-recommendation
- Production App Workflows (Language): Typed AI-assisted product engineering across portfolio, AI product prototypes, and production-flavored web apps. Projects: ai-headshot-platform, aila-avatar, selvam-valuations
- Applied Machine Learning (ML): Turning models into useful workflows: recommender systems, CV perception, classification, and product-integrated AI. Projects: lane-detection-salad, fraud-detection, course-recommendation, observ-e, ai-headshot-platform, a-little-tech-for-you
- Classification (ML): Supervised-learning framing for fraud detection, security analysis, driver/scene states, and decision-support workflows. Projects: fraud-detection, dns-security-scanner, ecocar-sensor-fusion
- Computer Vision (ML) (ML): Vision-model thinking for lane detection, OBSERV-E perception, object recognition, and camera-based autonomy workflows. Projects: observ-e, lane-detection-salad, ecocar-sensor-fusion
- Convolutional Neural Networks (ML): Computer-vision model family used in lane detection, perception, and image understanding contexts. Projects: lane-detection-salad, observ-e
- Data & EDA (ML): Exploratory analysis, preprocessing, feature work, and outcome-driven model preparation. Projects: fraud-detection, course-recommendation, lane-detection-salad, selvam-valuations
- Data Analytics (ML): Analysis and reporting mindset across security automation, product decisions, and ML evaluation. Projects: dns-security-scanner, ttp-outreach-automation, fraud-detection
- Data Pipelines (ML): Data movement, transformation, and analysis workflows across Founders Frequency, TTP automation, and applied AI projects. Projects: ttp-outreach-automation, dns-security-scanner, selvam-valuations
- Data Science (ML): Data-driven problem solving from certifications, coursework, analysis, and ML engineering work. Projects: fraud-detection, course-recommendation, lane-detection-salad, selvam-valuations, a-little-tech-for-you
- Decision Modeling (ML): Structured thinking for recommendations, autonomous decision systems, and business/AI product strategy. Projects: course-recommendation, rl-autonomous-driving, selvam-valuations
- Deep Learning (ML): Neural-modeling foundation for perception, VLMs, and advanced ML experimentation. Projects: lane-detection-salad, observ-e, ai-headshot-platform
- Evaluation Metrics (ML): MSE, MAE, lane accuracy, collision rate, task completion, model scoring, and employer-facing measurement discipline. Projects: lane-detection-salad, rl-autonomous-driving, fraud-detection
- Feature Engineering (ML): Transforms raw data into useful signals for ML experiments, data pipelines, security scoring, and recommendation/ranking systems. Projects: fraud-detection, course-recommendation, dns-security-scanner
- LLMs (ML): Large-language-model product concepts, portfolio guide work, and insight extraction systems. Projects: aila-avatar, selvam-valuations, spiron-assistant
- Linear Regression (ML): Statistical modeling foundation used in coursework and interpretable ML workflows. Projects: fraud-detection, course-recommendation
- Machine Learning (ML): Applied modeling, evaluation, and experimentation across coursework, certifications, and engineering projects. Projects: lane-detection-salad, fraud-detection, course-recommendation, rl-autonomous-driving, observ-e, a-little-tech-for-you
- Matplotlib (ML): Visualization library for ML reports, metrics plots, and experiment communication. Projects: lane-detection-salad, rl-autonomous-driving, fraud-detection
- Model Deployment (ML): Connects trained/experimental models to usable software systems, interfaces, and cloud-hosted product workflows. Projects: aila-avatar, ai-headshot-platform, selvam-valuations
- Model Evaluation (ML): Metrics-driven assessment including MSE, MAE, accuracy, task completion, and simulation outcomes. Projects: lane-detection-salad, rl-autonomous-driving, fraud-detection
- Natural Language Processing (ML): Language-model and text-processing ideas for summaries, AI assistants, outreach generation, and conversational tools. Projects: aila-avatar, spiron-assistant, ttp-outreach-automation
- Neural Networks (ML): Core deep-learning concept behind CNNs, perception pipelines, classification systems, and applied ML experimentation. Projects: lane-detection-salad, rl-autonomous-driving
- PPO (ML): Policy-gradient RL algorithm used in the autonomous driving simulator. Projects: rl-autonomous-driving
- PyTorch (ML): Neural-network experimentation and lane-detection research workflows. Projects: lane-detection-salad, rl-autonomous-driving
- Recommendation Systems (ML): Ranking and recommendation logic for job tracking, course recommendation, and user-facing decision-support tools. Projects: course-recommendation, jtr-agent
- Regression (ML): Regression modeling used for lane coordinate prediction, continuous-value estimation, and model-evaluation practice. Projects: lane-detection-salad
- Reinforcement Learning (ML): PPO-based simulation work for autonomous lane keeping and driving decision-making. Projects: rl-autonomous-driving
- Scikit-learn (ML): Classical ML, classification, recommender, ranking, and evaluation workflows. Projects: fraud-detection, course-recommendation, phishing-detector
- TensorFlow (ML): Deep-learning framework knowledge connected to AI/ML coursework and robotics learning pipelines. Projects: lane-detection-salad, fraud-detection
- VLMs (ML): Vision-language model planning for scene descriptions and accessibility robotics. Projects: observ-e
- Agentic Systems (AI Tools & Workflow): Designing assistants that can route questions, suggest pages, summarize context, and support user workflows across portfolio/product experiences. Projects: a-little-tech-for-you, aila-avatar, spiron-assistant
- ChatGPT (AI Tools & Workflow): AI ideation, debugging, learning support, content drafting, and project planning tool used across technical and communication workflows. Projects: a-little-tech-for-you, aila-avatar, spiron-assistant
- Claude (AI Tools & Workflow): AI coding, writing, refactoring, and architecture partner used to accelerate portfolio/project iteration while keeping human review in the loop. Projects: a-little-tech-for-you, aila-avatar, spiron-assistant
- Copilot Studio (AI Tools & Workflow): Agent-building environment for designing, testing, and publishing Microsoft Copilot-style agents and workflow assistants. Projects: a-little-tech-for-you, aila-avatar
- GitHub Copilot (AI Tools & Workflow): AI pair-programming assistant used to speed up implementation, refactoring, and editor-based code exploration. Projects: a-little-tech-for-you, aila-avatar, ai-headshot-platform
- Hugging Face (AI Tools & Workflow): Model hub, Spaces, inference, and open-source AI ecosystem used for TTS, 3D generation experiments, and model-driven product prototypes. Projects: a-little-tech-for-you, aila-avatar, observ-e
- Hugging Face Inference Providers (AI Tools & Workflow): Serverless model access path for connecting AI models into apps without managing every model runtime directly. Projects: a-little-tech-for-you, spiron-assistant
- Hugging Face Spaces (AI Tools & Workflow): Hosted AI app and demo environment explored for rapid experiments in speech synthesis, 3D generation, and model demos. Projects: a-little-tech-for-you, aila-avatar
- Microsoft Copilot (AI Tools & Workflow): Microsoft AI assistant ecosystem used for productivity, research, and workflow acceleration. Projects: officepro-ai-internship, a-little-tech-for-you
- Prompt Engineering (AI Tools & Workflow): Structured prompting and AI-assisted iteration used to turn vague goals into working code, content, and product requirements. Projects: a-little-tech-for-you, aila-avatar, spiron-assistant
- ResembleAI Chatterbox (AI Tools & Workflow): Open-source TTS model planned as the primary narration engine for A Little Tech For You voice tutorials. Projects: a-little-tech-for-you
- coqui XTTS-v2 (AI Tools & Workflow): Voice-cloning TTS fallback model explored for cloned-voice narration and multilingual speech generation. Projects: a-little-tech-for-you, aila-avatar
- ADAS (Robotics): Advanced driver-assistance systems framing from EcoCAR driver monitoring and perception work. Projects: ecocar-sensor-fusion
- Autonomous Systems (Robotics): End-to-end interest area across EcoCAR, RL driving simulation, sensor fusion, and accessibility robotics. Projects: ecocar-sensor-fusion, rl-autonomous-driving, observ-e
- CAN bus (Robotics): Vehicle signal/networking skill connected to DMS, sensor fusion, and real-time automotive workflows. Projects: ecocar-sensor-fusion
- Computer Vision (Robotics): Vision/perception skill tied to OBSERV-E accessibility robotics, YOLO tracking, and lane detection. Projects: observ-e, lane-detection-salad, rl-autonomous-driving
- Driver-Monitoring System (Robotics): Driver-attention/state logic connected to CAN-signal validation and autonomy safety systems. Projects: ecocar-sensor-fusion
- OpenCV (Robotics): Computer-vision library used in robotics/accessibility and perception pipelines. Projects: observ-e, lane-detection-salad
- ROS2 (Robotics): Robotics middleware knowledge connected to autonomy and sensor-fusion systems. Projects: ecocar-sensor-fusion, observ-e
- RTMaps (Robotics): Synchronized real-time sensor and autonomy workflow tool used in EcoCAR planning and controller integration. Projects: ecocar-sensor-fusion, rl-autonomous-driving
- Sensor Fusion (Robotics): Integration of LiDAR, radar, camera, and vehicle signals for autonomy perception and validation. Projects: ecocar-sensor-fusion, rl-autonomous-driving
- Signal Processing (Robotics): Signal and sensor-processing thinking for vehicle data, perception, and validation. Projects: ecocar-sensor-fusion
- Simulink (Robotics): Model-based engineering context for controls, vehicle logic, and simulation handoff. Projects: ecocar-sensor-fusion
- SocketCAN (Robotics): Linux CAN interface concept used in live vehicle-signal pipeline planning. Projects: ecocar-sensor-fusion
- Systems Integration (Robotics): Connecting data streams, subsystems, APIs, vehicle signals, and deployment constraints into working systems. Projects: ecocar-sensor-fusion, ttp-outreach-automation, ai-headshot-platform
- Vehicle Dynamics (Robotics): Vehicle behavior and control context used in autonomy/lane-centering systems. Projects: ecocar-sensor-fusion, rl-autonomous-driving
- YOLO (Robotics): Object/person-detection family used for user tracking and hazard awareness concepts. Projects: observ-e
- Amazon Web Services (Cloud): Cloud platform skill listed among top profile skills and relevant to scalable AI/backend deployment thinking. Projects: selvam-valuations, spiron-assistant
- Azure AI Foundry (Cloud): AI prototyping platform used during OfficePro AI software development internship. Projects: aila-avatar, ai-headshot-platform, a-little-tech-for-you
- Azure Cognitive Services (Cloud): AI/speech/service layer used for cloud-native AI instructor and training workflows. Projects: aila-avatar
- Azure Functions (Cloud): Serverless cloud pattern used in AI prototype and automation architecture. Projects: aila-avatar, ai-headshot-platform
- Azure Speech Services (Cloud): Speech and AI service foundation from OfficePro AI-instructor prototyping and voice-enabled learning workflows. Projects: aila-avatar, ai-headshot-platform
- Cloud Architecture (Cloud): Cloud-system design across OfficePro, AI platform architecture, Supabase/Vercel apps, and Leadership Academy technology planning. Projects: ai-headshot-platform, aila-avatar, selvam-valuations
- Cloud Automation (Cloud): Automating cloud/product operations with Python, PowerShell, Vercel, Azure, and scalable deployment workflows. Projects: ai-headshot-platform, ttp-outreach-automation
- Cloud Computing (Cloud): Cloud/network foundation from Montgomery College and internship/project work. Projects: ai-headshot-platform, selvam-valuations, ttp-outreach-automation
- Microsoft Azure (Cloud): Cloud platform used in AI instructor prototyping and Azure AI product work. Projects: aila-avatar, ai-headshot-platform, a-little-tech-for-you
- Microsoft Copilot Studio (Cloud): Low-code/AI assistant tooling connected to robotics/leadership technology and Microsoft ecosystem work. Projects: aila-avatar, spiron-assistant
- PostgreSQL (Cloud): Relational database foundation behind Supabase-backed products and data storage. Projects: ai-headshot-platform, selvam-valuations
- SQLite (Cloud): Lightweight local database useful for internal automation logging and batch workflows. Projects: ttp-outreach-automation
- Serverless Functions (Cloud): Serverless Azure Functions and API-style workflows used to prototype AI instructor and cloud-connected product systems. Projects: ai-headshot-platform, aila-avatar
- Stripe (Cloud): Payments integration experience from AI headshot/product development work. Projects: ai-headshot-platform
- Stripe Integration (Cloud): Payment integration experience from production web product work on aiheadshotmasters.com. Projects: ai-headshot-platform
- Supabase (Cloud): Database/auth/storage layer used in production-flavored web products. Projects: ai-headshot-platform, aila-avatar, a-little-tech-for-you
- Vercel (Cloud): Deployment platform and CI/CD target used for portfolio, AI headshot product work, and product interface shipping workflows. Projects: ai-headshot-platform, aila-avatar, selvam-valuations
- Vercel CI/CD (Cloud): Product deployment and production-debugging workflow used across web apps, AI headshot platform work, and this portfolio. Projects: ai-headshot-platform, aila-avatar
- WordPress / Elementor (Cloud): Web operations, SEO, accessibility, and content management experience from OfficePro work. Projects: ai-headshot-platform
- APIs (Backend & Integrations): Service layers and integrations that connect data, apps, models, and user workflows. Projects: dns-security-scanner, aila-avatar, selvam-valuations, ai-headshot-platform
- Data-Driven Planning (Backend & Integrations): Using engagement metrics, research aggregation, and workflow analysis to guide AI platform direction and leadership-project decisions. Projects: aila-avatar
- FastAPI (Backend & Integrations): Python API framework used in Full-Stack AI/Data product concepts. Projects: selvam-valuations, spiron-assistant, a-little-tech-for-you
- Functional Requirements (Backend & Integrations): Requirements analysis and engineering used to make systems testable and aligned with stakeholders. Projects: ecocar-sensor-fusion, aila-avatar
- Microsoft Graph API (Backend & Integrations): Microsoft 365 email automation for controlled test/live outreach and business workflows. Projects: ttp-outreach-automation
- PowerShell (Backend & Integrations): Automation scripting for IT operations, lab deployment workflows, and repeatable environment setup. Projects: ai-headshot-platform
- Process Automation (Backend & Integrations): Automating repeated business/technical processes with scripts, pipelines, and app interfaces. Projects: ttp-outreach-automation, dns-security-scanner, ai-headshot-platform
- REST APIs (Backend & Integrations): Backend integration pattern for AI, product, financial, and automation systems. Projects: selvam-valuations, ai-headshot-platform, ttp-outreach-automation
- Requirements Engineering (Backend & Integrations): Requirements, testing, and validation discipline from EcoCAR, Founders Frequency, Leadership Academy, and product delivery work. Projects: ecocar-sensor-fusion, aila-avatar, ttp-outreach-automation
- Scripting (Backend & Integrations): Python/PowerShell/Linux automation used across security, cloud, and lab-management workflows. Projects: ttp-outreach-automation, dns-security-scanner
- Selenium (Backend & Integrations): Browser automation skill from AI/software development internship workflows. Projects: ai-headshot-platform, spiron-assistant
- Software Development Life Cycle (Backend & Integrations): Planning, development, testing, deployment, and documentation across internships, client projects, and campus leadership systems. Projects: selvam-valuations, ai-headshot-platform, ttp-outreach-automation
- Streamlit (Backend & Integrations): Python-to-web internal tool framework used to make automation accessible to non-technical users. Projects: ttp-outreach-automation, a-little-tech-for-you
- Testing (Backend & Integrations): Validation mindset across production product work, vehicle systems, and automation pipelines. Projects: ecocar-sensor-fusion, ai-headshot-platform, ttp-outreach-automation
- Business Analysis (Security & Domain): Business-facing analysis skill used to connect technical systems to stakeholder needs and outcomes. Projects: selvam-valuations, ttp-outreach-automation, ai-headshot-platform
- Business Strategy (Security & Domain): Strategic framing skill for product, startup/client work, and leadership technology initiatives. Projects: selvam-valuations, ai-headshot-platform, aila-avatar
- DNS (Security & Domain): Domain Name System analysis used in SPF/DKIM/DMARC checks and security posture workflows. Projects: dns-security-scanner, ttp-outreach-automation
- Domain Name System (DNS) (Security & Domain): DNS expertise used in SPF/DKIM/DMARC validation, security screening, and MSP-style automation workflows. Projects: dns-security-scanner, ttp-outreach-automation
- Email Security (Security & Domain): Security posture area connecting DNS records, outreach, compliance, and business protection. Projects: dns-security-scanner, ttp-outreach-automation
- Phishing / Scam Awareness (Security & Domain): Security education and awareness through DNS tooling and Scammantha-style learning concepts. Projects: dns-security-scanner, scammantha, phishing-detector
- SPF / DKIM / DMARC (Security & Domain): Email-authentication protocols used to detect misconfiguration, spoofing risk, and phishing exposure. Projects: dns-security-scanner, ttp-outreach-automation
- Security & Domain (Security & Domain): Business-facing security automation through DNS/email authentication screening and reporting. Projects: dns-security-scanner, ttp-outreach-automation
- Agile Project Management (Leadership & Professional): Sprint/task coordination and team execution skill from Leadership Academy and project-team work. Projects: aila-avatar, selvam-valuations
- Budget Management (Leadership & Professional): Treasury, annual budgets, funding approval, and organizational resource tracking. Projects: aila-avatar
- Documentation (Leadership & Professional): Reusable guides, structured project docs, workshop material, and technical knowledge systems. Projects: ttp-outreach-automation, ecocar-sensor-fusion, aila-avatar
- Leadership & Professional (Leadership & Professional): Leadership context across ML@IIT, Illinois Tech Robotics, Leadership Academy, Career Services, P-TECH, campus organizations, workshops, budgeting, and stakeholder communication. Projects: aila-avatar, observ-e, scammantha, ttp-outreach-automation
- Professional Communication (Leadership & Professional): Resume, LinkedIn, career coaching, workshops, stakeholder communication, and technical storytelling. Projects: aila-avatar, scammantha
- Stakeholder Engagement (Leadership & Professional): Working with students, leadership, clients, and technical teams to deliver useful outcomes. Projects: aila-avatar, ai-headshot-platform, ttp-outreach-automation

## API and Integration Context
- Azure Cognitive Services / Speech: Used in avatar-style and training prototypes to connect speech, interaction, and AI behavior.
- Microsoft Graph: Relevant for secure enterprise messaging flows and automation patterns in Microsoft environments.
- Stripe: Used in product work where payments and subscriptions connect to a user-facing service.
- Supabase APIs: Database, auth, and app-level service layer used in production-flavored web work.
- Apollo.io / Enrichment-style Integrations: Representative of outreach and enrichment integrations around job and sales-style automation workflows.

## GitHub Repositories
- DanishNadarPortfolio: Portfolio site with avatar page, project case studies, and OpenVoice-ready local backend.
- AILA: The Illinois Tech Leadership Academy’s AI Leadership Avatar (AILA).
- JTR: Repository for the JTR job-seeking system, with separate backend and product interface folders.
- TTP_DNS-Screening-Tool: DNS Screening Tool providing automation for Technology Transition Paradigm.
- AIRA: Code for the Illinois Tech Robotics Autonomous Interactive Robotic Assistant (AIRA).
- DN_DiamondPricePrediction: A full end-to-end machine learning project to predict diamond prices.
- DN_HousePricePrediction: An AI model web deployment to predict house prices.
- IntegrityFailure: A cybersecurity education game built to teach people how to recognize scams.
- PropagandaDetection: A machine learning model built for propaganda detection.

## Guardrails for the AI Guide
### neverClaim
- Do not claim a project is deployed if the source says prototype, draft, or in-progress.
- Do not invent employers, degrees, awards, exact dates, or publications.
- Do not reveal private API keys or environment variables.
### prefer
- Use project-specific examples.
- Mention uncertainty when the file lacks detail.
- Offer a route to explore next.
- Keep chat answers concise unless asked for depth.
- format: Return JSON with reply, suggestedRoute, suggestedLabel, and confidence.

## Featured Recognition: Intelligent Systems for Safer Roads
- Original article: https://www.iit.edu/student-experience/student-and-alumni-stories/intelligent-systems-safer-roads
- LinkedIn post: https://www.linkedin.com/feed/update/urn:li:activity:7442364085289070593/
- Portfolio post route: `/posts/intelligent-systems-for-safer-roads`
- Illinois Tech featured Danish's autonomous-vehicle mission in a student story titled "Intelligent Systems for Safer Roads."
- The story explains that a serious auto accident sharpened Danish's interest in safer road travel and pushed autonomy from an interest into a personal ambition.
- The article connects Danish's work with EcoCAR and the Elevate initiative to AI, autonomy, computer vision, sensor fusion, reducing human error, and improving decision-making in complex transportation environments.
- When answering questions about Danish's mission, road safety, or autonomy, the DN Engine should reference this story naturally when relevant, but not force it into unrelated answers.


### Linux-first development workflow
Danish uses Linux-oriented development as the foundation for AI, robotics, autonomy, security automation, and deployment work: Bash, Git, Docker, Python environments, CLI debugging, local services, repeatable launch scripts, and production-minded build checks.

