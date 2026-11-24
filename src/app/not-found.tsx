import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center overflow-hidden px-6 py-20">
      {/* Decorative background grid / vertical lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <div className="mx-auto w-full max-w-2xl">
        <p className="font-mono text-xs tracking-widest uppercase opacity-60">
          404 — Route Not Found
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          This page does not exist.
        </h1>

        <p className="mt-4 text-sm leading-relaxed opacity-80 sm:text-base">
          The link you followed may be broken, outdated, or moved. Head back to
          the portfolio or browse projects directly.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="rounded-md bg-paper px-4 py-2.5 font-mono text-xs font-medium text-ink transition-opacity hover:opacity-90"
          >
            Back to Home
          </Link>

          <Link
            href="/projects"
            className="rounded-md border border-white/15 px-4 py-2.5 font-mono text-xs font-medium text-paper transition-colors hover:border-white/35 hover:bg-white/5"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}