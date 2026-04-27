import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { experience, skills, certs } from "@/lib/portfolio-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Tomiwa Babatunde" },
      {
        name: "description",
        content:
          "Developer, digital marketer and project manager — three skill sets, one person, six years of measurable results.",
      },
      { property: "og:title", content: "About — Tomiwa Babatunde" },
      {
        property: "og:description",
        content: "Three skill sets. One person. Six years of measurable results.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <section className="px-6 md:px-12 pt-32 pb-20 max-w-5xl">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6">
          About
        </p>
        <h1 className="font-display text-5xl md:text-8xl leading-[0.95]">
          I grow brands with <em className="text-gradient">Reels</em> that actually reach people.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-foreground/80 max-w-3xl">
          I&apos;m a social media manager and content strategist based in Lagos. My job is simple:
          turn your page from a billboard into a growth engine. Hooks, formats, posting cadence,
          and weekly experiments — all measured, all repeatable. The proof is in the analytics
          screenshots, not the captions.
        </p>
      </section>

      <section className="px-6 md:px-12 py-20">
        <h2 className="font-display text-4xl md:text-6xl mb-12">Experience</h2>
        <div className="space-y-12 max-w-4xl">
          {experience.map((e, i) => (
            <motion.div
              key={e.role + e.period}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="grid md:grid-cols-[180px_1fr] gap-6 pb-12 border-b border-border/30"
            >
              <div className="font-mono text-xs text-foreground/60">{e.period}</div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl">{e.role}</h3>
                <div className="text-primary text-sm mt-1">{e.company}</div>
                <ul className="mt-4 space-y-2 text-foreground/75">
                  {e.bullets.map((b) => (
                    <li key={b} className="pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-primary">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20">
        <h2 className="font-display text-4xl md:text-6xl mb-12">Toolkit</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat} className="glass rounded-2xl p-6">
              <div className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
                {cat}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full text-sm border border-border/50 text-foreground/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 max-w-4xl">
        <h2 className="font-display text-4xl md:text-6xl mb-8">Certifications</h2>
        <ul className="space-y-3">
          {certs.map((c) => (
            <li key={c} className="font-mono text-sm text-foreground/75 pl-5 relative before:content-['✦'] before:absolute before:left-0 before:text-primary">
              {c}
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
