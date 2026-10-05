import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { whatsappUrl } from "@/lib/utils/contact";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Emplyify: submit a role, book a hiring call, WhatsApp or email. Office in Pune; replies within 4 business hours.",
  path: "/contact",
});

export default function ContactPage() {
  const wa = whatsappUrl("Hi Emplyify!");
  return (
    <>
      <PageHeader
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title="Talk to a person"
        intro={`We reply within ${site.promises.replyBusinessHours} business hours (${site.office.hours}).`}
      />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <h2 className="mb-6 text-xl font-bold">Send a message</h2>
          <ContactForm />
        </Card>
        <aside className="space-y-4">
          <Card>
            <h2 className="font-bold">Hiring?</h2>
            <p className="text-muted mt-2">The fastest route is a two-minute brief.</p>
            <div className="mt-3 flex flex-col gap-2">
              <Link href="/submit-a-role" className="text-accent font-semibold hover:underline">
                Submit a role →
              </Link>
              <Link href="/book-a-call" className="text-accent font-semibold hover:underline">
                Book a hiring call →
              </Link>
            </div>
          </Card>
          <Card>
            <h2 className="font-bold">Direct</h2>
            <ul className="text-muted mt-2 space-y-2">
              <li>
                Employers:{" "}
                <a className="text-accent underline" href={`mailto:${site.email.hello}`}>
                  {site.email.hello}
                </a>
              </li>
              <li>
                Candidates:{" "}
                <a className="text-accent underline" href={`mailto:${site.email.candidates}`}>
                  {site.email.candidates}
                </a>
              </li>
              <li>
                Privacy:{" "}
                <a className="text-accent underline" href={`mailto:${site.email.privacy}`}>
                  {site.email.privacy}
                </a>
              </li>
              {wa && (
                <li>
                  <a
                    className="text-accent underline"
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp us
                  </a>
                </li>
              )}
            </ul>
          </Card>
          <Card>
            <h2 className="font-bold">Office</h2>
            <address className="text-muted mt-2 not-italic">
              {site.legalName}
              <br />
              {site.office.city}, {site.office.region}, India
            </address>
          </Card>
        </aside>
      </Container>
    </>
  );
}
