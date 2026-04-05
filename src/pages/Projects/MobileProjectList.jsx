// src/pages/Projects/MobileProjectList.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileProjectCard from "./MobileProjectCard";
import { PROJECTS } from "../../config/siteData";

export default function MobileProjectList({ onProjectSelect, onScroll }) {
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
          <div className="w-10 h-0.5 bg-orange-500 mb-6" />
          <h2 className="text-5xl font-black uppercase tracking-tighter leading-[0.85]">
            Selected
            <br />
            <span className="text-neutral-600">Projects</span>
          </h2>
          <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.3em] mt-5 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-neutral-800" />
            [ INDEX.2024_2026 ]
          </p>
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
              <MobileProjectCard project={project} onClick={() => onProjectSelect(project)} />
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
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
              <span className="text-base group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">
              Let's build something together
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
