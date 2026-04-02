import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import InfiniteLoopText from "../../../components/InfiniteLoopText";
import NavButtons from "../../../components/NavButtons";

export default function Hero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const navItems = [
    { label: "Projects", onClick: () => navigate("/projects") },
    { label: "About", onClick: () => navigate("/about") },
    { label: "Contact", onClick: () => navigate("/contact") },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Track scroll progress for gradual color change (removed unused state)

  // Animation transforms
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["10%", "0%"]);

  // Crossfade Logic
  const tickerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const lockedOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  // Navigation Switch Logic
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[100vh] w-full bg-neutral-900 overflow-x-hidden">
      {/* 1. Text Navigation (Visible at Top, desktop only) */}
      <NavButtons
        items={navItems}
        navOpacity={navOpacity}
        className="hidden md:flex fixed top-8 right-10 z-[999] gap-8 text-white mix-blend-difference"
      />

      {/* Hero Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Layer 1: Text After Scroll Down */}
        <motion.div
          style={{ opacity: lockedOpacity, scale, y }}
          className="absolute z-10 w-full flex justify-center top-[65%] -translate-y-1/2"
        >
          <h1 className="text-[15vw] font-black text-white leading-none tracking-tighter whitespace-nowrap drop-shadow-2xl">
            THEO PHAN
          </h1>
        </motion.div>

        {/* Layer 2: Main Component */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <img
            src={`${import.meta.env.BASE_URL}images/me_.png`}
            alt="Subject"
            className="h-[100dvh] w-auto max-w-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Layer 3: Front Text*/}
        <motion.div
          style={{ opacity: tickerOpacity, scale, y }}
          className="absolute z-30 inset-x-0 top-[65%] -translate-y-1/2"
        >
          <InfiniteLoopText speed={0.2} />
        </motion.div>

        {/* Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-800">
          {/* Dot Pattern */}
          <div
            className="absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Cool Light */}
          <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-neutral-600/30 rounded-full blur-[120px] mix-blend-screen" />

          {/* Subtle Warmth/Accent */}
          <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] bg-orange-900/20 rounded-full blur-[100px] mix-blend-screen" />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-neutral-900/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/50 via-transparent to-neutral-900/50" />
        </div>
      </div>
    </div>
  );
}
