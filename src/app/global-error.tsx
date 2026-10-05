"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1rem", textAlign: "center", background: "#fafaf7", color: "#111418" }}>
        <h1>Emplyify is having trouble loading.</h1>
        <p>Please try again in a moment, or email hello@emplyify.com.</p>
        <button onClick={reset} style={{ minHeight: 44, padding: "0 1.5rem", marginTop: 16, borderRadius: 8, border: 0, background: "#2f5bff", color: "#fff", fontWeight: 600 }}>
          Try again
        </button>
      </body>
    </html>
  );
}
