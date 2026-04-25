import { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import InfiniteLoopText from "../../../components/InfiniteLoopText";

function Hero({ onCvToggle }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Animation transforms
  const driftScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const driftY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const initialTextScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  // Opacity Logic
  const tickerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const bioOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 1, 0]);
  const bioY = useTransform(scrollYProgress, [0, 0.4, 0.7], [0, 0, -20]);
  
  // The big name "THEO PHAN" behind the subject
  const nameOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[110dvh] w-full bg-transparent">
      {/* Hero Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Layer 1: Big Name Behind Subject */}
        <motion.div
          style={{ 
            opacity: nameOpacity, 
            scale: driftScale, 
            y: driftY,
            willChange: "transform, opacity"
          }}
          className="absolute z-10 w-full flex justify-center bottom-[8%]"
        >
          <h1 className="text-[15vw] font-black text-white/90 leading-none tracking-tighter whitespace-nowrap [text-shadow:_0_4px_30px_rgba(0,0,0,0.5)]">
            THEO PHAN
          </h1>
        </motion.div>

        {/* Layer 2: Main Subject Image */}
        <motion.div 
          style={{ 
            scale: driftScale, 
            y: driftY,
            willChange: "transform"
          }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/me_.png`}
            alt="Theo Phan"
            loading="eager"
            fetchPriority="high"
            className="h-[100dvh] w-auto max-w-full object-contain"
          />
        </motion.div>

        {/* Layer 3: Front Text Loop (fades out early) — hidden on mobile to avoid clutter */}
        <motion.div
          style={{ opacity: tickerOpacity, scale: initialTextScale, y: driftY }}
          className="absolute z-30 inset-x-0 top-[65%] -translate-y-1/2 hidden md:block"
        >
          <InfiniteLoopText speed={0.2} />
        </motion.div>

        {/* Layer 4: Executive Summary Overlay
            Mobile: anchored to bottom-left so it clears the face/upper-body area of the image.
            Desktop: anchored to top-left as original. */}
        <motion.div
          style={{ opacity: bioOpacity, y: bioY }}
          className="absolute z-40
            bottom-[20%] left-6 right-6
            md:bottom-auto md:top-0 md:left-12 md:right-auto md:w-auto
            max-w-sm md:max-w-lg
            space-y-4 md:space-y-6
            pt-0 md:pt-14"
        >
          <p className="text-white text-lg md:text-3xl font-extrabold tracking-tight leading-[1.15] md:leading-[0.9] uppercase">
            Engineering systems where technical precision meets creative exploration.
          </p>
          <p className="text-neutral-400 text-xs md:text-base leading-relaxed font-mono">
            CS Student at INSA Rennes, specializing in AI Engineering and
            Full-Stack development.
          </p>
          <button
            onClick={() => onCvToggle(true)}
            className="group relative px-6 py-3 min-h-[44px] border border-white/20 rounded-sm font-mono text-[10px] uppercase tracking-widest text-white overflow-hidden transition-colors hover:text-black cursor-pointer"
          >
            <motion.div
              className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            />
            <span className="relative z-10">View Curriculum Vitae</span>
          </button>
        </motion.div>

        {/* Subtle Gradient Overlays for Depth */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/80" />
        </div>
      </div>
    </div>
  );
}

export default memo(Hero);
