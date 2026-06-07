import { useEffect, useState, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "./Hero/Hero";
import StatusSection from "./Profile/StatusSection";
import ExperienceSection from "./Profile/ExperienceSection";
import ProjectList from "./Projects/ProjectList";
import Footer from "./Footer/Footer";
import HobbySection from "./Profile/HobbySection";
import PageNav from "../../components/layout/PageNav";
import LiquidBackground from "../../components/home/LiquidBackground";

const CvModal = lazy(() => import("../About/CvModal"));
const GalleryModal = lazy(() => import("../About/GalleryInspector"));

export default function HomePage() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Dynamic background transforms based on scroll progress
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#0a0a0a", "#111111", "#0f0700", "#000000"]
  );
  const rippleIntensity = useTransform(scrollYProgress, [0, 1], [0.2, 0.8]);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }, [location.state]);

  return (
    <div className="bg-neutral-950 overflow-x-hidden">
      <LiquidBackground
        color={bgColor}
        intensity={rippleIntensity}
        isPaused={!!selectedProject || isGalleryOpen}
      />

      <PageNav
        currentPath="/"
        scrollYProgress={scrollYProgress}
        isHidden={!!selectedProject || isCvModalOpen || isGalleryOpen}
      />

      <motion.main className="relative z-10 bg-neutral-950 shadow-2xl">
        <section id="home">
          <Hero onCvToggle={setIsCvModalOpen} />
        </section>

        <section id="about">
          <StatusSection />
          <ExperienceSection />
        </section>

        <section id="projects" className="bg-neutral-900 pt-32 pb-0">
          <ProjectList selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
        </section>

        <section id="hobbies" className="py-32">
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
