import type { City } from "./types";

export const cities: City[] = [
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    salaryIndex: 0.95,
    gccClusters: [
      { name: "Hinjewadi", note: "Rajiv Gandhi Infotech Park; the largest concentration of engineering centres and automotive software teams." },
      { name: "Kharadi", note: "EON IT Park and World Trade Center; banking, financial services and product GCCs." },
      { name: "Baner and Balewadi", note: "Growing base of product companies and mid-size GCCs close to Hinjewadi." },
      { name: "Magarpatta and Hadapsar", note: "Established IT campuses with a deep mid-level talent pool." },
    ],
    talentSupply:
      "Pune has a deep pool of automotive, embedded and enterprise software engineers, and a fast-growing data and AI community. Senior AI/ML talent is scarcer than in Bengaluru, so plan budgets and timelines accordingly.",
    noticePeriodNorm:
      "Most mid and senior engineers serve 60–90 days' notice. Service-company engineers commonly have 90 days; product-company engineers more often 30–60.",
    hiringNotes: [
      "Embedded and automotive software is a Pune strength — expect stronger supply than in other cities.",
      "Hybrid policies matter: commutes across Hinjewadi and Kharadi are long, and candidates ask about office days early.",
      "Counter-offers are common for senior engineers; we prepare candidates for them before the offer.",
    ],
    gccIntro:
      "Pune combines lower cost than Bengaluru with strong engineering depth, particularly in automotive, manufacturing technology, BFSI and enterprise software.",
    faqs: [
      {
        q: "Is Pune a good location for a new GCC?",
        a: "For automotive, embedded, enterprise software and BFSI technology, yes: talent depth is strong and costs are typically lower than in Bengaluru. For large senior AI teams, consider a hybrid plan with remote hires.",
      },
      {
        q: "Which part of Pune should we choose for our office?",
        a: "Hinjewadi has the deepest engineering pool; Kharadi suits BFSI and teams that recruit from the eastern suburbs. Commute time affects offer acceptance, so we share candidate home-location data during the market map.",
      },
    ],
  },
  {
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    salaryIndex: 1.08,
    gccClusters: [
      { name: "Outer Ring Road", note: "The densest corridor of product companies and large GCCs." },
      { name: "Whitefield", note: "ITPL and surrounding campuses; large enterprise and semiconductor teams." },
      { name: "Electronic City", note: "Established IT campuses and hardware-adjacent engineering teams." },
      { name: "Manyata and Hebbal", note: "Large tech parks hosting global GCCs in north Bengaluru." },
    ],
    talentSupply:
      "Bengaluru has India's largest pool of product engineers, AI/ML specialists and engineering leaders — and the most competition for them. Expect higher salaries and more counter-offers.",
    noticePeriodNorm:
      "Product-company engineers often have 30–60 days' notice; large GCCs and service companies 60–90 days.",
    hiringNotes: [
      "Competition for senior AI/ML and platform engineers is intense; speed of process often decides outcomes.",
      "Candidates compare equity and remote flexibility closely; be ready to explain both.",
      "Commute between north and south Bengaluru affects acceptance; note office location in the brief.",
    ],
    gccIntro:
      "Bengaluru is the default choice for product-heavy GCCs and AI teams, with the deepest senior talent pool in India and the highest cost.",
    faqs: [
      {
        q: "Is Bengaluru too competitive for a new GCC?",
        a: "It is the most competitive market, but also the only one with the senior depth some teams need. A clear employer story and a fast interview loop matter more here than anywhere else.",
      },
      {
        q: "How much more do Bengaluru salaries cost?",
        a: "Our indicative bands run several percent above Pune and Hyderabad for most roles, more for senior AI/ML. The Talent Index publishes the current figures.",
      },
    ],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    salaryIndex: 1.0,
    gccClusters: [
      { name: "HITEC City and Madhapur", note: "The original tech hub with large GCC and product campuses." },
      { name: "Gachibowli", note: "Major GCC campuses and a strong data and cloud talent base." },
      { name: "Financial District", note: "Newer large-format campuses favoured by expanding GCCs." },
      { name: "Kokapet", note: "Emerging corridor attracting new GCC investments." },
    ],
    talentSupply:
      "Hyderabad has a large and growing pool of cloud, data and enterprise engineers, driven by major GCC expansions. Many new GCCs in India choose it for cost and infrastructure.",
    noticePeriodNorm:
      "60–90 days is typical for mid and senior engineers, with 90 days common at large GCCs.",
    hiringNotes: [
      "Cloud and data engineering supply is strong because of the concentration of large GCCs.",
      "Many candidates are moving between GCCs; career growth and scope win more often than pay alone.",
      "Relocation from other cities is common for senior roles; we include relocation intent in dossiers.",
    ],
    gccIntro:
      "Hyderabad offers strong cloud, data and enterprise engineering supply, modern office infrastructure and competitive costs — a frequent choice for new GCCs.",
    faqs: [
      {
        q: "Why are so many GCCs choosing Hyderabad?",
        a: "A combination of talent supply in cloud and data, modern office infrastructure and costs below Bengaluru. Competition is rising, so employer brand matters more each year.",
      },
      {
        q: "Can we hire senior leaders in Hyderabad?",
        a: "Yes, though for some leadership roles we widen the search to include relocation from Bengaluru and Pune.",
      },
    ],
  },
];
