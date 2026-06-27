// src/pages/Projects/MobileProjectList.jsx
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileProjectCard from "./MobileProjectCard";
import { PROJECTS } from "../../config/siteData";

function MobileProjectList({ onProjectSelect, onScroll }) {
  const handleProjectSelect = useCallback(
    (project) => {
      onProjectSelect(project);
    },
    [onProjectSelect]
  );
  const navigate = useNavigate();

  return (
    <div
      className="absolute inset-0 overflow-y-scroll overscroll-contain"
      style={{ WebkitOverflowScrolling: "touch" }}
      onScroll={onScroll}
    >
      <div className="px-6 pt-24 pb-20 flex flex-col gap-4 min-h-full">
        {/* Header */}
        <div className="mb-10 px-2">
          <h2 className="text-5xl font-black uppercase tracking-tighter leading-[0.85]">
            Selected
            <br />
            <span className="text-neutral-600">Projects</span>
          </h2>
          <p className="text-xs text-neutral-500 uppercase tracking-wide mt-5">2024 · 2026</p>
        </div>

        {/* Project list */}
        <div className="flex flex-col gap-3">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            >
              <MobileProjectCard project={project} onSelect={handleProjectSelect} />
            </motion.div>
          ))}
        </div>

        {/* Contact link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: PROJECTS.length * 0.06 + 0.1 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => navigate("/contact")}
            className="group flex items-center gap-4 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:text-black transition-all duration-300">
              <span className="text-base group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
            <span className="text-xs uppercase tracking-wide text-neutral-500 group-hover:text-white transition-colors">
              Let's build something together
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default memo(MobileProjectList);
