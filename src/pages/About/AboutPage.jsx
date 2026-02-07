import { useRef, useState } from "react"; // Removed useEffect
import { useScroll, useTransform, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../../config/siteData";
import HomeButton from "../../components/HomeButton";
import NavButtons from "../../components/NavButtons";
import LiquidMenu from "../../components/layout/LiquidMenu";
import MenuPanel from "../../components/MenuPanel";
import SystemWindow from "./SystemWindow";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const menuOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);
  const navPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.05 ? "none" : "auto"));
  const menuPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.05 ? "auto" : "none"));

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuTemporarilyHidden, setIsMenuTemporarilyHidden] = useState(false);
  const [isNavTemporarilyHidden, setIsNavTemporarilyHidden] = useState(false);

  const navItems = NAV_ITEMS.map((item) => ({
    label: item.label,
    path: item.path,
    className: item.className,
    onClick: item.path ? () => navigate(item.path) : item.onClick,
  }));

  const handleGalleryFullscreenChange = (isFull) => {
    if (isFull) setIsMenuOpen(false);
    setIsMenuTemporarilyHidden(isFull);
    setIsNavTemporarilyHidden(isFull);
  };

  return (
      <main
        ref={containerRef}
        className="relative min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-32 pb-24 px-6 md:px-12 flex flex-col items-center"
      >
        {/* 1. Top Section */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div>
            <span className="text-orange-600 font-mono text-xs uppercase tracking-widest mb-4 block">
              01 // Identity
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              About
              <br />
              The
              <br />
              Human.
            </h1>
          </div>

          <p className="w-full md:w-auto max-w-md text-neutral-500 text-sm md:text-base leading-relaxed font-mono">
            I am Théo. Currently mastering Computer Science at INSA Rennes, but always exploring.
            Whether I’m training a neural network or framing a photograph, I am obsessed with how
            complex systems, wheter digital or physical, fit together.
          </p>
        </div>

        {/* Nav */}
        {!isNavTemporarilyHidden && (
          <div className="hidden md:block fixed top-8 left-6 md:left-10 z-[1200]">
            <HomeButton />
          </div>
        )}

        {!isNavTemporarilyHidden && (
          <NavButtons
            items={navItems}
            currentPath="/about"
            navOpacity={navOpacity}
            navPointerEvents={navPointerEvents}
            className="fixed top-8 right-10 z-[1200] flex gap-8 text-white mix-blend-difference"
          />
        )}

        <motion.div
          style={{
            opacity: isMenuTemporarilyHidden ? 0 : menuOpacity,
            pointerEvents: isMenuTemporarilyHidden ? "none" : menuPointerEvents,
          }}
          className="fixed top-8 right-10 z-[1200]"
          aria-hidden={isMenuTemporarilyHidden}
        >
          {!isMenuTemporarilyHidden && (
            <LiquidMenu
              isOpen={isMenuOpen}
              toggle={() => setIsMenuOpen((v) => !v)}
              blobColor="#ffffff"
              lineColor="#000000"
            />
          )}
        </motion.div>

        {/* Menu panel */}
        <MenuPanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={navItems} />

        {/* System Window */}
        <SystemWindow
          navOpacity={navOpacity}
          navPointerEvents={navPointerEvents}
          menuOpacity={menuOpacity}
          menuPointerEvents={menuPointerEvents}
          menuInteractive={true}
          onFullscreenChange={handleGalleryFullscreenChange}
        />
      </main>
  );
}
