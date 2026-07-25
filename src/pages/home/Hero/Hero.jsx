import { memo, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import Stamp from "./Stamp";

const ease = [0.22, 1, 0.36, 1];

const heroSequence = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.14,
    },
  },
};

const nameSequence = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const nameLine = {
  hidden: { opacity: 0, y: 64 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

const riseIn = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.76, ease },
  },
};

const fieldSequence = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const portraitEntrance = {
  hidden: { opacity: 0, x: 116, rotate: 8.5, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 1.8,
    scale: 1,
    transition: { duration: 1.02, ease },
  },
};

const lineDraw = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.82, ease },
  },
};

const barcodeReveal = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.64, ease },
  },
};

const tapeEntrance = {
  hidden: { opacity: 0, scaleX: 0.35, y: -8 },
  visible: {
    opacity: 1,
    scaleX: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.18, ease },
  },
};

const stampEntrance = {
  hidden: { opacity: 0, scale: 0.72, rotate: -22 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -11,
    transition: { duration: 0.62, delay: 0.2, ease },
  },
};

function Barcode({ vertical = false, className = "" }) {
  const direction = vertical ? "to bottom" : "to right";

  return (
    <motion.span
      aria-hidden="true"
      variants={barcodeReveal}
      className={className}
      style={{
        backgroundImage: `repeating-linear-gradient(${direction}, #121212 0 2px, transparent 2px 5px, #121212 5px 6px, transparent 6px 10px, #121212 10px 13px, transparent 13px 15px, #121212 15px 16px, transparent 16px 21px, #121212 21px 24px, transparent 24px 26px)`,
        transformOrigin: vertical ? "center top" : "left center",
      }}
    />
  );
}

function Field({ label, value }) {
  return (
    <motion.div variants={riseIn} className="min-w-0">
      <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#121212]/40 sm:text-[9px]">
        {label}
      </div>
      <div className="mt-1 truncate font-mono text-[10px] font-bold uppercase tracking-[0.04em] text-[#121212]/72 sm:text-xs">
        {value}
      </div>
    </motion.div>
  );
}

function Hero({ onCvToggle }) {
  const { t } = useTranslation("home");
  const prefersReducedMotion = useReducedMotion();
  const [entranceReady, setEntranceReady] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const passengerName = t("hero.passengerValue").trim().split(/\s+/);
  const familyName = passengerName.pop();
  const givenName = passengerName.join(" ");

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const timer = window.setTimeout(() => setEntranceReady(true), 80);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  const goToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={containerRef}
      className="relative min-h-[100svh] overflow-x-hidden bg-[#f1eee7] text-[#121212]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(64,51,35,.16) .45px, transparent .45px), linear-gradient(104deg, rgba(255,255,255,.18), transparent 42%)",
          backgroundSize: "6px 6px, auto",
        }}
      />

      <motion.div
        variants={heroSequence}
        initial={prefersReducedMotion ? { opacity: 0 } : "hidden"}
        animate={prefersReducedMotion ? { opacity: 1 } : entranceReady ? "visible" : "hidden"}
        transition={prefersReducedMotion ? { duration: 0.55, ease } : undefined}
        className="relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-4 pb-3 pt-[calc(var(--safe-top)+5.35rem)] sm:px-6 md:px-12 md:pb-[clamp(1rem,4vh,2.25rem)] md:pt-[clamp(5.5rem,14vh,7rem)]"
      >
        <motion.div
          variants={riseIn}
          className="relative flex min-h-8 items-start pt-2 font-mono text-[8px] uppercase tracking-[0.16em] sm:text-[9px] md:min-h-10 md:pt-3 md:text-[10px]"
        >
          <motion.span
            aria-hidden="true"
            variants={lineDraw}
            className="absolute inset-x-0 top-0 h-px origin-left bg-[#121212]"
          />
          <span className="flex items-center gap-2 font-bold">
            <span aria-hidden="true" className="text-[#c8452b]">
              ✈
            </span>
            {t("hero.passLabel")}
          </span>
          <span className="absolute left-1/2 hidden -translate-x-1/2 text-[#121212]/48 sm:block">
            {t("hero.carrier")}
          </span>
          <span className="ml-auto text-[#121212]/42">{t("hero.docValue")}</span>
        </motion.div>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_clamp(6.75rem,34vw,8rem)] gap-x-4 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-x-6 md:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)] md:gap-x-0">
          <section className="flex min-w-0 flex-col justify-center overflow-hidden border-r border-dashed border-[#121212]/30 py-4 pr-4 md:overflow-visible md:py-[clamp(1rem,5vh,2.5rem)] md:pr-10 lg:pr-16">
            <motion.h1
              variants={nameSequence}
              className="w-full min-w-0 max-w-[7ch] font-serif text-[clamp(3rem,16vw,5.2rem)] leading-[0.72] tracking-[-0.055em] md:text-[clamp(4rem,min(12vw,18vh),11.5rem)] md:leading-[0.7]"
            >
              <motion.span variants={nameLine} className="block whitespace-nowrap">
                {givenName}
              </motion.span>
              <motion.span
                variants={nameLine}
                className="block whitespace-nowrap pl-[0.12em] italic text-[#c8452b] sm:pl-[0.22em] md:pl-[0.42em]"
              >
                {familyName}
              </motion.span>
            </motion.h1>

            <motion.div
              variants={riseIn}
              className="mt-4 text-[#121212]/62 md:mt-[clamp(1rem,4vh,2rem)]"
            >
              <p className="max-w-[15ch] font-serif text-[clamp(1.35rem,6.3vw,2rem)] italic leading-[0.94] tracking-[-0.025em] md:text-[clamp(1.5rem,min(3.6vw,6vh),3.8rem)] md:leading-[0.92]">
                {t("hero.routeSub")}
              </p>
            </motion.div>

            <motion.div
              variants={fieldSequence}
              className="hidden max-w-2xl grid-cols-3 gap-4 border-t border-[#121212]/25 pt-4 md:mt-[clamp(1rem,4vh,2.75rem)] md:grid md:gap-8 md:pt-5"
            >
              <Field label={t("hero.classLabel")} value={t("hero.classValue")} />
              <Field label={t("hero.seatLabel")} value={t("hero.seatValue")} />
              <Field label={t("hero.boardingLabel")} value={t("hero.boardingValue")} />
            </motion.div>
          </section>

          <aside className="relative flex min-w-0 items-center justify-end py-3 md:py-[clamp(1rem,5vh,2.5rem)] md:pl-10 lg:pl-14">
            <div className="relative w-full max-w-[8rem] sm:max-w-[11rem] md:max-w-[26rem]">
              <motion.figure
                variants={portraitEntrance}
                style={{ y: prefersReducedMotion ? 0 : portraitY }}
                whileHover={prefersReducedMotion ? undefined : { rotate: 0, y: -5 }}
                transition={{ duration: 0.45, ease }}
                className="group relative aspect-[4/5] bg-[#e7e0d4] p-1.5 pb-6 shadow-[0_18px_35px_rgba(72,55,35,0.16)] md:p-3 md:pb-11"
              >
                <motion.span
                  aria-hidden="true"
                  variants={tapeEntrance}
                  className="absolute -top-2 left-1/2 z-30 h-4 w-12 -translate-x-1/2 -rotate-2 bg-[#c9b78f]/55 shadow-sm backdrop-blur-[1px] md:-top-3 md:h-6 md:w-24"
                />
                <div className="relative h-full overflow-hidden bg-[#ded8cc]">
                  <img
                    src={import.meta.env.BASE_URL + "images/optimized/me_.webp"}
                    alt="Théo Phan"
                    loading="eager"
                    fetchPriority="high"
                    className="absolute inset-x-0 bottom-0 h-[97%] w-full object-contain object-bottom grayscale transition duration-700 group-hover:grayscale-0"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-2 top-2 font-mono text-[6px] uppercase tracking-[0.15em] text-[#121212]/40 md:left-3 md:top-3 md:text-[8px]"
                  >
                    hi :)
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 left-2 font-mono text-[6px] uppercase tracking-[0.16em] text-[#121212]/45 md:bottom-4 md:left-4 md:text-[8px]"
                >
                  Portrait
                </span>
                <motion.div
                  variants={stampEntrance}
                  className="pointer-events-none absolute bottom-1 right-1 z-20 w-12 opacity-80 md:-bottom-8 md:-right-9 md:w-28 md:opacity-100"
                >
                  <Stamp className="h-full w-full" />
                </motion.div>
              </motion.figure>

            </div>
          </aside>

          <motion.div
            variants={fieldSequence}
            className="col-span-2 grid grid-cols-3 gap-3 border-t border-[#121212]/25 py-3 md:hidden"
          >
            <Field label={t("hero.classLabel")} value={t("hero.classValue")} />
            <Field label={t("hero.seatLabel")} value={t("hero.seatValue")} />
            <Field label={t("hero.boardingLabel")} value={t("hero.boardingValue")} />
          </motion.div>
        </div>

        <motion.div
          variants={riseIn}
          className="flex items-center justify-between gap-2 border-y border-[#121212] py-3 md:gap-8 md:py-4"
        >
          <div className="flex min-w-0 items-center gap-2 md:gap-4">
            <button
              type="button"
              onClick={goToProjects}
              className="group inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap bg-[#121212] px-3 font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5 md:min-h-12 md:gap-6 md:px-6 md:text-[10px] md:tracking-[0.12em]"
            >
              {t("hero.ctaProjects")}
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </button>
            <button
              type="button"
              onClick={() => onCvToggle(true)}
              className="inline-flex min-h-10 shrink-0 cursor-pointer items-center whitespace-nowrap border-b border-[#121212]/35 px-1 font-mono text-[8px] font-bold uppercase tracking-[0.08em] transition-colors hover:border-[#121212] md:min-h-12 md:text-[10px] md:tracking-[0.12em]"
            >
              {t("hero.ctaCv")}
            </button>
          </div>

          <div className="flex shrink-0 items-end gap-2 max-[359px]:hidden md:gap-3">
            <Barcode className="h-5 w-12 sm:w-20 md:h-7 md:w-36" />
            <span className="hidden font-mono text-[7px] tracking-[0.14em] text-[#121212]/40 md:inline">
              TP / 2027
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={riseIn}
          className="flex items-center pt-2 font-mono text-[7px] uppercase tracking-[0.14em] text-[#121212]/42 md:pt-3 md:text-[9px]"
        >
          <span>{t("hero.route")}</span>
          <span className="ml-auto hidden sm:inline" aria-hidden="true">
            {t("hero.scroll")}
          </span>
        </motion.div>
      </motion.div>
    </header>
  );
}

export default memo(Hero);
