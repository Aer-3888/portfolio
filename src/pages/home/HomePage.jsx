import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "./Hero/Hero";
import StatusSection from "./Profile/StatusSection";
import ProjectList from "./Projects/ProjectList";
import Footer from "./Footer/Footer";
import HobbySection from "./Profile/HobbySection";
import PageNav from "../../components/layout/PageNav";

export default function HomePage() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  const curve = useTransform(scrollYProgress, [0.85, 1], ["50% 50px", "0% 0px"]);

  useEffect(() => {
    if (location.state?.scrollTo === "projects") {
      const el = document.getElementById("projects");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }, [location.state]);

  return (
    <div className="relative bg-neutral-900">
      <motion.main
        style={{
          borderBottomLeftRadius: curve,
          borderBottomRightRadius: curve,
        }}
        className="relative z-10 bg-neutral-900 shadow-2xl mb-[50vh] overflow-hidden"
      >
        <Hero />
        <StatusSection />
        <ProjectList />
        <HobbySection />
        <div className="w-full h-[20vh] bg-neutral-900 border-t border-neutral-800" />
      </motion.main>
      <Footer />

      <PageNav scrollYProgress={scrollYProgress} />
    </div>
  );
}
