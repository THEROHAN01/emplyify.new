import type { ReactNode } from "react";
import { Container, Eyebrow } from "./layout";
import { Breadcrumbs } from "./breadcrumbs";

export function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  actions,
  aside,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  breadcrumbs?: { name: string; path: string }[];
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="border-b border-line bg-surface pb-12 pt-8 lg:pb-16 lg:pt-10">
      <Container>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={aside ? "grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center" : undefined}>
          <div className="max-w-3xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
            {intro && <div className="mt-4 text-lg text-muted">{intro}</div>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside}
        </div>
      </Container>
    </header>
  );
}
