import { memo } from "react";
import { motion } from "framer-motion";

function ProjectItem({ project, isCoarsePointer, onSelect }) {
  const { title, year, services, category } = project;

  const containerVariants = {
    idle: { height: "auto", minHeight: 80 },
    hover: { height: "auto", minHeight: 180 },
  };

  const textVariants = {
    idle: { x: 0, opacity: 0.6 },
    hover: { x: 20, opacity: 1 },
  };

  const arrowVariants = {
    idle: { rotate: -45, opacity: 0, x: -20 },
    hover: { rotate: 0, opacity: 1, x: 0 },
  };

  if (isCoarsePointer) {
    return (
      <div
        onClick={() => onSelect(project)}
        className="relative w-full border-b border-neutral-800 flex items-center justify-between px-6 py-6 cursor-pointer active:bg-white/5 transition-colors contain-content"
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-3xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            {title}
          </h3>
          <span className="text-xs font-mono text-neutral-500">
            {category} — {year}
          </span>
        </div>
        <span className="text-neutral-600 text-xl shrink-0 ml-4">→</span>
      </div>
    );
  }

  return (
    <motion.div
      initial="idle"
      whileHover="hover"
      variants={containerVariants}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      onClick={() => onSelect(project)}
      className="relative w-full border-b border-neutral-800 flex flex-col justify-center group cursor-pointer overflow-hidden py-8 md:py-10 contain-content"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 md:px-12 z-10 gap-2 md:gap-0">
        <motion.div variants={textVariants} className="flex items-baseline gap-4">
          <span className="text-[10px] md:text-xs font-mono text-neutral-500 uppercase tracking-widest">{category}</span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mix-blend-difference leading-[0.9]">
            {title}
          </h3>
        </motion.div>

        <span className="text-sm md:text-base font-mono text-neutral-500 mix-blend-difference z-10">
          {year}
        </span>
      </div>

      <motion.div
        className="px-6 md:px-12 mt-4 md:mt-6 flex items-center justify-between z-10"
        initial={{ opacity: 0, y: 20 }}
        variants={{
          idle: { opacity: 0, y: 10 },
          hover: { opacity: 1, y: 0, transition: { delay: 0.1 } },
        }}
      >
        <p className="text-neutral-400 font-light text-sm md:text-lg tracking-wide uppercase">
          {services}
        </p>

        <motion.svg
          variants={arrowVariants}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 md:w-12 md:h-12 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </motion.svg>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-neutral-800/20 pointer-events-none"
        variants={{ idle: { opacity: 0 }, hover: { opacity: 1 } }}
      />
    </motion.div>
  );
}

export default memo(ProjectItem);
