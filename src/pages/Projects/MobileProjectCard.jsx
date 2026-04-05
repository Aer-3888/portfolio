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
      className="flex items-center w-full h-[120px] bg-neutral-900 border border-white/5 rounded-xl overflow-hidden cursor-pointer group text-left active:scale-[0.97] transition-all shadow-lg"
    >
      {/* Thumbnail */}
      <div className="w-[140px] h-full shrink-0 overflow-hidden relative">
        <img
          src={project.img}
          alt={project.title}
          loading="lazy"
          fetchPriority="high"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/50" />
      </div>

      {/* Content */}
      <div className="flex-1 px-5 flex flex-col justify-center gap-1 min-w-0">
        <span className="font-mono text-[9px] text-orange-500 font-bold uppercase tracking-[0.3em] truncate">
          {project.type}
        </span>
        <span className="text-2xl font-black text-white uppercase tracking-tighter leading-none truncate group-hover:text-orange-500 transition-colors">
          {project.title}
        </span>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest truncate">
            {project.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-800" />
          <span className="font-mono text-[9px] text-neutral-500 uppercase font-bold tracking-widest">
            {project.year}
          </span>
        </div>
      </div>

      {/* Arrow */}
      <div className="pr-6 flex items-center justify-center shrink-0">
        <span className="text-neutral-700 group-hover:text-orange-500 transition-all group-hover:translate-x-1 duration-300 text-xl font-light">
          →
        </span>
      </div>
    </motion.button>
  );
}
