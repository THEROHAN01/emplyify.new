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
    <header className="bg-bg pt-8 pb-14 lg:pt-10 lg:pb-20">
      <Container>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={aside ? "grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center" : undefined}>
          <div className="max-w-3xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="text-[2.25rem] font-bold sm:text-5xl">{title}</h1>
            {intro && <div className="text-muted mt-5 max-w-2xl text-lg">{intro}</div>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside}
        </div>
      </Container>
    </header>
  );
}
