import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "./Hero/Hero";
import StatusSection from "./Profile/StatusSection";
import ProjectList from "./Projects/ProjectList";
import Footer from "./Footer/Footer";
import HobbySection from "./Profile/HobbySection";
import { NAV_ITEMS } from "../../config/siteData";
import LiquidMenu from "../../components/layout/LiquidMenu";
import MenuPanel from "../../components/MenuPanel";
import useMediaQuery from "../../hooks/useMediaQuery";
import useMobileNavVisible from "../../hooks/useMobileNavVisible";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const mobileNavVisible = useMobileNavVisible();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const menuOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);

  const menuPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.05 ? "auto" : "none"));

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

      {/* Menu */}
      {isDesktop ? (
        <motion.div
          style={{ opacity: menuOpacity, pointerEvents: menuPointerEvents }}
          className="fixed top-8 right-10 z-[1200]"
        >
          <LiquidMenu isOpen={isMenuOpen} toggle={() => setIsMenuOpen((v) => !v)} />
        </motion.div>
      ) : (
        <div
          className={`fixed top-4 right-4 z-[1200] transition-all duration-300 ${
            mobileNavVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-2"
          }`}
        >
          <LiquidMenu isOpen={isMenuOpen} toggle={() => setIsMenuOpen((v) => !v)} />
        </div>
      )}

      <MenuPanel
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={NAV_ITEMS.map((item) => ({
          label: item.label,
          onClick: () => (item.path ? navigate(item.path) : item.onClick && item.onClick()),
        }))}
      />
    </div>
  );
}
