import type { Insight } from "./types";

export const insights: Insight[] = [
  {
    slug: "india-gcc-tech-talent-index",
    status: "published",
    kind: "Talent Index",
    title: "India GCC Tech Talent Index",
    description:
      "Quarterly data on salaries, talent availability and notice periods for AI/ML, data, cloud, full-stack and embedded roles in Pune, Bengaluru and Hyderabad — built from Emplyify pipeline data.",
    publishedAt: "2026-10-05",
    gated: true,
    release: "upcoming",
    releaseLabel: "First edition: Q1 2027",
    readingMinutes: 4,
    body: [
      {
        heading: "What the Index will cover",
        paragraphs: [
          "Every quarter we will publish salary ranges by role family, city and seniority; the share of screened candidates open to a move; median notice periods; and offer-acceptance rates.",
          "The data comes from our own pipeline — briefs, screens, offers and joins — aggregated and anonymised. We will publish sample sizes for every figure and leave out any cut with too few data points to be reliable.",
        ],
      },
      {
        heading: "Why we are waiting to publish",
        paragraphs: [
          "We will not publish numbers we cannot stand behind. The first edition ships once we have a full quarter of pipeline data across all three cities.",
          "Sign up below and we will email you the PDF on release day, along with a short summary of what changed.",
        ],
      },
    ],
    takeaways: [
      "Salary bands by role, city and seniority",
      "Talent availability and open-to-move rates",
      "Notice-period norms and buy-out frequency",
      "Offer-acceptance and counter-offer trends",
    ],
  },
  {
    slug: "how-to-interview-ml-engineers",
    status: "published",
    kind: "Hiring guide",
    title: "How to interview machine learning engineers",
    description:
      "A practical interview loop for ML and LLM engineers: what to test in each round, questions that separate production experience from notebook experience, and red flags.",
    publishedAt: "2026-10-05",
    gated: false,
    release: "available",
    readingMinutes: 7,
    body: [
      {
        heading: "Start from the job, not the title",
        paragraphs: [
          "“ML engineer” covers research-leaning modelling roles, production ML platform roles and LLM application roles. Each needs a different loop. Write down which one you are hiring for and the two or three problems the person will own in their first six months.",
          "If you cannot name those problems, you are not ready to interview. Candidates notice, and the best ones drop out.",
        ],
      },
      {
        heading: "Round 1: a production deep-dive (60 minutes)",
        paragraphs: [
          "Ask the candidate to walk through one model or system they shipped. Spend the hour going deeper, not wider: how was the data collected, how was it evaluated, what happened after launch, what broke, and what would they do differently.",
          "Strong candidates talk about evaluation and failure without being prompted. Weaker candidates stay at the level of architectures and libraries.",
        ],
      },
      {
        heading: "Round 2: a practical exercise (60–90 minutes)",
        paragraphs: [
          "Use a realistic, bounded problem: design an evaluation set for a retrieval system, debug a training run with a data leak, or review a pull request that adds a feature to a model service. Avoid multi-day take-homes; they filter out people with jobs and families, not weak engineers.",
        ],
      },
      {
        heading: "Round 3: hiring manager and team fit (45 minutes)",
        paragraphs: [
          "Focus on ownership and communication. Ask about a time they disagreed with a product or research decision and what they did. Ask how they explain model behaviour to non-ML stakeholders.",
        ],
      },
      {
        heading: "Red flags",
        paragraphs: [
          "Cannot explain how they knew a model was working in production. Talks only about accuracy, never about the cost of errors. Has never looked at the raw data. Treats an LLM as the answer to every problem.",
        ],
      },
    ],
    takeaways: [
      "Define which kind of ML engineer you need before you interview",
      "Go deep on one shipped system rather than wide on theory",
      "Keep practical exercises under two hours",
      "Evaluation discipline is the strongest signal of seniority",
    ],
  },
  {
    slug: "notice-periods-in-india",
    status: "published",
    kind: "Hiring guide",
    title: "Hiring around 60–90 day notice periods in India",
    description:
      "Why notice periods are long in Indian tech, how they cause offer dropouts, and the practical steps that keep candidates engaged until joining day.",
    publishedAt: "2026-10-05",
    gated: false,
    release: "available",
    readingMinutes: 5,
    body: [
      {
        heading: "Why notice periods matter more than you think",
        paragraphs: [
          "Many mid and senior engineers in India serve 60–90 days' notice. That gap between offer and joining is where most hires are lost — to counter-offers, competing offers or a change of heart.",
        ],
      },
      {
        heading: "Before the offer",
        paragraphs: [
          "Ask about notice period, buy-out options and other processes on the first call. Build a hiring plan that starts roles early enough to absorb the notice period. For urgent roles, prioritise candidates already serving notice.",
        ],
      },
      {
        heading: "During the notice period",
        paragraphs: [
          "Keep in touch every one to two weeks: a call with the future manager, an invitation to a team event, early access to onboarding material. Make the new team feel real.",
          "Prepare the candidate for a counter-offer before they resign. Ask what would make them stay, and whether money alone would change their decision.",
        ],
      },
    ],
    takeaways: [
      "Collect notice period and buy-out data on the first call",
      "Start senior searches early enough to absorb 90 days",
      "Stay in touch every one to two weeks until joining",
      "Prepare candidates for counter-offers before they resign",
    ],
  },
];
