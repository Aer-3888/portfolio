import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "./Hero/Hero";
import StatusSection from "./Profile/StatusSection";
import ProjectList from "./Projects/ProjectList";
import Footer from "./Footer/Footer";
import HobbySection from "./Profile/HobbySection";
import PageNav from "../../components/layout/PageNav";
import SystemWindow from "../About/SystemWindow";
import LiquidBackground from "../../components/home/LiquidBackground";

export default function HomePage() {
  const containerRef = useRef(null);
  const location = useLocation();
  const { scrollYProgress } = useScroll({
    container: containerRef
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSystemFullscreen, setIsSystemFullscreen] = useState(false);

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
    <div ref={containerRef} className="cinematic-container">
      <LiquidBackground color={bgColor} intensity={rippleIntensity} />

      <PageNav
        currentPath="/"
        scrollYProgress={scrollYProgress}
        isHidden={!!selectedProject || isSystemFullscreen}
      />
      
      <motion.main className="relative z-10">
        <section id="home" className="cinematic-scene">
          <Hero />
        </section>

        <section id="about" className="cinematic-scene">
          <StatusSection />
        </section>

        <section id="projects" className="cinematic-scene">
          <ProjectList selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
        </section>

        <section id="hobbies" className="cinematic-scene">
          <HobbySection />
        </section>

        <section id="system" className="cinematic-scene min-h-[200vh]">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24"
          >
            <SystemWindow onFullscreenChange={setIsSystemFullscreen} />
          </motion.div>
        </section>

        <section id="contact" className="cinematic-scene">
          <Footer />
        </section>
      </motion.main>
    </div>
  );
}
