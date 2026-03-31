// src/pages/Projects/MobileProjectList.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MobileProjectCard from "./MobileProjectCard";
import { PROJECTS } from "../../config/siteData";

export default function MobileProjectList({ onProjectSelect }) {
  const navigate = useNavigate();

  return (
    <div
      className="absolute inset-0 overflow-y-scroll"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="px-5 pt-24 pb-20 flex flex-col gap-3 min-h-full">
        {/* Header */}
        <div className="mb-6">
          <div className="w-8 h-0.5 bg-orange-500 mb-4" />
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
            Selected
            <br />
            Projects
          </h2>
          <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-[0.2em] mt-3">
            [ INDEX.2024_2026 ]
          </p>
        </div>

        {/* Project list */}
        <div className="flex flex-col gap-2">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
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
