import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { SiteShell } from "@/components/SiteShell";
import { profile } from "@/lib/portfolio-data";
import { Check, Copy, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Tomiwa Babatunde" },
      {
        name: "description",
        content:
          "Let's build something. Email tommybab7@gmail.com — open to retainers, sprints and freelance projects.",
      },
      { property: "og:title", content: "Contact — Tomiwa Babatunde" },
      { property: "og:description", content: "Let's build something." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleCopy() {
    void navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${name || "your site"}`);
    const body = encodeURIComponent(
      `Hi Tomiwa,\n\n${message}\n\n— ${name}\n${email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 3000);
  }

  return (
    <SiteShell>
      <section className="min-h-[80vh] px-6 md:px-12 pt-24 pb-16">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6">
          ✦ Let&apos;s talk
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-[clamp(3rem,11vw,10rem)] leading-[0.9]"
        >
          Build <em className="text-gradient">something</em>
          <br />
          with me.
        </motion.h1>

        <div className="mt-12 grid lg:grid-cols-[1.1fr_1fr] gap-8 max-w-6xl">
          {/* Contact card */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleCopy}
                className="group glass rounded-2xl p-6 text-left hover:bg-white/5 transition-colors"
                aria-label="Copy email address"
              >
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-primary mb-3">
                  Email
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 opacity-60" />}
                </div>
                <div className="font-display text-xl md:text-2xl group-hover:text-gradient transition-all break-all">
                  {profile.email}
                </div>
                <div className="mt-2 font-mono text-[10px] text-foreground/50">
                  {copied ? "Copied to clipboard" : "Click to copy"}
                </div>
              </button>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group glass rounded-2xl p-6 hover:bg-white/5 transition-colors"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
                  GitHub
                </div>
                <div className="font-display text-xl md:text-2xl group-hover:text-gradient transition-all">
                  github.com/tommy251
                </div>
                <div className="mt-2 font-mono text-[10px] text-foreground/50">
                  Opens in new tab ↗
                </div>
              </a>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
                Availability
              </div>
              <p className="text-foreground/80">
                Based in <span className="text-foreground">Lagos, Nigeria</span> — available
                worldwide remote. Retainers, sprints or freelance.
              </p>
              <p className="mt-3 text-sm text-foreground/60">Typical reply within 24 hours.</p>
            </div>
          </div>

          {/* Working contact form */}
          <form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 md:p-8 space-y-4"
            aria-label="Contact form"
          >
            <div>
              <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-primary mb-2">
                Your name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background/40 border border-border/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-primary mb-2">
                Your email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background/40 border border-border/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder="jane@brand.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-primary mb-2">
                The pitch
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background/40 border border-border/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                placeholder="Tell me about your brand, goals, timeline and budget."
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:scale-[1.02] active:scale-100 transition-transform glow"
            >
              {sent ? (
                <>
                  <Check className="w-4 h-4" /> Opened your mail app
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send message
                </>
              )}
            </button>
            <p className="font-mono text-[10px] text-foreground/50 text-center">
              Submitting opens your default mail client with the message pre-filled.
            </p>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
