"use client";

import Link from "next/link";
import Carousel from "@/components/shared/Carousel";
import Reveal from "@/components/shared/Reveal";
import BackgroundGrid from "@/components/shared/BackgroundGrid";
import type { Project } from "@/service/projectService";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const tags = project.tags || [];
  const images = project.imageUrls || [];

  return (
    <div className="relative overflow-hidden">
      <BackgroundGrid size={{ x: "32px", y: "32px" }} />
      <article className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 sm:pt-16">
        {/* Back Link */}
        <Reveal>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper-dim transition-colors hover:text-signal"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            All projects
          </Link>
        </Reveal>

        {/* Hero Header */}
        <header className="relative mt-8 max-w-4xl sm:mt-10">
          <Reveal delay={1}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                {project.featured ? "Featured Project" : "System Overview"}
              </span>

              <span className="h-px w-8 bg-white/15" />

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim">
                ID: {project.id}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl leading-[1.1] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="mt-5 text-sm leading-relaxed text-paper-dim sm:text-base sm:leading-7 lg:text-lg">
              {project.description}
            </p>

            {/* Meta Data Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-y border-white/[0.07] py-5 sm:flex sm:flex-wrap sm:gap-x-12">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-dim/60">
                  Primary Tech Stack
                </p>
                <p className="mt-1 font-mono text-xs text-paper">
                  {tags.slice(0, 3).join(" · ")}
                </p>
              </div>

              {project.liveUrl && (
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper-dim/60">
                    Deployment Status
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-signal">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                    Live Production
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </header>

        {/* Hero Image / Carousel Component */}
        {images.length > 0 && (
          <Reveal delay={2}>
            <div className="relative mt-8 overflow-hidden rounded-xl border border-white/10 bg-ink-raised shadow-[0_30px_100px_-40px_rgba(46,158,255,0.30)] sm:mt-10">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-signal/60 to-transparent"
              />
              <Carousel
                images={images.map((url) => ({
                  src: url,
                  alt: `${project.title} interface preview`,
                }))}
              />
            </div>
          </Reveal>
        )}

        {/* Action Buttons & Tech Pill Badges */}
        <Reveal delay={3}>
          <div className="mt-8 flex flex-col gap-6 border-b border-white/[0.07] pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] text-paper-dim transition-colors hover:border-signal/30 hover:text-paper"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                >
                  Live site ↗
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Source ↗
                </a>
              )}

              {project.swaggerUrl && (
                <a
                  href={project.swaggerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center text-amber-400 border-amber-500/30 hover:border-amber-400"
                >
                  Swagger Docs ↗
                </a>
              )}
            </div>
          </div>
        </Reveal>

        {/* Website Details Section */}
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[200px_1fr] lg:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim/50">
                Project Details
              </p>
              <div className="h-px w-12 bg-signal/30" />
            </div>
          </aside>

          <div className="space-y-6 sm:space-y-8">
            {project.details && project.details.length > 0 ? (
              project.details.map((detail, idx) => (
                <Reveal key={idx} delay={idx + 1}>
                  <section className="group rounded-xl border border-white/8 bg-ink-raised/50 p-5 sm:p-8 backdrop-blur-xs transition-all duration-300 hover:border-signal/40 hover:bg-ink-raised">
                    <div className="mb-3 flex items-center gap-3 sm:mb-4">
                      <span className="font-mono text-xs text-signal font-bold">
                        0{idx + 1}
                      </span>
                      <span className="h-px w-6 bg-signal/30" />
                      <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-paper">
                        Overview Highlight
                      </h2>
                    </div>
                    <p className="text-sm leading-7 text-paper-dim sm:text-base sm:leading-8">
                      {detail}
                    </p>
                  </section>
                </Reveal>
              ))
            ) : (
              <Reveal delay={1}>
                <section className="rounded-xl border border-white/8 bg-ink-raised/50 p-5 sm:p-8 backdrop-blur-xs transition-colors hover:border-signal/30">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-xs text-signal font-bold">
                      01
                    </span>
                    <span className="h-px w-6 bg-signal/30" />
                    <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-paper">
                      Key Information
                    </h2>
                  </div>
                  <p className="text-sm leading-7 text-paper-dim sm:text-base sm:leading-8">
                    {project.description}
                  </p>
                </section>
              </Reveal>
            )}
          </div>
        </div>

        {/* Bottom Navigation Footer */}
        <Reveal>
          <div className="mt-16 border-t border-white/[0.07] pt-6 sm:mt-20">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-paper-dim transition-colors hover:text-signal"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to all projects
            </Link>
          </div>
        </Reveal>
      </article>
    </div>
  );
}