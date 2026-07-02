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
        {/* Mobile: gallery-plate layout */}
        <div className="relative z-20 flex min-h-[100svh] flex-col px-6 pb-[calc(var(--safe-bottom)+2rem)] pt-[calc(var(--safe-top)+var(--mobile-nav-height)+2rem)] md:hidden">
          {/* Wall-label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            className="max-w-fit"
          >
            <p className="text-[11px] tracking-[0.18em] uppercase text-ash leading-relaxed">
              {"Portfolio · 2026"}
            </p>
            <p className="text-[11px] tracking-[0.18em] uppercase text-pebble leading-relaxed">
              Rennes, France
            </p>
          </motion.div>

          {/* Name: large editorial anchor, two lines */}
          <motion.h1
            style={{ y: textY, opacity: textOpacity }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.25 }}
            className="mt-10 text-[clamp(3.5rem,16vw,5.5rem)] font-normal tracking-[-0.03em] text-ink leading-[0.9]"
          >
            {"Théo"}
            <br />
            Phan
          </motion.h1>

          {/* Framed portrait plate */}
          <motion.figure
            style={{ y: photoY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.4 }}
            className="mt-10"
          >
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[19rem] overflow-hidden border border-stone bg-paper">
              <img
                src={`${import.meta.env.BASE_URL}images/optimized/me_.webp`}
                alt={"Théo Phan"}
                loading="eager"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-contain object-bottom select-none"
              />
            </div>
          </motion.figure>

          {/* Bio, below the plate */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.55 }}
            className="mt-10 max-w-sm"
          >
            <p className="text-sm text-ash leading-relaxed">
              Half engineer, half pixel-pusher. A computer-science student at INSA Rennes,
              building in AI and full-stack.
            </p>

            <div className="mt-6 h-px w-10 bg-stone" />

            <p className="mt-5 text-[13px] text-ash leading-relaxed">
              Open to a summer 2026 internship.
            </p>

            <button
              onClick={() => onCvToggle(true)}
              className="group mt-6 inline-flex items-center gap-2 text-[13px] text-ink cursor-pointer"
            >
              <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-ink">
                View curriculum vitae
              </span>
              <span className="text-ash transition-transform duration-300 group-hover:translate-x-0.5">
                {"→"}
              </span>
            </button>
          </motion.div>
        </div>

        {/* Desktop: original layout, unchanged */}
        <div className="relative z-20 hidden min-h-[100svh] md:block">
          {/* Gallery wall-label, top-left */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            className="relative max-w-fit md:absolute md:left-12 md:top-28"
          >
            <p className="text-[11px] tracking-[0.18em] uppercase text-ash leading-relaxed">
              {"Portfolio \u00B7 2026"}
            </p>
            <p className="text-[11px] tracking-[0.18em] uppercase text-pebble leading-relaxed">
              Rennes, France
            </p>
          </motion.div>

          {/* Name: the large editorial anchor */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="relative mt-10 max-w-[20rem] md:absolute md:left-12 md:right-auto md:top-1/2 md:mt-0 md:max-w-[42rem] md:-translate-y-1/2"
          >
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.25 }}
              className="text-[clamp(3rem,14vw,4.5rem)] font-normal tracking-[-0.03em] text-ink leading-[0.92] md:text-[clamp(5rem,9vw,8.5rem)]"
            >
              {"Th\u00E9o Phan"}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.45 }}
              className="mt-6 max-w-sm md:mt-8"
            >
              <p className="text-sm text-ash leading-relaxed md:text-base">
                Half engineer, half pixel-pusher. A computer-science student at INSA Rennes,
                building in AI and full-stack.
              </p>

              <div className="mt-6 h-px w-10 bg-stone" />

              <p className="mt-5 text-[13px] text-ash leading-relaxed">
                Open to a summer 2026 internship.
              </p>

              <button
                onClick={() => onCvToggle(true)}
                className="group mt-6 inline-flex items-center gap-2 text-[13px] text-ink cursor-pointer"
              >
                <span className="border-b border-transparent pb-0.5 transition-colors duration-300 group-hover:border-ink">
                  View curriculum vitae
                </span>
                <span className="text-ash transition-transform duration-300 group-hover:translate-x-0.5">
                  {"\u2192"}
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Photo cutout */}
          <motion.div
            style={{ y: photoY }}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease }}
            className="relative z-10 mt-12 flex flex-1 items-end md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:justify-end md:right-[4%] pointer-events-none"
          >
            <div className="relative -mx-6 flex w-[calc(100%+3rem)] min-h-[20rem] items-end justify-end overflow-hidden border-t border-stone/70 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(211,206,197,0.34)_100%)] px-4 pb-[calc(var(--safe-bottom)+0.75rem)] pt-8 md:mx-0 md:w-auto md:min-h-0 md:border-t-0 md:bg-none md:px-0 md:pb-0 md:pt-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_18%,rgba(211,206,197,0.5),transparent_58%)] md:hidden" />
              <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0)_100%)] md:hidden" />
              <img
                src={`${import.meta.env.BASE_URL}images/optimized/me_.webp`}
                alt={"Th\u00E9o Phan"}
                loading="eager"
                fetchPriority="high"
                className="relative h-[40svh] min-h-[17rem] max-h-[25rem] w-auto max-w-none translate-x-[8%] object-contain object-bottom select-none sm:translate-x-[12%] md:h-[88svh] md:min-h-0 md:max-h-none md:translate-x-0 md:max-w-full"
              />
            </div>
          </motion.div>
        </div>

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
