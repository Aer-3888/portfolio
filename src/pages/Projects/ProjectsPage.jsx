import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useScroll } from "framer-motion";
import PageNav from "../../components/layout/PageNav";
import PageTransition from "../../components/layout/PageTransition";
import ProjectDetails from "../../components/ProjectDetails";
import ProjectGallery from "./ProjectGallery";
import useProjects from "../../hooks/useProjects";
import { getLangFromPath } from "../../i18n/localizePath";
import useSeo from "../../hooks/useSeo";

export default function ProjectsPage() {
  const { scrollYProgress } = useScroll();
  const { t: tSeo } = useTranslation("seo");
  const location = useLocation();
  const projects = useProjects();
  const [selectedId, setSelectedId] = useState(null);
  const selectedProject = selectedId ? projects.find((p) => p.id === selectedId) ?? null : null;

  useSeo({
    title: tSeo("projects.title"),
    description: tSeo("projects.description"),
    path: "/projects",
    lang: getLangFromPath(location.pathname),
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setSelectedId(hash || null);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (selectedId) {
      window.history.replaceState(null, "", `#${selectedId}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [selectedId]);

  return (
    <PageTransition className="relative min-h-screen overflow-x-hidden bg-[#f1eee7] font-sans text-[#171717]">
      <PageNav currentPath="/projects" scrollYProgress={scrollYProgress} isHidden={!!selectedProject} />

      <ProjectGallery projects={projects} onSelect={(project) => setSelectedId(project.id)} />

      <ProjectDetails
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedId(null)}
      />

      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.025] mix-blend-multiply"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </PageTransition>
  );
}
