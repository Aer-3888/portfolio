import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import PageNav from "../../components/layout/PageNav";
import ProjectDetails from "../../components/ProjectDetails";
import ProjectGallery from "./ProjectGallery";
import { PROJECTS } from "../../config/siteData";

export default function ProjectsPage() {
  const { scrollYProgress } = useScroll();
  const [selectedProject, setSelectedProject] = useState(null);

  // Land at the top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Deep linking via #<id> (e.g. /projects#09)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const project = PROJECTS.find((p) => p.id === hash);
        if (project) setSelectedProject(project);
      } else {
        setSelectedProject(null);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Keep the URL hash in sync with the open project
  useEffect(() => {
    if (selectedProject) {
      window.history.replaceState(null, "", `#${selectedProject.id}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [selectedProject]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-neutral-950 font-sans text-white">
      <PageNav currentPath="/projects" scrollYProgress={scrollYProgress} isHidden={!!selectedProject} />

      <ProjectGallery onSelect={setSelectedProject} />

      {/* Project Details Modal (handles its own body-scroll lock) */}
      <ProjectDetails
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Atmospheric texture: grain sits above the background, below the content, so text
          stays crisp. pointer-events-none so it never blocks clicks. */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_55%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
