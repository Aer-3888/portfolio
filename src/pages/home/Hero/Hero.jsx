import { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

function Barcode({ vertical, className }) {
  const dir = vertical ? "to bottom" : "to right";
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        backgroundImage: `repeating-linear-gradient(${dir}, #1b1b1b 0 2px, transparent 2px 5px, #1b1b1b 5px 6px, transparent 6px 10px, #1b1b1b 10px 13px, transparent 13px 15px, #1b1b1b 15px 16px, transparent 16px 21px, #1b1b1b 21px 24px, transparent 24px 26px)`,
      }}
    />
  );
}

function Field({ label, value, accent }) {
  return (
    <div className="py-3">
      <div className="text-[9px] tracking-[0.14em] text-[#121212]/40">{label}</div>
      <div
        className="mt-1 text-[11px] tracking-[0.06em]"
        style={accent ? { color: "#c8452b" } : undefined}
      >
        {value}
      </div>
    </div>
  );
}

function Hero({ onCvToggle }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const goToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={containerRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#f1eee7] text-[#121212]"
    >
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1880px] px-5 pb-8 pt-[calc(var(--safe-top)+6.5rem)] sm:px-8 md:px-4 md:pb-10 md:pt-28 lg:px-5 xl:px-6">
        <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="mr-4 hidden shrink-0 flex-col items-center justify-end border-r border-dashed border-[#121212]/30 pr-4 md:flex lg:mr-6 lg:pr-6"
        >
          <Barcode vertical className="h-32 w-5 shrink-0" />
        </motion.aside>

        <div className="flex flex-1 flex-col">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="relative flex items-center border-t border-[#121212] pt-3 font-mono text-[10px] uppercase tracking-[0.14em] md:text-[11px]"
          >
            <span className="flex items-center gap-2">
              <span aria-hidden="true">✈</span> Boarding pass / Théo Phan
            </span>
            <span className="absolute left-1/2 hidden -translate-x-1/2 text-[#121212]/55 sm:block">
              Rennes → ANY
            </span>
          </motion.div>

          <div className="grid flex-1 items-center gap-12 py-10 md:grid-cols-[minmax(0,1fr)_minmax(320px,.74fr)] md:gap-14 md:py-12 lg:gap-24">
            <motion.div style={{ y: copyY }} className="relative z-20">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
                className="mb-5 max-w-md text-sm leading-relaxed text-[#121212]/60 md:mb-8"
              >
                Engineer, photographer, and compulsive tinkerer. I like software most when it touches
                something real.
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.16, ease }}
                className="max-w-[16ch] font-serif text-[clamp(4rem,10vw,9.5rem)] leading-[0.78] tracking-[-0.045em]"
              >
                I build software that{" "}
                <span className="italic text-[#c8452b] underline decoration-[#c8452b]/30 decoration-[3px] underline-offset-[8px]">
                  escapes
                </span>{" "}
                the screen.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.75 }}
                className="mt-8 flex flex-wrap items-center gap-5 md:mt-10"
              >
                <button
                  type="button"
                  onClick={goToProjects}
                  className="group inline-flex min-h-12 items-center gap-6 bg-[#121212] px-6 font-mono text-[11px] uppercase tracking-[0.12em] text-white transition-transform hover:-translate-y-0.5"
                >
                  Read the stories
                  <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                </button>
                <button
                  type="button"
                  onClick={() => onCvToggle(true)}
                  className="inline-flex min-h-12 items-center border-b border-[#121212]/35 px-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:border-[#121212]"
                >
                  The practical CV
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: portraitY }}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease }}
              className="relative z-10 mx-auto w-[min(84vw,24rem)] md:ml-auto md:mr-0 md:w-full md:max-w-[28rem] lg:max-w-[30rem]"
            >
              <figure className="relative aspect-[4/5] overflow-hidden bg-[#e7e2d8]">
                <img
                  src={import.meta.env.BASE_URL + "images/optimized/me_.webp"}
                  alt="Théo Phan"
                  loading="eager"
                  fetchPriority="high"
                  className="absolute inset-x-0 bottom-0 h-[96%] w-full object-contain object-bottom grayscale"
                />
              </figure>
              <div className="mt-3 grid grid-cols-3 gap-5 border-t border-[#121212]/30 font-mono uppercase">
                <Field label="Class" value="CS Student" />
                <Field label="Seat" value="4INFO" accent />
                <Field label="Boarding" value="Summer ’27" />
              </div>
            </motion.div>
          </div>

          <div className="mb-8 flex items-end border-t border-dashed border-[#121212]/35 pt-5 md:hidden">
            <Barcode className="h-8 w-28 shrink-0" />
          </div>

          <div className="flex items-end justify-between border-b border-[#121212] pb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#121212]/50">
            <span className="sm:hidden">Rennes → ANY</span>
            <span className="ml-auto" aria-hidden="true">( Scroll to begin )</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Hero);
