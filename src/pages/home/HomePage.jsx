import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "./Hero/Hero";
import ProjectList from "./Projects/ProjectList";
import Footer from "./Footer/Footer";
import SmoothScroll from "../../layout/SmoothScroll";
import HobbySection from "./Profile/HobbySection";

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
      <SmoothScroll>
        <motion.main
          style={{
            borderBottomLeftRadius: curve,
            borderBottomRightRadius: curve,
          }}
          className="relative z-10 bg-neutral-900 shadow-2xl mb-[100vh] overflow-hidden"
        >
          <Hero />
          <HobbySection />
          <ProjectList />

          <div className="w-full h-[20vh] bg-neutral-900 border-t border-neutral-800" />
        </motion.main>
      </SmoothScroll>

      <Footer />
    </div>
  );
}
