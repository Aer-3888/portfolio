import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../../config/siteData";
import HomeButton from "../../components/HomeButton";
import NavButtons from "../../components/NavButtons";
import LiquidMenu from "../../components/layout/LiquidMenu";
import MenuPanel from "../../components/MenuPanel";
import SystemWindow from "./SystemWindow";
import useMediaQuery from "../../hooks/useMediaQuery";
import useMobileNavVisible from "../../hooks/useMobileNavVisible";

export default function AboutPage() {
  const containerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const menuOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);
  const navPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.05 ? "none" : "auto"));
  const menuPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.05 ? "auto" : "none"));

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const mobileNavVisible = useMobileNavVisible();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuTemporarilyHidden, setIsMenuTemporarilyHidden] = useState(false);
  const [isNavTemporarilyHidden, setIsNavTemporarilyHidden] = useState(false);

  // Auto-open gallery if requested via navigation state
  const initialTab = location.state?.openGallery ? "gallery" : "git";

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
      className="relative min-h-screen bg-neutral-950 text-white pt-32 pb-24 px-6 md:px-12 flex flex-col items-center overflow-hidden"
    >
      {/* 1. Top Section */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20 relative z-10">
        <div className="flex flex-col gap-4">
          <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-[0.4em] block mb-2">
            01 // Profile
          </span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
            Théo
            <br />
            <span className="text-neutral-600">Phan.</span>
          </h1>
        </div>

        <div className="flex flex-col gap-6 max-w-lg">
          <p className="text-neutral-300 text-xl md:text-2xl font-bold tracking-tight leading-tight">
            Engineering systems where technical precision meets creative exploration.
          </p>
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-mono">
            Currently studying Computer Science at INSA Rennes, specializing in AI Engineering and
            Full-Stack development.
          </p>
        </div>
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
          className="hidden md:flex fixed top-8 right-10 z-[1200] gap-8 text-white mix-blend-difference"
        />
      )}

      {isDesktop ? (
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
      ) : (
        <div
          className={`fixed top-4 right-4 z-[1200] transition-all duration-300 ${
            !isMenuTemporarilyHidden && mobileNavVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-2"
          }`}
          aria-hidden={isMenuTemporarilyHidden || !mobileNavVisible}
        >
          <LiquidMenu
            isOpen={isMenuOpen}
            toggle={() => setIsMenuOpen((v) => !v)}
            blobColor="#ffffff"
            lineColor="#000000"
          />
        </div>
      )}

      {/* Menu panel */}
      <MenuPanel
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={[
          ...(!isDesktop ? [{ label: "Home", onClick: () => navigate("/") }] : []),
          ...navItems,
        ]}
      />

      {/* System Window */}
      <SystemWindow
        defaultTab={initialTab}
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
