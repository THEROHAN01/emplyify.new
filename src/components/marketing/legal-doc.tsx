import { Container } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import type { LegalDoc } from "@/content/types";
import { LEGAL_REVIEWED } from "@/content/legal";
import { formatLongDate } from "@/lib/utils/format";

export function LegalDocView({
  doc,
  breadcrumbs,
}: {
  doc: LegalDoc;
  breadcrumbs: { name: string; path: string }[];
}) {
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} title={doc.title} intro={doc.description} />
      <Container className="py-12">
        <div className="max-w-3xl">
          <p className="text-muted text-sm">Last updated {formatLongDate(doc.updatedAt)}</p>
          {!LEGAL_REVIEWED && (
            <p
              className="border-line bg-warn-bg text-warn mt-4 rounded-lg border px-4 py-3 text-sm"
              data-print-hide
            >
              Draft for legal review. The final version may change before launch.
            </p>
          )}
          <div className="prose-body mt-8">
            {doc.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
