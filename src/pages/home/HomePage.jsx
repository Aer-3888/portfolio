import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { getLangFromPath } from "../../i18n/localizePath";
import PageTransition from "../../components/layout/PageTransition";
import Hero from "./Hero/Hero";
import StatusSection from "./Profile/StatusSection";
import ExperienceSection from "./Profile/ExperienceSection";
import ProjectList from "./Projects/ProjectList";
import Footer from "./Footer/Footer";
import HobbySection from "./Profile/HobbySection";
import PageNav from "../../components/layout/PageNav";
import ProjectDetails from "../../components/ProjectDetails";
import useMediaQuery from "../../hooks/useMediaQuery";
import useSeo from "../../hooks/useSeo";
import HomeStage from "./Stage/HomeStage";

export default function HomePage() {
  const location = useLocation();
  const { t } = useTranslation("seo");
  const { scrollYProgress } = useScroll();
  const [selectedProject, setSelectedProject] = useState(null);
  const wide = useMediaQuery("(min-width: 1280px)");
  const reduced = useReducedMotion();
  const staged = wide && !reduced;

  useSeo({
    title: t("home.title"),
    description: t("home.description"),
    path: "/",
    lang: getLangFromPath(location.pathname),
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
    <PageTransition className="walden overflow-x-clip">
      <PageNav
        currentPath="/"
        scrollYProgress={scrollYProgress}
        isHidden={!!selectedProject}
      />

      <motion.main className="relative z-10 bg-ground">
        {staged ? (
          <HomeStage onSelect={setSelectedProject} />
        ) : (
          <>
            <section id="home">
              <Hero />
            </section>
            <ProjectList onSelect={setSelectedProject} />
          </>
        )}

        <section id="about">
          <StatusSection />
          <ExperienceSection />
        </section>

        <section id="hobbies">
          <HobbySection />
        </section>
      </motion.main>
      <Footer />

      <ProjectDetails
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </PageTransition>
  );
}
