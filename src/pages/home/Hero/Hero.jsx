import { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Hero({ onCvToggle }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Subtle scroll motion only.
  const textY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -44]);

  const ease = [0.22, 1, 0.36, 1];

  return (
    <div ref={containerRef} className="relative w-full bg-paper">
      <div className="relative min-h-[100svh] w-full overflow-hidden">
        {/* Gallery wall-label, top-left */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.1 }}
          className="absolute top-28 left-6 md:left-12 z-20"
        >
          <p className="text-[11px] tracking-[0.18em] uppercase text-ash leading-relaxed">
            Portfolio · 2026
          </p>
          <p className="text-[11px] tracking-[0.18em] uppercase text-pebble leading-relaxed">
            Rennes, France
          </p>
        </motion.div>

        {/* Photo cutout */}
        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
          className="absolute inset-x-0 bottom-0 z-10 flex justify-center md:justify-end md:right-[4%] pointer-events-none"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/me_.png`}
            alt="Théo Phan"
            loading="eager"
            fetchPriority="high"
            className="h-[52svh] md:h-[88svh] w-auto max-w-full object-contain object-bottom select-none"
          />
        </motion.div>

        {/* Name: the large editorial anchor (top zone on mobile, clear of the photo) */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute z-20 left-6 right-6 top-40
            md:left-12 md:right-auto md:top-1/2 md:-translate-y-1/2 md:max-w-[42rem]"
        >
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.25 }}
            className="text-[clamp(3rem,15vw,3.5rem)] md:text-[clamp(5rem,9vw,8.5rem)]
              font-normal tracking-[-0.03em] text-ink leading-[0.92]"
          >
            Théo Phan
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.45 }}
            className="mt-6 md:mt-8 max-w-sm"
          >
            <p className="text-sm md:text-base text-ash leading-relaxed">
              Half engineer, half pixel-pusher. A computer-science student at
              INSA Rennes, building in AI and full-stack.
            </p>

            <div className="mt-6 h-px w-10 bg-stone" />

            <p className="mt-5 text-[13px] text-ash leading-relaxed">
              Open to a summer 2026 internship.
            </p>

            <button
              onClick={() => onCvToggle(true)}
              className="group mt-6 inline-flex items-center gap-2 text-[13px] text-ink cursor-pointer"
            >
              <span className="border-b border-transparent group-hover:border-ink transition-colors duration-300 pb-0.5">
                View curriculum vitae
              </span>
              <span className="text-ash transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease, delay: 0.9 }}
          className="absolute bottom-10 left-6 md:left-12 z-20 hidden md:flex items-center gap-3"
        >
          <span className="h-8 w-px bg-stone" />
          <span className="text-[11px] tracking-[0.18em] uppercase text-pebble">Scroll</span>
        </motion.div>
      </div>
    </div>
  );
}

export default memo(Hero);
