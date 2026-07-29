import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import ProjectDetails from "../../../components/ProjectDetails";
import useProjects from "../../../hooks/useProjects";
import useLocalizedNavigate from "../../../i18n/useLocalizedNavigate";

const STORY_META = [
  { id: "01", color: "#ffca45" },
  { id: "09", color: "#f04d2f" },
  { id: "10", color: "#2356d8" },
  { id: "03", color: "#b9d878" },
];

function StoryCard({ story, project, index, onSelect }) {
  const { t } = useTranslation("home");
  const prefersReducedMotion = useReducedMotion();
  const imageFirst = index % 2 === 0;
  const imageRef = useRef(null);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const spotlightX = useSpring(cursorX, { damping: 23, stiffness: 260, mass: 0.35 });
  const spotlightY = useSpring(cursorY, { damping: 23, stiffness: 260, mass: 0.35 });
  const spotlightMask = useMotionTemplate`circle(88px at ${spotlightX}px ${spotlightY}px)`;

  const moveCursor = (event, immediately = false) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cursorX.set(x);
    cursorY.set(y);

    if (immediately) {
      spotlightX.jump(x);
      spotlightY.jump(y);
    }
  };

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-6 border-t border-white/20 py-12 md:grid-cols-12 md:gap-12 md:py-20"
    >
      <div className={"relative md:col-span-7 " + (imageFirst ? "md:order-1" : "md:order-2")}>
        <button
          ref={imageRef}
          type="button"
          onClick={() => onSelect(project)}
          onPointerEnter={(event) => {
            moveCursor(event, true);
            setIsImageHovered(true);
          }}
          onPointerMove={moveCursor}
          onPointerLeave={() => setIsImageHovered(false)}
          className="group relative block w-full cursor-pointer overflow-hidden text-left"
          aria-label={t("projects.storyAria", { title: project.title })}
        >
          <div
            className="absolute inset-0 translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3"
            style={{ backgroundColor: story.color }}
          />
          <div className="relative aspect-[4/3] overflow-hidden bg-[#262626]">
            <img
              src={project.img}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
            />
            {project.detailImg ? (
              isImageHovered && (
                <motion.img
                  src={project.detailImg}
                  alt=""
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
              )
            ) : (
              <motion.img
                src={project.img}
                alt=""
                aria-hidden="true"
                loading="lazy"
                animate={{ opacity: isImageHovered ? 1 : 0 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ clipPath: spotlightMask }}
                className="pointer-events-none absolute inset-0 hidden h-full w-full scale-[1.12] object-cover brightness-75 contrast-125 grayscale md:block"
              />
            )}
            <div className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-transparent" />
            <span className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-white text-lg text-black transition-transform duration-300 group-hover:rotate-[-12deg] group-hover:scale-110">
              ↗
            </span>
          </div>
        </button>
      </div>

      <div
        className={
          "flex flex-col justify-center md:col-span-5 " +
          (imageFirst ? "md:order-2 md:pl-5" : "md:order-1 md:pr-5")
        }
      >
        <div className="mb-6 flex justify-end font-mono text-[10px] tracking-[0.12em] text-white/45">
          <span>{project.year}</span>
        </div>
        <p className="mb-3 text-sm text-white/55">{project.type}</p>
        <h3 className="font-serif text-[clamp(2.8rem,5vw,5.25rem)] leading-[0.88] tracking-[-0.025em] text-[#f1eee7]">
          {story.question}
        </h3>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
          {story.note}
        </p>
        {story.result && (
          <div className="mt-7 border-l-2 border-[#ffca45] pl-4">
            <p className="text-sm text-white/85">{story.result}</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="group mt-8 inline-flex w-fit cursor-pointer items-center gap-3 text-sm text-white"
        >
          {t("projects.open", { title: project.title })}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </motion.article>
  );
}

export default function ProjectList({ selectedProject, setSelectedProject }) {
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation("home");
  const prefersReducedMotion = useReducedMotion();
  const projects = useProjects();
  const stories = STORY_META.map((meta) => ({
    story: { ...meta, ...t(`projects.stories.${meta.id}`, { returnObjects: true }) },
    project: projects.find((project) => project.id === meta.id),
  })).filter(({ project }) => project);

  return (
    <section id="projects" className="relative overflow-hidden bg-[#121212] text-white">
      <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:px-12 md:py-36">
        {/*
          The headline rises out of a clip mask, the same beat StatusSection
          opens with. The padding under the text buys room for the descenders,
          which the mask would otherwise shear off mid rise.
        */}
        <div className="overflow-hidden pb-16 md:pb-24">
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: "100%" }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: "0%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="pb-[0.18em] font-serif text-[clamp(3.8rem,8vw,8.5rem)] leading-[0.78] tracking-[-0.04em] text-[#f1eee7]"
          >
            {t("projects.heading")}
          </motion.h2>
        </div>

        <div>
          {stories.map(({ story, project }, index) => (
            <StoryCard
              key={story.id}
              story={story}
              project={project}
              index={index}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start justify-between gap-6 border-t border-white/20 pt-10 sm:flex-row sm:items-center"
        >
          <p className="max-w-md text-sm leading-relaxed text-white/45">{t("projects.outro")}</p>
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="group inline-flex min-h-12 cursor-pointer items-center gap-8 rounded-full bg-[#f1eee7] px-6 text-sm text-[#121212] transition-transform hover:-translate-y-0.5"
          >
            {t("projects.cta")}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </div>

      <ProjectDetails
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
