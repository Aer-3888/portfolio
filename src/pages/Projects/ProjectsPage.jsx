import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import PageNav from "../../components/layout/PageNav";
import ProjectDetails from "../../components/ProjectDetails";
import ProjectGallery from "./ProjectGallery";
import { PROJECTS } from "../../config/siteData";
import useSeo from "../../hooks/useSeo";

export default function ProjectsPage() {
  const { scrollYProgress } = useScroll();
  const [selectedProject, setSelectedProject] = useState(null);

  useSeo({
    title: "Projects | Théo Phan",
    description:
      "Selected projects by Théo Phan across mobile, AI, computer vision, security, and web development.",
    path: "/projects",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  useEffect(() => {
    if (selectedProject) {
      window.history.replaceState(null, "", `#${selectedProject.id}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [selectedProject]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f1eee7] font-sans text-[#171717]">
      <PageNav currentPath="/projects" scrollYProgress={scrollYProgress} isHidden={!!selectedProject} />

      <ProjectGallery onSelect={setSelectedProject} />

      <ProjectDetails
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
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
    </div>
  );
}
