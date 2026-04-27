import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/SiteShell";
import { ReelPlayer } from "@/components/ReelPlayer";
import { profile, stats } from "@/lib/portfolio-data";
import reelHero from "@/assets/videos/reel-hero.mp4";
import reelFifa from "@/assets/videos/fifa1.mp4";
import reelInb from "@/assets/videos/inb1.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tomiwa Babatunde — Builder. Marketer. Manager." },
      {
        name: "description",
        content:
          "Full-stack developer, digital marketing strategist and project manager. 2M+ Instagram views, 4,400% client reach growth, full e-commerce platforms shipped.",
      },
      { property: "og:title", content: "Tomiwa Babatunde — Portfolio" },
      {
        property: "og:description",
        content: "Builder. Marketer. Manager. 6+ years of measurable impact.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteShell>
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6"
        >
          ✦ Social Media Manager · Available for retainers & sprints
        </motion.p>

        <h1 className="font-display text-[clamp(3.5rem,12vw,11rem)] leading-[0.9] tracking-tight max-w-6xl">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="block"
          >
            Reels.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="block text-gradient italic"
          >
            Reach.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="block"
          >
            Revenue.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 max-w-xl text-lg text-foreground/80"
        >
          {profile.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:scale-105 transition-transform glow"
          >
            See the work →
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-foreground hover:bg-white/5 transition-colors"
          >
            Hire me
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 right-6 md:right-12 font-mono text-xs text-foreground/60 max-w-[14rem] text-right"
        >
          ↓ scroll
          <br />
          {profile.location}
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-32">
        <h2 className="font-display text-5xl md:text-7xl mb-16 max-w-3xl">
          Numbers that <em className="text-gradient">moved</em>.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/30 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              className="bg-background/40 backdrop-blur-md p-8 md:p-10"
            >
              <div className="font-display text-5xl md:text-6xl text-gradient">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-foreground/70">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-32">
        <div className="max-w-4xl mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6">
            ★ Reels Lab
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Click any Reel.{" "}
            <span className="text-foreground/50">This is the format that hit 1.8M.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          <ReelPlayer
            src={reelHero}
            label="Hero · 1.8M views"
            caption="The Reel that broke the algorithm."
          />
          <ReelPlayer
            src={reelFifa}
            label="Sport / Culture"
            caption="Trend-jacking with native hooks."
          />
          <ReelPlayer
            src={reelInb}
            label="Educational"
            caption="Carousel-script hybrid for retention."
          />
        </div>
      </section>

      <section className="px-6 md:px-12 py-32">
        <div className="max-w-4xl">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-6">
            ★ Featured
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            500 → 2,350+ followers in 2.5 months — still climbing.{" "}
            <span className="text-foreground/50">All organic. 1.9M views, 1.8M on one Reel.</span>
          </h2>
          <p className="mt-6 text-foreground/70 max-w-2xl">
            One Reel reached 1.8M views. 98.3% of views came from non-followers — proving real
            viral reach, not audience broadcast. The same systems now drive growth for paying
            clients.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
