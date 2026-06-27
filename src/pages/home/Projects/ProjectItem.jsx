import { memo } from "react";
import { motion } from "framer-motion";

function ProjectItem({ project, isCoarsePointer, onSelect }) {
  const { title, year, services, category, metric } = project;

  if (isCoarsePointer) {
    return (
      <div
        onClick={() => onSelect(project)}
        className="relative w-full border-t border-stone flex items-start justify-between py-6 cursor-pointer active:bg-stone/20 transition-colors"
      >
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-medium tracking-tight text-ink leading-snug">{title}</h3>
          <span className="text-[12px] text-ash">
            {category} · {year}
          </span>
          {metric && <span className="text-[12px] text-ash">{metric}</span>}
        </div>
        <span className="text-pebble text-lg shrink-0 ml-4">→</span>
      </div>
    );
  }

  return (
    <motion.div
      initial="idle"
      whileHover="hover"
      onClick={() => onSelect(project)}
      className="group relative w-full border-t border-stone flex flex-col justify-center cursor-pointer py-7"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-0">
        <div className="flex items-baseline gap-5">
          <span className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 mix-blend-difference w-20 shrink-0">
            {category}
          </span>
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mix-blend-difference leading-snug">
            {title}
          </h3>
        </div>

        <div className="flex flex-col md:items-end gap-1 shrink-0">
          <span className="text-[12px] text-neutral-500 mix-blend-difference">{year}</span>
          {metric && (
            <span className="text-[12px] text-neutral-500 mix-blend-difference md:text-right max-w-[18rem]">
              {metric}
            </span>
          )}
        </div>
      </div>

      <motion.div
        className="flex items-center justify-between overflow-hidden md:pl-[6.25rem]"
        variants={{
          idle: { opacity: 0, height: 0, marginTop: 0 },
          hover: { opacity: 1, height: "auto", marginTop: 12 },
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[13px] text-neutral-500 mix-blend-difference leading-relaxed">
          {services}
        </p>

        <motion.span
          className="text-white mix-blend-difference text-lg shrink-0 ml-4"
          variants={{ idle: { opacity: 0, x: -8 }, hover: { opacity: 1, x: 0 } }}
        >
          →
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default memo(ProjectItem);
