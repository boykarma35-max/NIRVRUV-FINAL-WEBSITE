"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

export default function LaptopScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Video scrub logic
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    if (videoRef.current) {
      const handleLoadedMetadata = () => setDuration(videoRef.current!.duration);
      if (videoRef.current.readyState >= 1) handleLoadedMetadata();
      videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => videoRef.current?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    }
  }, []);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (videoRef.current && duration > 0) {
        requestAnimationFrame(() => {
          if (videoRef.current) videoRef.current.currentTime = latest * duration;
        });
      }
    });
  }, [scrollYProgress, duration]);

  // Laptop opening and scaling animation
  // It starts smaller and slightly tilted down, then grows and straightens as you scroll
  const laptopScale = useTransform(scrollYProgress, [0, 0.4], [0.6, 1.05]);
  const laptopY = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const laptopRotateX = useTransform(scrollYProgress, [0, 0.4], [15, 0]);

  // Text inside the screen slowly reveals
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.7], [40, 0]);
  const textScale = useTransform(scrollYProgress, [0.3, 0.7], [0.95, 1]);

  return (
    <div ref={containerRef} className="relative h-[300vh] z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center perspective-[2000px]">
        
        <motion.div 
          style={{ 
            scale: laptopScale, 
            y: laptopY, 
            rotateX: laptopRotateX,
            transformStyle: "preserve-3d"
          }}
          className="relative w-[90vw] max-w-[1200px] mx-auto mt-12"
        >
          {/* Laptop Screen (Lid) */}
          <div className="relative aspect-[16/10] bg-[#111] rounded-t-2xl sm:rounded-t-[32px] border-[8px] sm:border-[16px] border-[#1f1f1f] shadow-2xl overflow-hidden flex flex-col items-center justify-center">
            
            {/* The Video Background inside the Laptop */}
            <video
              ref={videoRef}
              src="https://cdn.pixabay.com/video/2021/08/04/83863-584758782_large.mp4"
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            {/* Screen inner overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-black/20" />

            {/* Top Webcam Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#333] shadow-inner" />

            {/* The slowly opening text inside the laptop screen */}
            <motion.div 
              style={{ opacity: textOpacity, y: textY, scale: textScale }} 
              className="relative z-10 px-6 sm:px-12 text-center w-full"
            >
              <div className="text-xs sm:text-base uppercase tracking-[0.4em] text-blue-400 font-semibold mb-4 sm:mb-6">
                NIRVRUV
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
                Where Brands Become <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                  Infrastructure
                </span>
              </h1>
              
              <div className="mt-6 text-zinc-300 text-xs sm:text-lg font-medium drop-shadow-md">
                Founded in 2023 &nbsp;•&nbsp; Built on execution &nbsp;•&nbsp; Engineered for scale
              </div>

              <p className="mt-4 sm:mt-8 text-zinc-400 leading-relaxed text-xs sm:text-lg max-w-2xl mx-auto hidden sm:block">
                Nirvruv is a strategic marketing and AI systems firm designed for businesses that intend to grow with precision.
              </p>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
                <Link href="/services">
                  <button className="rounded-full bg-white text-black px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold shadow-xl transition-transform hover:scale-105">
                    Services
                  </button>
                </Link>
                <Link href="/automations">
                  <button className="rounded-full border border-zinc-600 px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white bg-black/40 backdrop-blur-md hover:border-zinc-300 transition-transform hover:scale-105">
                    Automations
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Laptop Base (Keyboard & Trackpad) */}
          <div className="relative w-[105%] -left-[2.5%] h-4 sm:h-8 bg-[#333] rounded-b-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-t border-[#444] flex justify-center">
            {/* Trackpad notch */}
            <div className="w-16 sm:w-32 h-1.5 sm:h-3 bg-[#222] rounded-b-md shadow-inner" />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium drop-shadow-lg">Scroll down</span>
          <div className="w-px h-8 bg-gradient-to-b from-zinc-400 to-transparent" />
        </motion.div>

      </div>
    </div>
  );
}
