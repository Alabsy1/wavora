import { Button } from "@/components/button";

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center bg-section px-6 text-center text-section-fg">
      <p className="eyebrow justify-center text-section-fg/60">404</p>
      <h1 className="display-lg mt-5 text-section-fg">
        LOST AT SEA.
      </h1>
      <p className="mt-5 max-w-md text-pretty text-section-fg/60">
        This page drifted off with the current. Let&apos;s get you back to the
        good stuff.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="light" size="lg">
          Back to WAVORA
        </Button>
        <Button href="/explore" variant="outline-light" size="lg">
          Explore experiences
        </Button>
      </div>
    </section>
  );
}