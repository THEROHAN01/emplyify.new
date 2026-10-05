import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-accent text-sm font-bold">404</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">We couldn't find that page.</h1>
      <p className="text-muted mx-auto mt-4 max-w-xl text-lg">
        The link may be old or the role may have closed. Here are the most useful places to go next.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/submit-a-role">Submit a role</ButtonLink>
        <ButtonLink href="/jobs" variant="secondary">
          Browse roles
        </ButtonLink>
      </div>
      <p className="text-muted mt-8 text-sm">
        Or see the full{" "}
        <Link href="/site-map" className="text-accent underline">
          sitemap
        </Link>
        .
      </p>
    </Container>
  );
}
