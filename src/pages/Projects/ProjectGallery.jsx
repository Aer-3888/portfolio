import { memo, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ProjectGalleryCard from "./ProjectGalleryCard";

const ease = [0.16, 1, 0.3, 1];

const headerSequence = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const lineReveal = {
  hidden: { opacity: 0, y: "105%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.9, ease },
  },
};

const riseIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

function ProjectGallery({ projects = [], onSelect }) {
  const prefersReduced = useReducedMotion();
  const { t } = useTranslation("projects");
  const [entranceReady, setEntranceReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setEntranceReady(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-24 pt-[calc(var(--safe-top)+var(--mobile-nav-height)+2.5rem)] sm:px-8 md:px-12 md:pb-36 md:pt-48">
      <motion.header
        variants={headerSequence}
        initial={prefersReduced ? false : "hidden"}
        animate={prefersReduced || entranceReady ? "visible" : "hidden"}
        className="mb-20 grid gap-10 border-b border-black/20 pb-14 md:mb-28 md:grid-cols-12 md:items-end md:pb-20"
      >
        <h1 className="max-w-5xl font-serif text-[clamp(4.5rem,10vw,10rem)] leading-[0.76] tracking-[-0.045em] md:col-span-9">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={lineReveal} className="block">
              {t("page.heading1")}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={lineReveal} className="block">
              {t("page.heading2")}
            </motion.span>
          </span>
        </h1>
        <motion.div variants={riseIn} className="md:col-span-3 md:pb-2">
          <p className="max-w-sm text-sm leading-relaxed text-black/60 md:text-base">
            {t("page.intro")}
          </p>
          <p className="mt-5 text-xs text-black/40">
            {t("page.count", { count: projects.length })}
          </p>
        </motion.div>
      </motion.header>

      <div className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-12 md:gap-y-28">
        {projects.map((project, i) => (
          <ProjectGalleryCard key={project.id} project={project} index={i} onSelect={onSelect} />
        ))}
      </div>

      <motion.p
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease }}
        className="mt-28 border-t border-black/20 pt-8 text-sm text-black/45 md:mt-40"
      >
        {t("page.footer")}
      </motion.p>
    </main>
  );
}

export default memo(ProjectGallery);
