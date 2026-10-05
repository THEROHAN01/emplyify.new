"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <p className="font-mono text-sm font-bold text-accent">Something went wrong</p>
      <h1 className="mt-2 text-3xl font-extrabold">This page hit an error.</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
        It's on us, not you. Try again, or email hello@emplyify.com and we'll help directly.
        {error.digest && <span className="mt-2 block font-mono text-sm">Reference: {error.digest}</span>}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/" variant="secondary">
          Go to the home page
        </ButtonLink>
      </div>
    </Container>
  );
}
