import { LegalDocView } from "@/components/marketing/legal-doc";
import { responsibleAi } from "@/content/legal";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: responsibleAi.title,
  description: responsibleAi.description,
  path: "/about/responsible-ai",
});

export default function ResponsibleAiPage() {
  return (
    <LegalDocView
      doc={responsibleAi}
      breadcrumbs={[
        { name: "About", path: "/about" },
        { name: "Responsible AI", path: "/about/responsible-ai" },
      ]}
    />
  );
}
