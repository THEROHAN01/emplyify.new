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
    <header className="bg-navy pt-8 pb-16 text-white lg:pt-10 lg:pb-24 [&_.text-ink]:text-white [&_.text-muted]:text-white/70 [&_nav_*]:text-white/70 [&_[aria-current=page]]:text-white">
      <Container>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={aside ? "grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center" : undefined}>
          <div className="max-w-3xl">
            {eyebrow && <Eyebrow className="text-[#5fd4ff]">{eyebrow}</Eyebrow>}
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-[4.5rem]">{title}</h1>
            {intro && <div className="mt-6 max-w-2xl text-lg text-white/75">{intro}</div>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside}
        </div>
      </Container>
    </header>
  );
}
