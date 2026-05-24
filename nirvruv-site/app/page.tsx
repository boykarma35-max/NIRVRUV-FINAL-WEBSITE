"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import LaptopScroll from "./components/LaptopScroll";

const fadeInUp: Variants = {
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
          <Link href="/" className="text-xs font-semibold tracking-[0.3em] text-zinc-300 uppercase hover:text-white transition-colors">
            NIRVRUV
          </Link>
          <div className="hidden md:flex items-center gap-6 text-xs text-zinc-300">
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/automations" className="hover:text-white transition-colors">
              Automations
            </Link>
            <Link href="/clients" className="hover:text-white transition-colors">
              Our Clients
            </Link>
            <Link href="/marketing" className="hover:text-white transition-colors">
              Marketing
            </Link>
            <Link href="/youtube-growth" className="hover:text-white transition-colors">
              YouTube Growth
            </Link>
            <Link href="/courses" className="hover:text-white transition-colors">
              Courses
            </Link>
            <Link href="/books" className="hover:text-white transition-colors">
              Books
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative isolate">
        {/* HERO */}
        <LaptopScroll />

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
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-zinc-800/80 shadow-[0_30px_90px_rgba(15,23,42,0.9)]">
                <Image
                  src="/business_growth.png"
                  alt="Business Growth Chart"
                  fill
                  className="object-cover"
                />
              </div>
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

        {/* SECTION 5: Methodology (How We Work) */}
        <Section className="border-t border-zinc-800/80">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.25em]">
                How We Work
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
                Our Methodology: Engineered for Unprecedented Growth
              </h2>
              <p className="mt-4 text-zinc-400 text-sm sm:text-base">
                At NIRVRUV, we don’t just run campaigns; we build fully automated, data-driven ecosystems designed to scale. We treat your brand’s metrics with absolute precision, stripping away the guesswork and replacing it with predictive analytics, high-impact visual storytelling, and advanced AI systems.
              </p>
              <p className="mt-4 text-zinc-400 text-sm sm:text-base">
                Here is exactly how we transform your brand’s architecture to dominate the digital landscape.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Phase 1 */}
              <div className="rounded-3xl border border-zinc-800/80 bg-black/40 p-8 shadow-sm transition hover:border-zinc-600/80">
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Phase 1</div>
                <h3 className="text-xl font-medium text-white mb-4">Deep-Dive Audit & Algorithmic Alignment</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Before we execute, we analyze. We dissect your current analytics, audience retention graphs, and conversion rates to identify the exact friction points holding your brand back.
                </p>
                <ul className="space-y-4 text-sm text-zinc-300">
                  <li><strong className="text-white">Metric Mapping:</strong> We establish clear, non-negotiable KPIs tailored to your revenue goals.</li>
                  <li><strong className="text-white">Audience Profiling:</strong> We utilize data to map out your exact target demographic, ensuring every piece of content and every automated funnel hits with surgical precision.</li>
                  <li><strong className="text-white">Infrastructure Review:</strong> We audit your existing tech stack to prepare for seamless AI integration.</li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="rounded-3xl border border-zinc-800/80 bg-black/40 p-8 shadow-sm transition hover:border-zinc-600/80">
                <div className="text-xs font-semibold text-sky-400 uppercase tracking-widest mb-3">Phase 2</div>
                <h3 className="text-xl font-medium text-white mb-4">AI-Powered Ecosystem Architecture</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  We build the engine. Whether launching high-converting dropshipping operations or packaging your expertise into premium AI courses, we automate the heavy lifting so you can focus on scaling.
                </p>
                <ul className="space-y-4 text-sm text-zinc-300">
                  <li><strong className="text-white">Automated Commerce & Courses:</strong> We deploy sophisticated, AI-driven dropshipping funnels and course delivery platforms that operate flawlessly 24/7.</li>
                  <li><strong className="text-white">Prompt-Driven Workflows:</strong> We integrate advanced prompt engineering into your marketing pipelines, automating customer acquisition and lead nurturing.</li>
                  <li><strong className="text-white">High-End Asset Creation:</strong> We lay the groundwork for cinematic, visually striking brand assets that command attention and elevate your perceived market value.</li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="rounded-3xl border border-zinc-800/80 bg-black/40 p-8 shadow-sm transition hover:border-zinc-600/80">
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Phase 3</div>
                <h3 className="text-xl font-medium text-white mb-4">Omnichannel Domination (YouTube & Social)</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Attention is the currency of the modern web, and we know exactly how to capture it. We deploy aggressive, algorithm-optimized growth strategies across YouTube and all major social platforms.
                </p>
                <ul className="space-y-4 text-sm text-zinc-300">
                  <li><strong className="text-white">Viral Engineering:</strong> We leverage data-backed hooks, optimal scene pacing, and bold visual storytelling to maximize watch time and engagement.</li>
                  <li><strong className="text-white">Platform-Specific Optimization:</strong> Content is dynamically tailored for each platform’s unique algorithm, ensuring maximum organic reach.</li>
                  <li><strong className="text-white">Community Cultivation:</strong> We don't just chase views; we build loyal, high-converting communities around your brand.</li>
                </ul>
              </div>

              {/* Phase 4 */}
              <div className="rounded-3xl border border-zinc-800/80 bg-black/40 p-8 shadow-sm transition hover:border-zinc-600/80">
                <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Phase 4</div>
                <h3 className="text-xl font-medium text-white mb-4">Precision Scaling & Analytics Review</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Launch is just the beginning. We ruthlessly monitor the data, scaling what works and instantly pivoting what doesn’t.
                </p>
                <ul className="space-y-4 text-sm text-zinc-300">
                  <li><strong className="text-white">Real-Time Analytics Dashboarding:</strong> You get full, transparent access to the metrics that matter most.</li>
                  <li><strong className="text-white">A/B Testing & Iteration:</strong> We constantly refine thumbnails, ad copy, and sales funnels using real-time market feedback.</li>
                  <li><strong className="text-white">Hyper-Scaling:</strong> Once a winning formula is identified, we deploy highly targeted capital to multiply your ROI and exponentially accelerate your brand's growth.</li>
                </ul>
              </div>
            </div>

            <div className="mt-16 text-center max-w-3xl mx-auto">
              <p className="text-zinc-300 text-lg font-medium leading-relaxed">
                Ready to bypass the traditional learning curve and automate your brand's evolution? <br className="hidden sm:block" />
                Partner with NIRVRUV and let the data drive your next breakthrough.
              </p>
            </div>
          </div>
        </Section>

        {/* SECTION 6: Metrics */}
        <Section className="border-t border-zinc-800/80">
          <div className="max-w-6xl mx-auto px-6 py-16 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-semibold">50+</p>
              <p className="mt-1 text-sm text-zinc-400">
                Channels and brands scaled
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">78%</p>
              <p className="mt-1 text-sm text-zinc-400">
                Average lift in key metrics
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">198</p>
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