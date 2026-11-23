"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | string>(2026);

  useEffect(() => {
    const trigger = ()=>{
        setCurrentYear(new Date().getFullYear());
    }
    trigger();
  }, []);

  return (
    <footer className="border-t border-white/10 bg-ink py-16 text-paper-dim">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          
          {/* Identity & Status */}
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-block text-xl font-bold tracking-tight text-paper transition-colors hover:text-signal"
            >
              {site.name}
            </Link>
            
            <p className="max-w-md text-xs leading-relaxed text-paper-dim/80">
              Full-Stack Web Developer & Software Engineer crafting performant web applications and backend systems in {site.location}.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for full-stack engineering roles
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[11px] text-paper-dim/50 sm:flex-row">
          <p>© {currentYear} {site.name}. All rights reserved.</p>
          
          <div className="flex items-center gap-2">
            <span>Built with Next.js, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}