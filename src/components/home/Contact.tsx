import Link from "next/link";
import { site } from "@/lib/site";
import Reveal from "@/components/shared/Reveal";

interface ChannelItem {
  label: string;
  value: string;
  href: string;
  hint: string;
  primary: boolean;
  internal?: boolean;
}

export default function Contact() {
  const links = site.links as Record<string, string | undefined>;

  const channels: ChannelItem[] = [
    {
      label: "Get in touch",
      value: "Send a direct message",
      href: "/contact",
      hint: "Open the contact form — no mail client needed",
      primary: true,
      internal: true,
    },
    {
      label: "GitHub",
      value: `github.com/${site.handle}`,
      href: links.github || "https://github.com/Ticardoloco",
      hint: "Repositories & source code",
      primary: false,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/egbeleke-taiwo",
      href: links.linkedin || "https://linkedin.com/in/egbeleke-taiwo",
      hint: "Professional network & experience",
      primary: false,
    },
    {
      label: "X (Twitter)",
      value: `@${site.handle}`,
      href: links.twitter || links.x || "https://x.com/Ticardoloco",
      hint: "Tech updates & thoughts",
      primary: false,
    },
    {
      label: "Facebook",
      value: links.facebook ? links.facebook.replace(/^https?:\/\//, "") : "facebook.com",
      href: links.facebook || "#",
      hint: "Social profile & updates",
      primary: false,
    },
  ];

  return (
    <section id="contact" className="mx-auto max-w-5xl overflow-hidden px-6 py-24 sm:py-32">
      <div className="relative">
        <Reveal>
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-signal" />
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-signal">
                Get in touch
              </p>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              Let&apos;s build something exceptional
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-paper-dim sm:text-lg">
              Open to software engineering roles, full-stack web development projects, and technical collaborations.
              Based in Lagos, Nigeria. Use the contact form for direct inquiries.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col sm:grid gap-3 sm:grid-cols-2">
          {channels.map((ch, i) => {
            const cardClassName = `group block rounded-2xl border p-5 transition-all duration-300 ${
              ch.primary
                ? "border-signal/25 bg-signal/8 hover:border-signal/45 hover:bg-signal/12"
                : "border-white/8 bg-white/2 hover:border-signal/25 hover:bg-white/4"
            }`;

            const cardContent = (
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-paper-dim">
                    {ch.label}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-paper transition-colors group-hover:text-signal">
                    {ch.value}
                  </p>
                  <p className="mt-1 text-xs text-paper-dim/80">{ch.hint}</p>
                </div>
                <span className="text-signal opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                  →
                </span>
              </div>
            );

            return (
              <Reveal key={ch.label} delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}>
                {ch.internal ? (
                  <Link href={ch.href} className={cardClassName}>
                    {cardContent}
                  </Link>
                ) : (
                  <a
                    href={ch.href}
                    target={ch.href.startsWith("http") ? "_blank" : undefined}
                    rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={cardClassName}
                  >
                    {cardContent}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}