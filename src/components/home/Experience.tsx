
import Link from "next/link";
import {
  experience,
  typeLabel,
  type ExperienceEntry,
} from "@/lib/experience";
import Reveal from "@/components/shared/Reveal";

function TechTags({
  stack,
}: {
  stack?: readonly string[];
}) {
  if (!stack?.length) return null;

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {stack.map((tech) => (
        <span
          key={tech}
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium text-paper-dim transition-colors hover:border-signal/40 hover:text-paper"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function Card({
  item,
}: {
  item: ExperienceEntry;
}) {
  return (
    <div>
      {/* Period and category */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-signal">
          {item.period}
        </span>

        <span className="text-paper-dim/40">·</span>

        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-paper-dim">
          {typeLabel[item.type]}
        </span>
      </div>

      {/* Role */}
      <h3 className="font-display text-xl font-semibold tracking-tight text-paper sm:text-2xl">
        {item.role}
      </h3>

      {/* Organization */}
      <p className="mt-2 text-sm font-medium text-signal/90">
        {item.org}
      </p>

      {/* Description */}
      <p className="mt-4 text-sm leading-7 text-paper-dim">
        {item.summary}
      </p>

      {/* Highlights */}
      {item.highlights && item.highlights.length > 0 && (
        <div className="mt-5">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/70">
            Key Contributions
          </p>

          <ul className="space-y-3">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-sm leading-6 text-paper-dim"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Technologies */}
      {item.stack && item.stack.length > 0 && (
        <div className="mt-5 border-t border-white/[0.07] pt-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/70">
            Technologies & Tools
          </p>

          <TechTags stack={item.stack} />
        </div>
      )}
    </div>
  );
}

export default function Experience({
  compact = false,
}: {
  compact?: boolean;
}) {
  // The source data is arranged oldest to newest.
  // Reverse it for the timeline so the latest experience appears first.
  const orderedExperience = [...experience].reverse();

  // Keep the homepage focused on the three latest development entries.
  const entries = compact
    ? orderedExperience
        .filter(
          (item) =>
            item.id === "laef-fullstack-developer" ||
            item.id === "gbemileke-tradomedical" ||
            item.id === "dmg-clothing"
        )
        .slice(0, 3)
    : orderedExperience;

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-5xl px-6 py-24"
    >
      {/* Section Heading */}
      <Reveal>
        <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-signal">
              My Journey
            </p>

            <h2 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              My Professional Journey
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-paper-dim">
              A look at my experience, learning journey, projects, and
              contributions as I continue growing in technology.
            </p>
          </div>

          {compact && (
            <Link
              href="/about#experience"
              className="w-fit text-xs font-medium text-signal transition-colors hover:text-paper link-underline"
            >
              View full experience →
            </Link>
          )}
        </div>
      </Reveal>

      {/* Timeline */}
      <ol className="relative space-y-12 sm:space-y-16">
        {/* Timeline line */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[5px] top-0 w-px bg-gradient-to-b from-transparent via-signal/30 to-transparent sm:left-1/2 sm:-translate-x-1/2"
        />

        {entries.map((item, index) => {
          const isRight = index % 2 === 1;

          return (
            <li
              key={item.id}
              className="relative"
            >
              {/* Timeline marker */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-7 z-20 flex h-3 w-3 items-center justify-center rounded-full border border-signal bg-ink shadow-[0_0_12px_rgba(59,158,255,0.4)] sm:left-1/2 sm:-translate-x-1/2"
              >
                <span className="h-1 w-1 rounded-full bg-signal" />
              </div>

              <Reveal
                direction={isRight ? "right" : "left"}
                delay={((index % 5) + 1) as 1 | 2 | 3 | 4 | 5}
              >
                <div className="pl-8 sm:grid sm:grid-cols-2 sm:gap-16 sm:pl-0">
                  {isRight ? (
                    <>
                      <div className="hidden sm:block" />

                      <div className="relative z-10 sm:pl-8">
                        <div className="glass-card rounded-2xl p-5 transition-all duration-300 hover:border-signal/30 sm:p-7">
                          <Card item={item} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative z-10 sm:pr-8">
                        <div className="glass-card rounded-2xl p-5 transition-all duration-300 hover:border-signal/30 sm:p-7">
                          <Card item={item} />
                        </div>
                      </div>

                      <div className="hidden sm:block" />
                    </>
                  )}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      {/* Bottom link */}
      {compact && (
        <Reveal>
          <div className="mt-12 border-t border-white/[0.07] pt-8 text-center">
            <Link
              href="/about#experience"
              className="inline-flex items-center gap-2 text-sm font-medium text-signal transition-colors hover:text-paper"
            >
              Explore my complete journey
              <span>→</span>
            </Link>
          </div>
        </Reveal>
      )}
    </section>
  );
}
