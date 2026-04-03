import { motion, useReducedMotion } from "framer-motion";

export default function MobileProjectCard({ project, onClick }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.button
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={onClick}
      className="flex items-center w-full h-[108px] bg-neutral-900 border border-neutral-800 overflow-hidden cursor-pointer group text-left active:scale-[0.98] transition-transform"
    >
      {/* Thumbnail */}
      <div className="w-[130px] h-full shrink-0 overflow-hidden">
        <img
          src={project.img}
          alt={project.title}
          fetchPriority="high"
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-3 flex flex-col justify-center gap-1 min-w-0">
        <span className="font-mono text-[10px] text-orange-500 uppercase tracking-[0.2em] truncate">
          {project.type}
        </span>
        <span className="text-[19px] font-black text-white uppercase tracking-tighter leading-none truncate">
          {project.title}
        </span>
        <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
          {project.category} · {project.year}
        </span>
      </div>

      {/* Arrow */}
      <span className="text-neutral-600 group-hover:text-orange-500 group-active:text-orange-500 transition-colors pr-4 text-sm flex-shrink-0">
        →
      </span>
    </motion.button>
  );
}
