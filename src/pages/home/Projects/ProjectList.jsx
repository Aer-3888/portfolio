import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ProjectDetails from "../../../components/ProjectDetails";
import useProjects from "../../../hooks/useProjects";
import useLocalizedNavigate from "../../../i18n/useLocalizedNavigate";

const STORY_IDS = ["01", "09", "10", "03"];

function StoryCard({ story, project, index, onSelect }) {
  const { t } = useTranslation("home");
  const reduced = useReducedMotion();
  const imageFirst = index % 2 === 0;

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-center gap-8 border-t border-rule py-8 md:grid-cols-[minmax(0,1.05fr)_minmax(18rem,.55fr)] md:gap-[8%] md:pb-16"
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        className={`group min-w-0 cursor-pointer text-left ${imageFirst ? "md:order-1" : "md:order-2"}`}
        aria-label={t("projects.storyAria", { title: project.title })}
      >
        <figure>
          <div className="overflow-hidden bg-mist">
            <img
              src={project.img}
              alt=""
              loading="lazy"
              className="aspect-[3/2] w-full object-cover transition duration-500 ease-site group-hover:scale-[1.015]"
            />
          </div>
          <figcaption className="pt-3 text-sm text-ash">{project.type}</figcaption>
        </figure>
      </button>

      <div className={imageFirst ? "md:order-2" : "md:order-1"}>
        <h3 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.025em]">
          {project.title}
        </h3>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-ash md:text-base">{story.note}</p>
        {story.result && <p className="mt-5 text-sm text-accent-deep">{story.result}</p>}
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="mt-7 cursor-pointer border-b border-accent pb-1.5 text-sm transition-colors hover:text-accent-deep"
        >
          {t("projects.open", { title: project.title })}
        </button>
      </div>
    </motion.article>
  );
}

export default function ProjectList({ selectedProject, setSelectedProject }) {
  const reduced = useReducedMotion();
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation("home");
  const projects = useProjects();
  const stories = STORY_IDS.map((id) => ({
    story: { id, ...t(`projects.stories.${id}`, { returnObjects: true }) },
    project: projects.find((project) => project.id === id),
  })).filter(({ project }) => project);

  return (
    <section id="projects" className="bg-ground text-ink">
      <div className="mx-auto max-w-[100rem] px-6 py-24 md:px-10 md:py-32">
        <header className="mb-14 grid gap-6 md:grid-cols-[minmax(0,1fr)_27%] md:items-end md:gap-12">
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(3.5rem,5.4vw,4.75rem)] leading-none tracking-[-0.025em]"
          >
            {t("projects.heading")}
          </motion.h2>
          <p className="max-w-sm text-sm leading-relaxed text-ash">{t("projects.intro")}</p>
        </header>

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

        <div className="border-y border-rule py-5">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="cursor-pointer text-sm transition-colors hover:text-accent-deep"
          >
            {t("projects.cta")}
          </button>
        </div>
      </div>

      <ProjectDetails
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
