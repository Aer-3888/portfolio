import { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import InfiniteLoopText from "../../../components/InfiniteLoopText";

function Hero() {
  const containerRef = useRef(null);

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

  return (
    <div ref={containerRef} className="relative h-[100dvh] w-full bg-neutral-900 overflow-x-hidden">
      {/* Hero Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Layer 1: Text After Scroll Down */}
        <motion.div
          style={{ opacity: lockedOpacity, scale, y }}
          className="absolute z-10 w-full flex justify-center top-[65%] -translate-y-1/2"
        >
          <h1 className="text-[15vw] font-black text-white leading-none tracking-tighter whitespace-nowrap [text-shadow:_0_4px_30px_rgba(0,0,0,0.5)]">
            THEO PHAN
          </h1>
        </motion.div>

        {/* Layer 2: Main Component */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <img
            src={`${import.meta.env.BASE_URL}images/me_.png`}
            alt="Subject"
            loading="eager"
            fetchPriority="high"
            className="h-[100dvh] w-auto max-w-full object-contain"
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
        <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-900">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-neutral-900/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/50 via-transparent to-neutral-900/50" />
        </div>
      </div>
    </div>
  );
}

export default memo(Hero);
