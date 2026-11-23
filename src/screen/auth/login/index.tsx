"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { authService } from "@/service/authService";
import BackgroundGrid from "@/components/shared/BackgroundGrid";
import Reveal from "@/components/shared/Reveal";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    try {
      const res = await authService.login({
        email: email.trim(),
        password,
      });

      toast.success(res.message || "Signed in. Redirecting to admin...");
      router.replace("/admin");
      router.refresh();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Unable to sign in."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      <BackgroundGrid size={{ x: "32px", y: "32px" }} />

      <div className="relative z-10 w-full max-w-md">
        <Reveal>
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper-dim transition-colors hover:text-signal"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to home
            </Link>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-paper-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              Admin Gate
            </span>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <section className="rounded-2xl border border-white/10 bg-ink-raised/75 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                Authentication
              </span>
              <span className="h-px w-8 bg-white/15" />
            </div>

            <h1 className="mt-3 font-display text-3xl tracking-tight text-paper sm:text-4xl">
              Sign in to Admin
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-paper-dim">
              Enter your Firebase administrator credentials to manage projects and
              portfolio content.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={submitting}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-ink/85 px-3.5 py-2.5 text-sm text-paper placeholder:text-paper-dim/35 transition-colors focus:border-signal focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim"
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    disabled={submitting}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-white/10 bg-ink/85 py-2.5 pl-3.5 pr-16 text-sm text-paper placeholder:text-paper-dim/35 transition-colors focus:border-signal focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-wider text-paper-dim transition-colors hover:text-signal disabled:opacity-50"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary mt-2 flex w-full items-center justify-center gap-2 py-2.5 text-sm font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Signing in..." : "Continue to Admin →"}
              </button>
            </form>

            <div className="mt-6 border-t border-white/[0.07] pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-paper-dim/60">
                Session verified via Firebase Auth &amp; server cookie
              </p>
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}