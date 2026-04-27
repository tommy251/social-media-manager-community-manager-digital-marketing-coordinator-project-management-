import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { Lightbox } from "@/components/Lightbox";
import { projects, categories } from "@/lib/portfolio-data";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Tomiwa Babatunde" },
      {
        name: "description",
        content:
          "Selected social-media projects: viral Reels, Yellow Atlas real estate, CoreMars finance, Bosah Oak Roe lifestyle.",
      },
      { property: "og:title", content: "Work — Tomiwa Babatunde" },
      { property: "og:description", content: "Selected social-media work with real metrics." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <SiteShell>
      <section className="px-6 md:px-12 pt-32 pb-12">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6">
          ✦ Selected Work
        </p>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.95]">
          Things I&apos;ve <em className="text-gradient">grown</em>.
        </h1>

        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categories.map((c) => {
            const active = c === filter;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-mono border transition-all ${
                  active
                    ? "bg-primary text-primary-foreground border-primary scale-105"
                    : "border-border/60 text-foreground/70 hover:text-foreground hover:border-primary/50"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32 space-y-6">
        {visible.map((p, i) => (
          <motion.article
            key={p.slug}
            layout
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.05 }}
            className="group relative glass rounded-3xl overflow-hidden"
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-gradient-to-br ${p.accent}`}
            />
            <div className="relative grid md:grid-cols-[1fr_2fr] gap-8 p-8 md:p-12">
              <div>
                <div className="font-mono text-xs text-foreground/50">{p.period}</div>
                <div className="mt-2 font-mono text-xs text-primary">{p.role}</div>
                <div className="mt-4 inline-block px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest bg-primary/15 text-primary">
                  {p.category}
                </div>
              </div>
              <div>
                <h3 className="font-display text-3xl md:text-5xl leading-tight">{p.title}</h3>
                <p className="mt-4 text-foreground/75 max-w-2xl">{p.summary}</p>
                {p.metrics.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-primary/10 text-primary border border-primary/20"
                      >
                        ✦ {m}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full text-xs font-mono border border-border/60 text-foreground/70"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {p.images.length > 0 && (
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {p.images.map((src, idx) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setLightbox({ images: p.images, index: idx })}
                        className="group/img relative aspect-[9/16] overflow-hidden rounded-xl border border-border/40 bg-background/40"
                        aria-label={`Open screenshot ${idx + 1} of ${p.title}`}
                      >
                        <img
                          src={src}
                          alt={`${p.title} screenshot ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                        <div className="absolute bottom-2 left-2 right-2 text-[10px] font-mono text-foreground/0 group-hover/img:text-foreground/90 transition-colors">
                          Click to expand
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <Lightbox
        images={lightbox?.images ?? []}
        index={lightbox?.index ?? null}
        onClose={() => setLightbox(null)}
        onPrev={() =>
          setLightbox((lb) =>
            lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : lb
          )
        }
        onNext={() =>
          setLightbox((lb) => (lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : lb))
        }
      />
    </SiteShell>
  );
}
