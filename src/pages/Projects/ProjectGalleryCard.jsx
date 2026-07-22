import { memo, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CARD_LAYOUTS = [
  "md:col-span-7",
  "md:col-span-5 md:pt-28",
  "md:col-span-5",
  "md:col-span-7 md:pt-20",
  "md:col-span-6",
  "md:col-span-6 md:pt-20",
  "md:col-span-4",
  "md:col-span-4 md:pt-24",
  "md:col-span-4",
  "md:col-span-8 md:col-start-3",
];

const CARD_COLORS = [
  "#ffca45",
  "#f04d2f",
  "#b9d878",
  "#2356d8",
  "#9fc5d1",
  "#c4b6d9",
  "#ef9478",
  "#79aa98",
  "#dbb266",
  "#c9c1b5",
];

function ProjectGalleryCard({ project, index, onSelect }) {
  const { t } = useTranslation("projects");
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
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

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={handleClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-label={t("detail.viewCardAria", { title: project.title })}
      className={`group relative w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f1eee7] ${CARD_LAYOUTS[index] ?? "md:col-span-6"}`}
    >
      <div className="relative mb-6">
        <div
          className="absolute inset-0 translate-x-2 translate-y-2 transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:translate-y-3 md:translate-x-3 md:translate-y-3 md:group-hover:translate-x-5 md:group-hover:translate-y-5"
          style={{ backgroundColor: CARD_COLORS[index] ?? "#c9c1b5" }}
        />
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#d8d3c9]">
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform"
          >
            <img
              src={project.img}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
            {project.detailImg && isHovered && (
              <motion.img
                src={project.detailImg}
                alt=""
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-black/[0.04] transition-colors duration-500 group-hover:bg-transparent" />
          <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-[#f1eee7] text-lg text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:rotate-[-10deg] group-hover:opacity-100">
            ↗
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-5 border-t border-black/20 pt-4">
        <div>
          <h2 className="font-serif text-4xl leading-none tracking-[-0.02em] text-[#171717] md:text-5xl">
            {project.title}
          </h2>
          {(project.metric || project.services) && (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-black/55">
              {project.metric || project.services}
            </p>
          )}
        </div>
        <div className="shrink-0 text-right text-[11px] leading-relaxed text-black/45">
          <span className="block">{project.year}</span>
          <span className="block">{project.type}</span>
        </div>
      </div>
    </motion.button>
  );
}

export default memo(ProjectGalleryCard);
