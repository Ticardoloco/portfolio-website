
import Image from "next/image";
import { site } from "@/lib/site";
import BackgroundGrid from "../shared/BackgroundGrid";
import Link from "next/link";

const stack = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Mongoose",
  "Firebase",
  "JWT",
  "Cloudinary",
  "Swagger",
  "Git & GitHub",
];

export default function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100vh-52px)] overflow-hidden">
      <BackgroundGrid />

      {/* Background lighting */}
      <div className="pointer-events-none absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-28 top-32 h-80 w-80 rounded-full bg-sky-500/5 blur-[90px]" />

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">

        {/* Main Content */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">

          {/* Text Content */}
          <div className="max-w-3xl">

            <div className="mb-6 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-soft-pulse rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>

              <p className="font-mono text-sm font-medium tracking-wide text-signal">
                {site.role} · {site.location}
              </p>
            </div>

            <h1 className="glow-text text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Hi, I&apos;m {site.name}.
            </h1>

            <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-paper-dim sm:text-xl">
              {site.tagline}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-paper-dim/80 sm:text-base">
              I enjoy building web applications that solve real problems.
              My work spans frontend development, backend APIs, database
              integration, and turning ideas into functional digital products.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                GitHub
              </a>

              <Link href="/projects" className="btn-secondary">
                View Projects
              </Link>

              <a
                href="/Resume.pdf"
                download="Egbeleke_Taiwo_Resume.pdf"
                className="btn-secondary"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Simple Profile Image */}
          <div className="relative mx-auto w-full max-w-[300px] lg:max-w-[340px]">

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <Image
                src="/profile.png"
                alt="Egbeleke Taiwo"
                fill
                priority
                sizes="(max-width: 1024px) 300px, 340px"
                className="object-cover object-center"
              />
            </div>

            {/* Availability */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <span className="font-mono text-xs text-paper-dim">
                Open to opportunities
              </span>
            </div>

          </div>
        </div>

        {/* Focus and Technologies */}
        <div className="mt-24 grid gap-8 border-t border-white/8 pt-8 sm:grid-cols-[1fr_1fr] sm:items-start">

          <div>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-paper-dim">
              Currently Working On
            </p>

            <p className="text-sm leading-relaxed text-paper/90 sm:text-base">
              {site.currentFocus}
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-paper-dim sm:text-right">
              Technologies I Work With
            </p>

            <div className="flex flex-wrap gap-2 sm:justify-end">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs font-medium text-paper-dim transition-colors hover:border-signal/40 hover:text-paper"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 flex flex-wrap items-center gap-4 font-mono text-xs text-paper-dim/70">
          <span className="font-medium text-paper-dim">
            @{site.handle}
          </span>

          <span className="h-px w-6 bg-white/15" />

          <span>
            Open to Full-Stack & Frontend Opportunities
          </span>
        </div>

      </div>
    </section>
  );
}
