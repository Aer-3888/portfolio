import { memo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

function MobileProjectCard({ project, onSelect }) {
  const handleClick = useCallback(() => {
    onSelect(project);
  }, [onSelect, project]);
  const prefersReduced = useReducedMotion();

  return (
    <motion.button
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={handleClick}
      className="flex items-center w-full h-[120px] bg-neutral-900 border border-white/5 rounded-xl overflow-hidden cursor-pointer group text-left active:scale-[0.97] transition-all shadow-lg"
    >
      {/* Thumbnail */}
      <div className="w-[140px] h-full shrink-0 overflow-hidden relative">
        <img
          src={project.img}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/50" />
      </div>

      {/* Content */}
      <div className="flex-1 px-5 flex flex-col justify-center gap-1 min-w-0">
        <span className="text-[10px] text-neutral-500 uppercase tracking-wide truncate">
          {project.type}
        </span>
        <span className="text-2xl font-black text-white uppercase tracking-tighter leading-none truncate">
          {project.title}
        </span>
        <span className="text-[10px] text-neutral-600 uppercase tracking-wide mt-0.5 truncate">
          {project.category} — {project.year}
        </span>
      </div>

      {/* Arrow */}
      <div className="pr-6 flex items-center justify-center shrink-0">
        <span className="text-neutral-700 group-hover:text-white transition-colors duration-300 text-xl">
          →
        </span>
      </div>
    </motion.button>
  );
}

export default memo(MobileProjectCard);
