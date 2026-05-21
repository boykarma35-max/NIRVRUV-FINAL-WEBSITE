"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(videoRef.current!.duration);
      };
      if (videoRef.current.readyState >= 1) {
        handleLoadedMetadata();
      }
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => videoRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }
  }, []);

  // Update video time based on scroll
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (videoRef.current && duration > 0) {
        requestAnimationFrame(() => {
          if (videoRef.current) {
             videoRef.current.currentTime = latest * duration;
          }
        });
      }
    });
  }, [scrollYProgress, duration]);

  // Text animation: slowly opened as scroll animation goes on
  // Fade in the text starting from 0.05 scroll to 0.4 scroll
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.4], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.05, 0.4], [60, 0]);
  const textScale = useTransform(scrollYProgress, [0.05, 0.4], [0.9, 1]);

  // Video scales up slightly as we scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  // Fade out video towards the end of the scroll
  const videoOpacity = useTransform(scrollYProgress, [0.7, 1], [0.5, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Background Video */}
        <motion.div style={{ scale: videoScale, opacity: videoOpacity }} className="absolute inset-0 w-full h-full -z-10">
          <video
            ref={videoRef}
            // A placeholder dark abstract tech video suitable for a background
            src="https://cdn.pixabay.com/video/2021/08/04/83863-584758782_large.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          {/* overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Text inside the animation */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
          className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center"
        >
          <div className="text-sm md:text-base uppercase tracking-[0.4em] text-blue-400 font-semibold mb-6">
            NIRVRUV
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
            Where Brands Become <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Infrastructure
            </span>
          </h1>

          <div className="mt-8 text-zinc-300 text-base sm:text-lg font-medium drop-shadow-md">
            Founded in 2023 &nbsp;•&nbsp; Built on execution &nbsp;•&nbsp; Engineered for scale
          </div>

          <p className="mt-8 text-zinc-400 leading-relaxed text-sm sm:text-lg max-w-2xl mx-auto">
            Nirvruv is a strategic marketing and AI systems firm designed
            for businesses that intend to grow with precision. We do not
            experiment with growth. We design it, structure it, and automate
            it.
          </p>

          <p className="mt-4 text-zinc-400 leading-relaxed text-sm sm:text-lg max-w-2xl mx-auto">
            If you are looking for predictable expansion instead of temporary spikes, you are in the right place.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-white text-black px-8 py-3.5 text-sm font-semibold shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Services
              </motion.button>
            </Link>

            <Link href="/automations">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(30,41,59,0.7)" }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-zinc-600 px-8 py-3.5 text-sm font-semibold text-white bg-black/30 backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-zinc-300"
              >
                Automations
              </motion.button>
            </Link>
          </div>
        </motion.div>
        
        {/* Scroll down indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
