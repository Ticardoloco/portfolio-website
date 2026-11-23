import Link from "next/link";
import { projectService, Project } from "@/service/projectService";
import Reveal from "../shared/Reveal";
import Carousel from "../shared/Carousel";
import ProjectCard from "../shared/ProjectCard";

export default async function Projects() {
  let projects: Project[] = [];
  
  try {
    projects = await projectService.getAllProjects();
  } catch (error) {
    console.error("Failed to load projects:", error);
  }

  // Find featured spotlight project or fallback to first featured/project
  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => p.id !== featuredProject?.id);

  return (
    <section
      id="projects"
      className="relative isolate mx-auto max-w-6xl overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-0 -z-10 h-72 w-72 rounded-full bg-signal/[0.07] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 -left-40 -z-10 h-72 w-72 rounded-full bg-signal/[0.04] blur-[110px]"
      />

      {/* Section heading */}
      <Reveal>
        <div className="mb-12 sm:mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-signal" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-signal">
              Selected work
            </p>
            <span className="text-xs text-paper-dim/50">/ 01</span>
          </div>

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-paper sm:text-5xl md:text-6xl">
                Things I&apos;ve{" "}
                <span className="text-paper-dim/65">built.</span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-paper-dim sm:text-base">
                Products, platforms, and client work. A look at what I&apos;m
                building and the engineering behind it.
              </p>
            </div>

            <Link
              href="/projects"
              className="group inline-flex w-fit shrink-0 items-center gap-3 border-b border-white/15 pb-2 text-sm font-medium text-paper transition-colors hover:border-signal hover:text-signal"
            >
              Explore all projects
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </div>

          <div className="mt-10 h-px bg-gradient-to-r from-white/15 via-white/[0.06] to-transparent" />
        </div>
      </Reveal>

      {/* Featured Spotlight Project */}
      {featuredProject && (
        <Reveal>
          <article className="group relative mb-6 overflow-hidden rounded-2xl border border-white/[0.09] bg-ink-raised transition-all duration-500 hover:border-signal/30 hover:shadow-[0_28px_90px_-45px_rgba(59,158,255,0.24)]">
            {/* Card lighting */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-36 h-96 w-96 rounded-full bg-signal/[0.07] blur-[100px] transition-colors duration-500 group-hover:bg-signal/[0.12]"
            />

            <div className="relative grid lg:grid-cols-[1.1fr_0.9fr]">
              {/* Project preview */}
              <div className="relative flex min-h-[320px] flex-col border-b border-white/[0.07] bg-[#080d15] p-4 sm:min-h-[400px] sm:p-6 lg:border-b-0 lg:border-r">
                {/* Browser frame */}
                <div className="flex items-center gap-2 border-b border-white/[0.07] pb-4">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>

                  <div className="ml-2 flex h-7 min-w-0 flex-1 items-center rounded-md border border-white/[0.06] bg-white/[0.025] px-3">
                    <span className="truncate text-[10px] text-paper-dim/60">
                      {featuredProject.liveUrl ? new URL(featuredProject.liveUrl).hostname : "live-demo"}
                    </span>
                  </div>

                  <span className="hidden text-[10px] text-paper-dim/50 sm:block">
                    PREVIEW
                  </span>
                </div>

                {/* Screenshot carousel */}
                <div className="flex flex-1 items-center justify-center overflow-hidden py-7 sm:py-9">
                  <div className="w-full min-w-0 transition-transform duration-500 group-hover:scale-[1.015]">
                    {featuredProject.imageUrls && featuredProject.imageUrls.length > 0 ? (
                      <Carousel
                        images={featuredProject.imageUrls.map((url, idx) => ({
                          src: url,
                          alt: `${featuredProject.title} preview screenshot ${idx + 1}`,
                        }))}
                      />
                    ) : (
                      <div className="flex h-48 w-full items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/[0.01]">
                        <span className="text-xs text-paper-dim/40">No preview available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview footer */}
                <div className="flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-xs text-paper-dim">Live product</span>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.16em] text-paper-dim/50">
                    FEATURED / 001
                  </span>
                </div>
              </div>

              {/* Project details */}
              <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-10">
                <div>
                  <div className="mb-7 flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full border border-signal/25 bg-signal/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-signal">
                      Featured project
                    </span>
                    {featuredProject.swaggerUrl && (
                      <a
                        href={featuredProject.swaggerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[10px] text-blue-400 hover:border-blue-400"
                      >
                        Swagger Docs ↗
                      </a>
                    )}
                  </div>

                  <h3 className="text-3xl font-semibold tracking-[-0.04em] text-paper transition-colors duration-300 group-hover:text-signal sm:text-4xl">
                    {featuredProject.title}
                  </h3>

                  <p className="mt-5 max-w-md text-sm leading-7 text-paper-dim sm:text-[15px]">
                    {featuredProject.description}
                  </p>

                  {/* Stack */}
                  <div className="mt-8">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-paper-dim/55">
                      Technology
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {featuredProject.tags.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/[0.09] bg-white/[0.025] px-2.5 py-1.5 text-[11px] text-paper-dim transition-colors duration-300 hover:border-signal/30 hover:text-paper"
                        >
                          {tech}
                        </span>
                      ))}

                      {featuredProject.tags.length > 5 && (
                        <span className="px-2 py-1.5 text-[11px] text-paper-dim/55">
                          +{featuredProject.tags.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-10 border-t border-white/[0.08] pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href={`/projects/${featuredProject.id}`}
                      className="group/link inline-flex items-center gap-2 rounded-lg bg-paper px-4 py-3 text-xs font-semibold text-ink transition-colors hover:bg-signal hover:text-white"
                    >
                      Explore project
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      >
                        →
                      </span>
                    </Link>

                    <div className="flex items-center gap-4">
                      {featuredProject.githubUrl && (
                        <a
                          href={featuredProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-paper-dim transition-colors hover:text-paper"
                        >
                          Code ↗
                        </a>
                      )}
                      {featuredProject.liveUrl && (
                        <a
                          href={featuredProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-medium text-paper-dim transition-colors hover:text-paper"
                        >
                          Visit website
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      )}

      {/* Other projects */}
      {otherProjects.length > 0 && (
        <div className="mt-14 sm:mt-20">
          <Reveal>
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-paper-dim/50">
                  More from the workshop
                </p>
                <h3 className="text-xl font-semibold tracking-tight text-paper sm:text-2xl">
                  Other projects
                </h3>
              </div>

              <span className="font-mono text-xs text-paper-dim/55">
                {String(otherProjects.length).padStart(2, "0")}{" "}
                <span className="text-paper-dim/35">PROJECTS</span>
              </span>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {otherProjects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 2) + 1}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <Reveal>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs leading-6 text-paper-dim/60">
            Always building. Always figuring things out.
          </p>

          <Link
            href="/projects"
            className="group inline-flex w-fit items-center gap-2 text-xs font-medium text-paper-dim transition-colors hover:text-signal"
          >
            See everything
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}