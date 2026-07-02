import { useEffect, useState, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import Hero from "./Hero/Hero";
import StatusSection from "./Profile/StatusSection";
import ExperienceSection from "./Profile/ExperienceSection";
import ProjectList from "./Projects/ProjectList";
import Footer from "./Footer/Footer";
import HobbySection from "./Profile/HobbySection";
import PageNav from "../../components/layout/PageNav";
import useSeo from "../../hooks/useSeo";

const CvModal = lazy(() => import("../About/CvModal"));
const GalleryModal = lazy(() => import("../About/GalleryInspector"));

export default function HomePage() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useSeo({
    title: "Th\u00E9o Phan | Portfolio",
    description:
      "Th\u00E9o Phan, CS student at INSA Rennes specializing in AI Engineering and Full-Stack development. Portfolio showcasing web, mobile, and computer vision projects.",
    path: "/",
  });

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }, [location.state]);

  return (
    <div className="walden overflow-x-hidden">
      <PageNav
        currentPath="/"
        scrollYProgress={scrollYProgress}
        isHidden={!!selectedProject || isCvModalOpen || isGalleryOpen}
      />

      <motion.main className="relative z-10 bg-paper">
        <section id="home">
          <Hero onCvToggle={setIsCvModalOpen} />
        </section>

        <section id="about">
          <StatusSection />
          <ExperienceSection />
        </section>

        <section id="projects">
          <ProjectList selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
        </section>

        <section id="hobbies">
          <HobbySection onGalleryOpen={() => setIsGalleryOpen(true)} />
        </section>
      </motion.main>
      <Footer />

      <Suspense fallback={null}>
        <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />
        <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
      </Suspense>
    </div>
  );
}
