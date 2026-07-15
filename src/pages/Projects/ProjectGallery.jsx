import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProjectGalleryCard from "./ProjectGalleryCard";
import { PROJECTS } from "../../config/siteData";

function ProjectGallery({ onSelect }) {
  const prefersReduced = useReducedMotion();

  return (
    <main className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-24 pt-[calc(var(--safe-top)+var(--mobile-nav-height)+2.5rem)] sm:px-8 md:px-12 md:pb-36 md:pt-48">
      <motion.header
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20 grid gap-10 border-b border-black/20 pb-14 md:mb-28 md:grid-cols-12 md:items-end md:pb-20"
      >
        <h1 className="max-w-5xl font-serif text-[clamp(4.5rem,10vw,10rem)] leading-[0.76] tracking-[-0.045em] md:col-span-9">
          Things I’ve
          <br /> built.
        </h1>
        <div className="md:col-span-3 md:pb-2">
          <p className="max-w-sm text-sm leading-relaxed text-black/60 md:text-base">
            Some are in people’s pockets. Others only exist because I wanted to know how they
            worked.
          </p>
          <p className="mt-5 text-xs text-black/40">
            {PROJECTS.length} projects, 2024—2026
          </p>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-12 md:gap-y-28">
        {PROJECTS.map((project, i) => (
          <ProjectGalleryCard key={project.id} project={project} index={i} onSelect={onSelect} />
        ))}
      </div>

      <p className="mt-28 border-t border-black/20 pt-8 text-sm text-black/45 md:mt-40">
        That’s everything for now.
      </p>
    </main>
  );
}

export default memo(ProjectGallery);
