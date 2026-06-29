import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ProjectGalleryCard from "./ProjectGalleryCard";
import { PROJECTS } from "../../config/siteData";

// Vertical, dark, editorial gallery. Same engine on desktop and mobile: cards stack on
// small screens and alternate left/right from md up. Natural scroll, no gate.
function ProjectGallery({ onSelect }) {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-32 pt-28 md:px-12 md:pt-40">
      {/* Header */}
      <motion.header
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-24 md:mb-36"
      >
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
          Selected
          <br />
          <span className="text-neutral-600">Projects</span>
        </h1>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-neutral-500">2024 - 2026</p>
      </motion.header>

      {/* Cards */}
      <div className="flex flex-col gap-28 md:gap-44">
        {PROJECTS.map((project, i) => (
          <ProjectGalleryCard key={project.id} project={project} index={i} onSelect={onSelect} />
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-32 flex justify-center md:mt-48">
        <button
          onClick={() => navigate("/contact")}
          className="group flex cursor-pointer flex-col items-center gap-6"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black">
            <span className="text-2xl transition-transform duration-500 group-hover:translate-x-2">
              →
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 transition-colors duration-500 group-hover:text-white">
              Let&apos;s build
            </span>
            <span className="text-lg font-black uppercase tracking-tighter text-white/40 transition-colors duration-500 group-hover:text-white">
              Something Together
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default memo(ProjectGallery);
