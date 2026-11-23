"use client";

import { useState, FormEvent } from "react";
import { toast } from "sonner";
import { contactService, ContactPayload } from "@/service/contactService";

export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Using sonner promise toast to automatically display loading, success, and error states
    toast.promise(contactService.sendMessage(form), {
      success: (data) => {
        setForm({ name: "", email: "", subject: "", message: "" });
        setLoading(false);
        return data.message || "Message sent successfully!";
      },
      error: (err) => {
        setLoading(false);
        return err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.";
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-white/10 bg-ink-raised/60 p-5 sm:p-8 backdrop-blur-xs"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim"
          >
            Your Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            disabled={loading}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Egbeleke Taiwo"
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink/80 px-3.5 py-2.5 text-sm text-paper placeholder:text-paper-dim/40 focus:border-signal focus:outline-none disabled:opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim"
          >
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            disabled={loading}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-lg border border-white/10 bg-ink/80 px-3.5 py-2.5 text-sm text-paper placeholder:text-paper-dim/40 focus:border-signal focus:outline-none disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          disabled={loading}
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="Project inquiry, collaboration, or role"
          className="mt-2 w-full rounded-lg border border-white/10 bg-ink/80 px-3.5 py-2.5 text-sm text-paper placeholder:text-paper-dim/40 focus:border-signal focus:outline-none disabled:opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          disabled={loading}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me about what you are building or how we can work together..."
          className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-ink/80 px-3.5 py-2.5 text-sm text-paper placeholder:text-paper-dim/40 focus:border-signal focus:outline-none disabled:opacity-50"
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message →"}
        </button>
      </div>
    </form>
  );
}