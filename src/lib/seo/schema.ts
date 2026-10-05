/**
 * schema.org JSON-LD builders: Organization, Service, FAQPage, JobPosting,
 * BreadcrumbList, Article. Rendered via <JsonLd>.
 */
import { site } from "@/content/site";
import type { Faq, Insight, Job, Service } from "@/content/types";
import { cityName } from "@/lib/content";
import { absoluteUrl } from "./metadata";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    description: site.positioning,
    email: site.email.hello,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.office.city,
      addressRegion: site.office.region,
      addressCountry: site.office.country,
    },
    sameAs: [site.social.linkedin],
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: "Recruitment",
    description: service.summary,
    provider: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
    areaServed: { "@type": "Country", name: "India" },
    url: absoluteUrl(`/services/${service.slug}`),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function jobPostingSchema(job: Job) {
  const remote = job.city === "remote";
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `<p>${job.summary}</p><ul>${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul><p>Requirements:</p><ul>${job.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>`,
    identifier: { "@type": "PropertyValue", name: site.name, value: job.id },
    datePosted: job.postedAt,
    validThrough: `${job.validThrough}T23:59:59+05:30`,
    employmentType: job.employmentType,
    // Confidential searches list Emplyify as the hiring organisation.
    hiringOrganization: {
      "@type": "Organization",
      name: job.company.disclosed ? job.company.descriptor : `${site.name} (on behalf of a client)`,
      sameAs: absoluteUrl("/"),
    },
    ...(remote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: { "@type": "Country", name: "India" },
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: cityName(job.city),
              addressCountry: "IN",
            },
          },
        }),
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salary.minLpa * 100_000,
        maxValue: job.salary.maxLpa * 100_000,
        unitText: "YEAR",
      },
    },
    experienceRequirements: {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: job.experienceYears.min * 12,
    },
    directApply: true,
    url: absoluteUrl(`/jobs/${job.slug}`),
  };
}

export function articleSchema(insight: Insight) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.description,
    datePublished: insight.publishedAt,
    dateModified: insight.publishedAt,
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") },
    },
    mainEntityOfPage: absoluteUrl(`/insights/${insight.slug}`),
  };
}
