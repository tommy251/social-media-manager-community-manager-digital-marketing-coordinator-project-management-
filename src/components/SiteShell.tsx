import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/**
 * Page chrome only — the OceanScene background is mounted ONCE in __root.tsx
 * so the WebGL context survives across route navigations.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen grain">
      <header className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-tight text-foreground">
          Tomiwa<span className="text-primary">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href="mailto:tommybab7@gmail.com"
          className="hidden md:inline-flex font-mono text-xs text-foreground/70 hover:text-primary transition-colors"
        >
          tommybab7@gmail.com
        </a>
      </header>

      {/* mobile nav */}
      <nav className="md:hidden fixed bottom-4 inset-x-4 z-50 glass rounded-full p-1 flex justify-around">
        {nav.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: true }}
            activeProps={{ className: "bg-primary text-primary-foreground" }}
            className="flex-1 text-center py-2 rounded-full text-xs font-medium text-foreground/80"
          >
            {n.label}
          </Link>
        ))}
      </nav>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        {children}
      </motion.main>

      <footer className="relative z-10 border-t border-border/30 mt-32 px-6 md:px-10 py-10 text-center font-mono text-xs text-foreground/50">
        © 2026 Tomiwa Babatunde — Lagos / Remote — Built with motion & care
      </footer>
    </div>
  );
}
