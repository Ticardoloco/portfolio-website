import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/shared/Reveal";
import BackgroundGrid from "@/components/shared/BackgroundGrid";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name} (${site.handle}) for full-stack engineering, web applications, and collaborations.`,
  path: "/contact",
});

interface SocialLinkItem {
  label: string;
  handle?: string;
  href?: string;
}

export default function ContactPage() {
  const links = site.links as Record<string, string | undefined> | undefined;

  const socialProfiles: SocialLinkItem[] = [
    {
      label: "GitHub",
      handle: "@Ticardoloco",
      href: links?.github || "https://github.com/Ticardoloco",
    },
    {
      label: "LinkedIn",
      handle: "Egbeleke Taiwo",
      href:
        links?.linkedin ||
        "https://www.linkedin.com/in/taiwo-egbeleke-391b42328/",
    },
    {
      label: "X (Twitter)",
      handle: "@Ticardoloco",
      href: links?.x || links?.twitter || "https://x.com/Ticardoloco",
    },
    {
      label: "Instagram",
      handle: links?.instagramHandle,
      href: links?.instagram,
    },
  ].filter((item): item is Required<SocialLinkItem> => Boolean(item.href));

  return (
    <div className="relative overflow-hidden">
      <BackgroundGrid size={{ x: "32px", y: "32px" }} />

      <article className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 sm:pt-16">
        <Reveal>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper-dim transition-colors hover:text-signal"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to home
          </Link>
        </Reveal>

        <header className="mt-8 max-w-3xl sm:mt-10">
          <Reveal delay={1}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                Contact
              </span>
              <span className="h-px w-8 bg-white/15" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim">
                {site.location || "Lagos, Nigeria"}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl leading-[1.1] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Let&apos;s build something reliable.
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-paper-dim sm:text-base sm:leading-7">
              Send a direct message below for software engineering opportunities,
              full-stack web builds, API integrations, or project collaborations.
            </p>
          </Reveal>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <Reveal delay={2}>
            <aside className="space-y-6 rounded-2xl border border-white/10 bg-ink-raised/40 p-5 sm:p-7">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim/60">
                  Engineer
                </p>
                <p className="mt-1 font-display text-lg text-paper">
                  {site.name}
                </p>
                <p className="mt-0.5 font-mono text-xs text-signal">
                  {site.handle}
                </p>
              </div>

              <div className="border-t border-white/[0.07] pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim/60">
                  Base Location
                </p>
                <p className="mt-1 text-sm text-paper-dim">
                  {site.location || "Lagos, Nigeria"}
                </p>
              </div>

              <div className="border-t border-white/[0.07] pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim/60">
                  Social Handles &amp; Profiles
                </p>
                <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                  {socialProfiles.map((profile) => (
                    <a
                      key={profile.label}
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary group/link flex items-center justify-between gap-2 text-xs sm:justify-start"
                    >
                      <span>{profile.label}</span>
                      {profile.handle && (
                        <span className="font-mono text-[10px] text-paper-dim/70 transition-colors group-hover/link:text-signal">
                          {profile.handle}
                        </span>
                      )}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>

          <Reveal delay={3}>
            <ContactForm />
          </Reveal>
        </div>
      </article>
    </div>
  );
}