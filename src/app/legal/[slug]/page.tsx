import { notFound } from "next/navigation";
import { LegalDocView } from "@/components/marketing/legal-doc";
import { getLegalDoc, getLegalDocs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLegalDocs().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/legal/[slug]">) {
  const { slug } = await props.params;
  const d = getLegalDoc(slug);
  return d
    ? buildMetadata({ title: d.title, description: d.description, path: `/legal/${d.slug}` })
    : {};
}

export default async function LegalPage(props: PageProps<"/legal/[slug]">) {
  const { slug } = await props.params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();
  return <LegalDocView doc={doc} breadcrumbs={[{ name: doc.title, path: `/legal/${doc.slug}` }]} />;
}
