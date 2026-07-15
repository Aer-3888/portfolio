import { memo, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

function ProjectGalleryCard({ project, index, onSelect }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const handleClick = useCallback(() => onSelect(project), [onSelect, project]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ["0%", "0%"] : ["-5%", "5%"]
  );

  const number = String(index + 1).padStart(2, "0");
  const imageFirst = index % 2 === 0;

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`View ${project.title} details`}
      className="group relative grid w-full cursor-pointer grid-cols-1 items-center gap-6 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 md:grid-cols-2 md:gap-16"
    >
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-colors duration-700 group-hover:border-white/20 ${
          imageFirst ? "md:order-1" : "md:order-2"
        }`}
      >
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform"
        >
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>

      <div
        className={`flex flex-col gap-4 md:gap-5 md:px-4 ${imageFirst ? "md:order-2" : "md:order-1"}`}
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-2xl leading-none text-white/15 tabular-nums">
            {number}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            {project.type}
          </span>
        </div>

        <h3 className="text-3xl font-medium tracking-tight leading-[1.05] text-white sm:text-4xl md:text-5xl">
          {project.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-wide text-neutral-500">
          <span>{project.category}</span>
          <span className="text-neutral-700">·</span>
          <span>{project.year}</span>
        </div>

        {(project.metric || project.services) && (
          <p className="max-w-md text-sm leading-relaxed text-neutral-400">
            {project.metric || project.services}
          </p>
        )}

        <span className="mt-2 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-neutral-400 transition-colors duration-300 group-hover:text-white">
          View project
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.button>
  );
}

export default memo(ProjectGalleryCard);
