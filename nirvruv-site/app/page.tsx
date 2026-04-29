"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
      delay,
    },
  }),
};

function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeInUp}
      custom={delay}
    >
      {children}
    </motion.section>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <main className="min-h-screen text-white bg-[radial-gradient(circle_at_top,_#020617,_#020617_25%,_#020617_40%,_#020617_60%,_#0b1120_80%,_#0f172a_100%)]">
      {/* subtle blue glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-70"
      >
        <div className="absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-blue-600/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-sky-500/30 blur-3xl" />
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-30 backdrop-blur-xl bg-black/70 border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xs font-semibold tracking-[0.3em] text-zinc-300 uppercase">
            NIRVRUV
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs text-zinc-300">
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <Link
              href="/automations"
              className="hover:text-white transition-colors"
            >
              Automations
            </Link>
            <Link
              href="/courses-books"
              className="hover:text-white transition-colors"
            >
              Courses/Books
            </Link>
            <Link href="/clients" className="hover:text-white transition-colors">
              Our Clients
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About Nirvruv
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative isolate">
        {/* HERO */}
        <section ref={heroRef} className="overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 lg:flex lg:items-center lg:gap-16">
            {/* Left: copy */}
            <motion.div
              className="max-w-xl"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="text-sm uppercase tracking-[0.3em] text-zinc-400">
                NIRVRUV
              </div>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                Where Brands Become Infrastructure
              </h1>

              <div className="mt-6 space-y-1 text-zinc-300 text-sm sm:text-base">
                <p>Founded in 2023.</p>
                <p>Built on execution.</p>
                <p>Engineered for scale.</p>
              </div>

              <p className="mt-6 text-zinc-400 leading-relaxed text-sm sm:text-base">
                Nirvruv is a strategic marketing and AI systems firm designed
                for businesses that intend to grow with precision. We do not
                experiment with growth. We design it, structure it, and automate
                it.
              </p>

              <p className="mt-4 text-zinc-400 leading-relaxed text-sm sm:text-base">
                If you are looking for predictable expansion instead of
                temporary spikes, you are in the right place.
              </p>

              {/* Hero CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/services">
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow:
                        "0 18px 45px rgba(59,130,246,0.45), 0 0 0 1px rgba(255,255,255,0.06)",
                    }}
                    whileTap={{ scale: 0.96, opacity: 0.8 }}
                    className="rounded-full bg-white text-black px-6 py-3 text-sm font-medium shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    Services
                  </motion.button>
                </Link>

                <Link href="/automations">
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "rgba(15,23,42,0.9)",
                    }}
                    whileTap={{ scale: 0.96, opacity: 0.8 }}
                    className="rounded-full border border-zinc-700/80 px-6 py-3 text-sm font-medium text-zinc-100 bg-zinc-950/40 backdrop-blur-sm hover:border-zinc-400 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    Automations
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right: animated visual */}
            <motion.div
              style={{ y: heroY, scale: heroScale }}
              className="mt-12 lg:mt-0 flex-1"
            >
              <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-700/70 overflow-hidden shadow-[0_40px_120px_rgba(15,23,42,0.9)]">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute inset-6 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-600/60"
                >
                  <div className="h-full w-full flex flex-col justify-between p-6">
                    <div className="flex justify-between items-center text-xs text-zinc-400">
                      <span>Growth System Overview</span>
                      <span className="inline-flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Stable
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-[11px] text-zinc-300">
                      <div className="rounded-2xl border border-zinc-700/70 bg-black/40 p-3">
                        <p className="font-medium text-xs">
                          Brand Infrastructure
                        </p>
                        <p className="mt-1 text-[11px] text-zinc-400">
                          Systems-first positioning, offers, and touchpoints.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-zinc-700/70 bg-black/40 p-3">
                        <p className="font-medium text-xs">YouTube Engine</p>
                        <p className="mt-1 text-[11px] text-zinc-400">
                          Strategy, content, and analytics as a single funnel.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-zinc-700/70 bg-black/40 p-3">
                        <p className="font-medium text-xs">AI Automations</p>
                        <p className="mt-1 text-[11px] text-zinc-400">
                          Agents enforcing your growth playbook 24/7.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 1: Value Props */}
        <Section className="border-t border-zinc-800/80">
          <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
            <div>
              <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.2em]">
                Precision Growth
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Architected growth systems that are measurable, repeatable, and
                compounding—not short-term spikes.
              </p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.2em]">
                Brand as Infrastructure
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                We embed your brand into the way your business runs, not just
                how it looks.
              </p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.2em]">
                YouTube Growth Lab
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                Channels treated like engineered funnels: content, thumbnails,
                and retention tuned for scale.
              </p>
            </div>
            <div>
              <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.2em]">
                AI Systems & Agents
              </h2>
              <p className="mt-3 text-sm text-zinc-400">
                AI automations that replace manual workflows and guard the
                integrity of your growth model.
              </p>
            </div>
          </div>
        </Section>

        {/* SECTION 2: Brand & Growth Marketing */}
        <Section className="border-t border-zinc-800/80">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:flex lg:items-center lg:gap-16">
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.25em]">
                Brand & Performance
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
                Strategic marketing built like infrastructure.
              </h2>
              <p className="mt-4 text-zinc-400 text-sm sm:text-base">
                We design offers, funnels, and media as a single operating
                system—so every new campaign plugs into a structure that already
                works.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-400">
                <li>• System-first brand and offer architecture</li>
                <li>• Performance funnels tuned for signal over noise</li>
                <li>• Analytics that decision-makers can trust</li>
              </ul>
            </div>
            <div className="mt-10 lg:mt-0 flex-1">
              <div className="aspect-[16/10] rounded-3xl bg-slate-950/80 border border-zinc-800/80 shadow-[0_30px_90px_rgba(15,23,42,0.9)]" />
            </div>
          </div>
        </Section>

        {/* SECTION 3: YouTube Growth */}
        <Section className="border-t border-zinc-800/80">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.25em]">
              YouTube Growth
            </p>
            <div className="mt-4 lg:flex lg:items-start lg:gap-16">
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl font-semibold">
                  Turn your channel into an acquisition engine.
                </h2>
                <p className="mt-4 text-zinc-400 text-sm sm:text-base">
                  Frameworks for titles, thumbnails, storytelling, and
                  retention—customised for your market and business model.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 flex-1 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-4">
                  <p className="text-sm text-zinc-200">Channel audits & design</p>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-4">
                  <p className="text-sm text-zinc-200">
                    Thumbnail & title testing systems
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-4">
                  <p className="text-sm text-zinc-200">
                    Retention & watch-time engineering
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-4">
                  <p className="text-sm text-zinc-200">
                    Offer & funnel integration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 4: AI Systems & Automations */}
        <Section className="border-t border-zinc-800/80">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.25em]">
              AI Systems
            </p>
            <div className="mt-4 flex flex-col lg:flex-row lg:items-start lg:gap-16">
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl font-semibold">
                  Operationalize growth with AI agents.
                </h2>
                <p className="mt-4 text-zinc-400 text-sm sm:text-base">
                  Templates and full-stack automations that make your growth
                  playbook enforce itself across marketing, sales, and content.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 flex-1 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-4">
                  <p className="text-sm font-medium text-zinc-100">
                    Lead qualification agent
                  </p>
                  <p className="mt-2 text-xs text-zinc-400">
                    Scores and routes inbound demand based on your criteria
                    before it hits a calendar.
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-800/80 bg-black/40 p-4">
                  <p className="text-sm font-medium text-zinc-100">
                    Content repurposing pipeline
                  </p>
                  <p className="mt-2 text-xs text-zinc-400">
                    Converts long-form content into channel-ready assets across
                    platforms automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 5: Metrics (placeholder) */}
        <Section className="border-t border-zinc-800/80">
          <div className="max-w-6xl mx-auto px-6 py-16 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-semibold">X+</p>
              <p className="mt-1 text-sm text-zinc-400">
                Channels and brands scaled
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">Y%</p>
              <p className="mt-1 text-sm text-zinc-400">
                Average lift in key metrics
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">Z</p>
              <p className="mt-1 text-sm text-zinc-400">
                Automations deployed across clients
              </p>
            </div>
          </div>
        </Section>

        {/* SECTION 6: Final CTA */}
        <Section className="border-t border-zinc-800/80">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold">
              Ready to turn your brand into infrastructure?
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base">
              We work with teams who treat growth as an engineered system—not a
              one-off experiment.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/contact">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 18px 45px rgba(59,130,246,0.45), 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                  whileTap={{ scale: 0.96, opacity: 0.8 }}
                  className="rounded-full bg-white text-black px-6 py-3 text-sm font-medium shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Contact
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: "rgba(15,23,42,0.9)",
                  }}
                  whileTap={{ scale: 0.96, opacity: 0.8 }}
                  className="rounded-full border border-zinc-700/80 px-6 py-3 text-sm font-medium text-zinc-100 bg-zinc-950/40 backdrop-blur-sm hover:border-zinc-400 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Services
                </motion.button>
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}