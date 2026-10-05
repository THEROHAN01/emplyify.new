import type { RoleFamilySlug, RolePage } from "./types";

export const roleFamilies: { slug: RoleFamilySlug; name: string; blurb: string }[] = [
  { slug: "ai-ml", name: "AI / ML", blurb: "ML, LLM and applied-AI engineers who ship models to production." },
  { slug: "data", name: "Data", blurb: "Data engineers, analytics engineers and platform builders." },
  { slug: "cloud-devops", name: "Cloud / DevOps", blurb: "Platform, SRE and DevOps engineers for AWS, Azure and GCP." },
  { slug: "full-stack", name: "Full-stack", blurb: "Product engineers across React, Node, Java and Python." },
  { slug: "embedded", name: "Embedded / Automotive", blurb: "Firmware, AUTOSAR and embedded Linux engineers." },
  { slug: "product", name: "Product", blurb: "Product managers for technical and platform products." },
];

const interviewLoopEngineering = [
  { stage: "Recruiter screen", duration: "30 min", focus: "Motivation, notice period, CTC, must-have skills" },
  { stage: "Technical deep-dive", duration: "60 min", focus: "Past systems, trade-offs, depth on core skills" },
  { stage: "Practical exercise", duration: "60–90 min", focus: "Live problem or take-home review, never unpaid multi-day work" },
  { stage: "Hiring manager", duration: "45 min", focus: "Team fit, ownership, communication" },
];

export const roles: RolePage[] = [
  {
    slug: "machine-learning-engineers",
    family: "ai-ml",
    title: "Machine learning engineers",
    singular: "Machine Learning Engineer",
    shortDescription: "ML and LLM engineers who have taken models from notebook to production.",
    intro:
      "Good ML engineers are rare because the job is two jobs: modelling and production engineering. We screen for both — evidence of shipped models, not just Kaggle ranks.",
    skillsWeVet: [
      { name: "Python and ML frameworks", how: "Walk-through of a model they trained and deployed, including data and evaluation choices" },
      { name: "LLM application engineering", how: "Retrieval, evaluation and cost trade-offs on a real project" },
      { name: "MLOps", how: "How they versioned data and models, monitored drift and rolled back" },
      { name: "Evaluation discipline", how: "Offline vs online metrics, and a time a metric misled them" },
      { name: "Software engineering", how: "Code review of a past PR or a short live exercise" },
    ],
    typicalTimeToHireDays: { min: 21, max: 40 },
    availability: "scarce",
    interviewLoop: interviewLoopEngineering,
    screeningQuestions: [
      "Describe a model you shipped. How did you know it was working in production?",
      "When did you choose not to use an LLM, and why?",
      "How did you build an evaluation set for a retrieval or generation system?",
      "What broke after deployment, and how did you find out?",
    ],
    salaryBands: [
      { seniority: "junior", years: "1–3 yrs", minLpa: 10, maxLpa: 20 },
      { seniority: "mid", years: "3–6 yrs", minLpa: 20, maxLpa: 38 },
      { seniority: "senior", years: "6–10 yrs", minLpa: 36, maxLpa: 65 },
      { seniority: "lead", years: "10+ yrs", minLpa: 60, maxLpa: 95 },
    ],
    faqs: [
      {
        q: "Can you find engineers with production LLM experience?",
        a: "Yes, but the pool is small and moves fast. We screen for retrieval, evaluation and cost control on real projects, not prompt demos, and we say upfront if your budget is below market.",
      },
      {
        q: "Do you test candidates on ML theory?",
        a: "Only as far as the role needs it. Our screen focuses on production decisions; your team can go deeper on theory in the technical round.",
      },
    ],
    keywords: ["hire machine learning engineers", "ML engineer recruitment India", "hire LLM engineers"],
  },
  {
    slug: "data-engineers",
    family: "data",
    title: "Data engineers",
    singular: "Data Engineer",
    shortDescription: "Engineers who build reliable pipelines, lakehouses and data platforms.",
    intro:
      "Data engineering hires fail when pipelines look fine in a demo and fall over at scale. We screen for ownership of production pipelines, data quality and cost.",
    skillsWeVet: [
      { name: "SQL and data modelling", how: "A modelling exercise on a realistic schema" },
      { name: "Spark / distributed processing", how: "Discussion of partitioning, skew and job tuning they have done" },
      { name: "Orchestration", how: "Airflow, Dagster or similar: how they handled retries and backfills" },
      { name: "Cloud data platforms", how: "Hands-on depth in Databricks, Snowflake, BigQuery or Redshift" },
      { name: "Data quality", how: "Tests, contracts and incident handling for bad data" },
    ],
    typicalTimeToHireDays: { min: 18, max: 35 },
    availability: "moderate",
    interviewLoop: interviewLoopEngineering,
    screeningQuestions: [
      "Walk us through the largest pipeline you owned. What failed most often?",
      "How did you handle a late-arriving or corrupt data incident?",
      "How did you reduce the cost of a data platform?",
      "Batch or streaming for this use case — and why?",
    ],
    salaryBands: [
      { seniority: "junior", years: "1–3 yrs", minLpa: 8, maxLpa: 16 },
      { seniority: "mid", years: "3–6 yrs", minLpa: 16, maxLpa: 30 },
      { seniority: "senior", years: "6–10 yrs", minLpa: 28, maxLpa: 50 },
      { seniority: "lead", years: "10+ yrs", minLpa: 45, maxLpa: 75 },
    ],
    faqs: [
      {
        q: "Do you hire analytics engineers as well?",
        a: "Yes. Tell us in the brief whether the role sits closer to dbt and the warehouse or to Spark and platform work; the screen is different.",
      },
      {
        q: "Can you hire for a specific platform such as Databricks?",
        a: "Yes. We mark platform depth as a must-have and evidence it on every dossier.",
      },
    ],
    keywords: ["hire data engineers", "data engineer recruitment agency", "hire Spark developers India"],
  },
  {
    slug: "devops-engineers",
    family: "cloud-devops",
    title: "DevOps and platform engineers",
    singular: "DevOps / Platform Engineer",
    shortDescription: "SRE, DevOps and platform engineers who keep systems fast, safe and cheap.",
    intro:
      "We look for engineers who have been on call for what they built. Infrastructure as code, observability and incident ownership matter more than a list of tools.",
    skillsWeVet: [
      { name: "Kubernetes", how: "Production cluster operations: upgrades, scaling and a real incident" },
      { name: "Infrastructure as code", how: "Terraform or Pulumi module design and state management" },
      { name: "CI/CD", how: "Pipelines they built and how they cut build or deploy times" },
      { name: "Observability", how: "Metrics, logs, traces and how alerts were tuned" },
      { name: "Cloud cost and security", how: "Concrete savings or hardening they delivered" },
    ],
    typicalTimeToHireDays: { min: 18, max: 35 },
    availability: "moderate",
    interviewLoop: interviewLoopEngineering,
    screeningQuestions: [
      "Describe the worst production incident you handled end to end.",
      "How have you structured Terraform across many environments?",
      "What did you change to make deployments safer?",
      "Where did you save the most cloud cost, and how did you measure it?",
    ],
    salaryBands: [
      { seniority: "junior", years: "1–3 yrs", minLpa: 7, maxLpa: 14 },
      { seniority: "mid", years: "3–6 yrs", minLpa: 14, maxLpa: 28 },
      { seniority: "senior", years: "6–10 yrs", minLpa: 26, maxLpa: 48 },
      { seniority: "lead", years: "10+ yrs", minLpa: 42, maxLpa: 70 },
    ],
    faqs: [
      {
        q: "Do you cover SRE roles with on-call?",
        a: "Yes. We confirm on-call expectations and compensation on the first call so there are no surprises at offer stage.",
      },
      {
        q: "Which clouds do you hire for?",
        a: "AWS, Azure and GCP. We note certifications but weight hands-on production experience more heavily.",
      },
    ],
    keywords: ["hire DevOps engineers", "SRE recruitment India", "hire platform engineers"],
  },
  {
    slug: "full-stack-developers",
    family: "full-stack",
    title: "Full-stack developers",
    singular: "Full-stack Developer",
    shortDescription: "Product engineers across React, Node.js, Java, Go and Python.",
    intro:
      "Full-stack is a broad label. We pin down the real stack and the product stage in your brief, then screen for engineers who have shipped features end to end.",
    skillsWeVet: [
      { name: "Frontend (React / Next.js)", how: "Component design, state and performance on a real feature" },
      { name: "Backend (Node, Java, Go or Python)", how: "API design, data modelling and error handling" },
      { name: "Databases", how: "Schema choices, indexing and a slow-query story" },
      { name: "Testing and delivery", how: "How they test, review and release" },
      { name: "Product sense", how: "A feature they shaped, not just built" },
    ],
    typicalTimeToHireDays: { min: 14, max: 30 },
    availability: "high",
    interviewLoop: interviewLoopEngineering,
    screeningQuestions: [
      "Walk us through a feature you owned from design to release.",
      "How did you debug a performance problem in the browser or the API?",
      "What would you change about the last codebase you worked in?",
      "How do you decide what to test?",
    ],
    salaryBands: [
      { seniority: "junior", years: "1–3 yrs", minLpa: 6, maxLpa: 14 },
      { seniority: "mid", years: "3–6 yrs", minLpa: 14, maxLpa: 28 },
      { seniority: "senior", years: "6–10 yrs", minLpa: 26, maxLpa: 45 },
      { seniority: "lead", years: "10+ yrs", minLpa: 40, maxLpa: 65 },
    ],
    faqs: [
      {
        q: "Can you hire for a specific stack such as MERN or Java + React?",
        a: "Yes. Name the stack in your brief and mark which parts are must-haves; we evidence each on the dossier.",
      },
      {
        q: "Do you hire frontend-only or backend-only engineers too?",
        a: "Yes. Use the same brief form and choose the closest role title; the screen adapts.",
      },
    ],
    keywords: ["hire full stack developers", "hire React developers", "hire Node.js developers India"],
  },
  {
    slug: "embedded-engineers",
    family: "embedded",
    title: "Embedded and automotive engineers",
    singular: "Embedded Software Engineer",
    shortDescription: "Firmware, embedded Linux, AUTOSAR and automotive software engineers.",
    intro:
      "Pune is one of India's largest automotive software hubs. We screen embedded engineers on hardware-close debugging, safety processes and domain depth.",
    skillsWeVet: [
      { name: "Embedded C / C++", how: "Memory, concurrency and real-time constraints in past projects" },
      { name: "AUTOSAR / automotive stacks", how: "Classic or Adaptive AUTOSAR depth, toolchains used" },
      { name: "Embedded Linux / RTOS", how: "Drivers, BSPs and boot-time or footprint work" },
      { name: "Protocols", how: "CAN, LIN, Ethernet, SPI, I2C debugging experience" },
      { name: "Functional safety", how: "ISO 26262 or ASPICE exposure and artefacts produced" },
    ],
    typicalTimeToHireDays: { min: 21, max: 45 },
    availability: "scarce",
    interviewLoop: interviewLoopEngineering,
    screeningQuestions: [
      "Describe a hardware-software bug you tracked down. What tools did you use?",
      "Which AUTOSAR layers have you worked in, and with which toolchain?",
      "How have you worked within ISO 26262 or ASPICE processes?",
      "How did you handle a timing or memory constraint?",
    ],
    salaryBands: [
      { seniority: "junior", years: "1–3 yrs", minLpa: 5, maxLpa: 10 },
      { seniority: "mid", years: "3–6 yrs", minLpa: 10, maxLpa: 22 },
      { seniority: "senior", years: "6–10 yrs", minLpa: 20, maxLpa: 38 },
      { seniority: "lead", years: "10+ yrs", minLpa: 35, maxLpa: 60 },
    ],
    faqs: [
      {
        q: "Do you hire for automotive OEMs and tier-1 suppliers?",
        a: "Yes, as well as GCCs building software-defined-vehicle teams. We screen domain depth separately from general embedded skills.",
      },
      {
        q: "Are safety certifications a must?",
        a: "Only if you mark them as must-have. Many strong engineers have worked inside ISO 26262 processes without a personal certification.",
      },
    ],
    keywords: ["hire embedded engineers", "AUTOSAR jobs Pune", "automotive software recruitment"],
  },
  {
    slug: "product-managers",
    family: "product",
    title: "Product managers",
    singular: "Product Manager",
    shortDescription: "Technical and platform product managers who work well with engineers.",
    intro:
      "We hire product managers who can write a sharp spec, say no with evidence and earn engineers' trust. We screen on shipped outcomes, not frameworks.",
    skillsWeVet: [
      { name: "Discovery", how: "How they validated a problem before building" },
      { name: "Prioritisation", how: "A roadmap trade-off and how they defended it" },
      { name: "Technical fluency", how: "Depth appropriate to the product: APIs, data or platform" },
      { name: "Metrics", how: "A metric they moved and how they knew it was causal" },
      { name: "Communication", how: "Written spec sample or a live walk-through" },
    ],
    typicalTimeToHireDays: { min: 21, max: 40 },
    availability: "moderate",
    interviewLoop: [
      { stage: "Recruiter screen", duration: "30 min", focus: "Motivation, notice period, CTC, product domain" },
      { stage: "Product sense", duration: "60 min", focus: "A product they shipped, discovery and trade-offs" },
      { stage: "Case or spec review", duration: "60 min", focus: "Structured problem or review of a written spec" },
      { stage: "Engineering + leadership", duration: "45 min each", focus: "Collaboration with engineers and stakeholders" },
    ],
    screeningQuestions: [
      "Tell us about a feature you killed. How did you decide?",
      "Which metric did you own, and what moved it?",
      "How do you work with engineers on estimates and scope?",
      "Show us a spec you are proud of (redacted).",
    ],
    salaryBands: [
      { seniority: "junior", years: "2–4 yrs", minLpa: 12, maxLpa: 22 },
      { seniority: "mid", years: "4–7 yrs", minLpa: 22, maxLpa: 40 },
      { seniority: "senior", years: "7–10 yrs", minLpa: 38, maxLpa: 65 },
      { seniority: "lead", years: "10+ yrs", minLpa: 60, maxLpa: 95 },
    ],
    faqs: [
      {
        q: "Do you hire PMs without an engineering background?",
        a: "Yes, if the role allows it. We screen technical fluency to the level your product needs and say so on the dossier.",
      },
      {
        q: "Can you hire product owners for GCCs?",
        a: "Yes. GCC product roles often sit closer to delivery; we calibrate on that in the brief.",
      },
    ],
    keywords: ["hire product managers India", "technical product manager recruitment"],
  },
];
