import { useState, useMemo, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import HomeButton from "../HomeButton";
import NavButtons from "../NavButtons";
import LiquidMenu from "./LiquidMenu";
import MenuPanel from "../MenuPanel";
import { NAV_ITEMS } from "../../config/siteData";
import useMediaQuery from "../../hooks/useMediaQuery";
import useMobileNavVisible from "../../hooks/useMobileNavVisible";

const Branding = memo(function Branding({ className = "", onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`group flex flex-col items-start cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <span className="text-base font-bold tracking-tighter text-white/90 group-hover:text-white transition-colors">
        Theo Phan
      </span>
      <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40 leading-none group-hover:text-white/60 transition-colors">
        Portfolio
      </span>
    </motion.button>
  );
});

export default function PageNav({
  currentPath,
  scrollYProgress,
  isHidden = false,
  isMobileNavVisible,
}) {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const mobileNavScrollVisible = useMobileNavVisible();
  const mobileNavVisible = isMobileNavVisible ?? mobileNavScrollVisible;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const staticProgress = useMotionValue(0);
  const progress = scrollYProgress ?? staticProgress;

  // Desktop transforms
  const navOpacity = useTransform(progress, [0, 0.05], [1, 0]);
  const menuOpacity = useTransform(progress, [0.05, 0.1], [0, 1]);
  const navPointerEvents = useTransform(progress, (v) => (v > 0.05 ? "none" : "auto"));
  const menuPointerEvents = useTransform(progress, (v) => (v > 0.05 ? "auto" : "none"));

  // Mobile bar background/blur transforms
  const barBackground = useTransform(progress, [0, 0.02], ["rgba(0,0,0,0)", "rgba(10,10,10,0.8)"]);
  const barBlur = useTransform(progress, [0, 0.02], ["blur(0px)", "blur(12px)"]);
  const barBorder = useTransform(progress, [0, 0.02], ["rgba(255,255,255,0)", "rgba(255,255,255,0.1)"]);

  const handleNavigate = useCallback(
    (path, scrollToId) => {
      if (currentPath === "/" && scrollToId) {
        // Scroll to anchor on home page
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Navigate to dedicated route with scroll state
        navigate(path, { state: { scrollTo: scrollToId } });
      }
      setIsMenuOpen(false);
    },
    [currentPath, navigate]
  );

  const navItems = useMemo(
    () => [
      { label: "Projects", path: "/projects", onClick: () => handleNavigate("/projects", "projects") },
      { label: "About", path: "/", onClick: () => handleNavigate("/", "about") },
      { label: "Contact", path: "/contact", onClick: () => handleNavigate("/contact", "contact") },
    ],
    [handleNavigate]
  );

  const menuItems = useMemo(
    () => {
      const items = !isDesktop && currentPath !== "/" ? [{ label: "Home", path: "/", onClick: () => navigate("/") }] : [];
      return [
        ...items,
        ...navItems.map(item => ({
          ...item,
          isActive: currentPath === item.path
        })),
      ].map(item => ({
        ...item,
        isActive: item.isActive ?? (currentPath === item.path)
      }));
    },
    [isDesktop, currentPath, navItems, navigate]
  );

  const handleNavigateHome = useCallback(() => navigate("/"), [navigate]);

  if (isHidden) return null;

  return (
    <>
      {isDesktop ? (
        <>
          {/* Desktop Branding — fades with scroll progress */}
          <motion.div
            style={{ opacity: navOpacity, pointerEvents: navPointerEvents }}
            className="fixed top-10 left-12 z-[1200]"
          >
            {currentPath && currentPath !== "/" ? (
              <HomeButton />
            ) : null}
          </motion.div>

          {/* Nav Links */}
          <NavButtons
            items={navItems}
            currentPath={currentPath}
            navOpacity={scrollYProgress ? navOpacity : undefined}
            navPointerEvents={scrollYProgress ? navPointerEvents : undefined}
            className="fixed top-10 right-12 z-[1200] flex gap-10 items-center text-white mix-blend-difference"
          />

          {/* Desktop LiquidMenu — only shown when scrolled */}
          {scrollYProgress && (
            <motion.div
              style={{ opacity: menuOpacity, pointerEvents: menuPointerEvents }}
              className="fixed top-8 right-12 z-[1200]"
            >
              <AnimatePresence mode="wait">
                {!isMenuOpen && (
                  <motion.div
                    key="desktop-menu"
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      filter: "blur(10px)",
                      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                    }}
                  >
                    <LiquidMenu
                      isOpen={isMenuOpen}
                      toggle={() => setIsMenuOpen((v) => !v)}
                      blobColor="#ffffff"
                      lineColor="#000000"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      ) : (
        /* Mobile nav bar — glassmorphism container */
        <motion.div
          style={{
            backgroundColor: barBackground,
            backdropFilter: barBlur,
            borderBottom: `1px solid`,
            borderColor: barBorder,
          }}
          className={`fixed top-0 left-0 right-0 z-[1200] flex items-center justify-between px-6 h-20 transition-all duration-500 ${
            mobileNavVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-full"
          }`}
        >
          <Branding onClick={handleNavigateHome} />

          <div className="relative">
            <AnimatePresence mode="wait">
              {!isMenuOpen && (
                <motion.div
                  key="mobile-menu"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <LiquidMenu
                    isOpen={isMenuOpen}
                    toggle={() => setIsMenuOpen(true)}
                    blobColor="#ffffff"
                    lineColor="#000000"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      <MenuPanel
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={menuItems}
      />
    </>
  );
}
