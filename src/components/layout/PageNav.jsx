import { useState, useMemo, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import HomeButton from "../HomeButton";
import NavButtons from "../NavButtons";
import LiquidMenu from "./LiquidMenu";
import MenuPanel from "../MenuPanel";
import useMediaQuery from "../../hooks/useMediaQuery";
import useMobileNavVisible from "../../hooks/useMobileNavVisible";

const Branding = memo(function Branding({ className = "", onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`group flex flex-col items-start cursor-pointer mix-blend-difference ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <span className="text-sm font-medium tracking-tight transition-colors text-white/90 group-hover:text-white">
        Théo Phan
      </span>
      <span className="text-[10px] uppercase tracking-[0.3em] leading-none transition-colors text-white/40 group-hover:text-white/60">
        Making things
      </span>
    </motion.button>
  );
});

export default function PageNav({ currentPath, scrollYProgress, isHidden = false }) {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isHomeLight = currentPath === "/";
  const mobileNavVisible = useMobileNavVisible();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const staticProgress = useMotionValue(0);
  const progress = scrollYProgress ?? staticProgress;

  const navOpacity = useTransform(progress, [0, 0.05], [1, 0]);
  const menuOpacity = useTransform(progress, [0.05, 0.1], [0, 1]);
  const navPointerEvents = useTransform(progress, (v) => (v > 0.05 ? "none" : "auto"));
  const menuPointerEvents = useTransform(progress, (v) => (v > 0.05 ? "auto" : "none"));

  const barBackground = useTransform(progress, [0, 0.02], ["rgba(0,0,0,0)", "rgba(10,10,10,0.8)"]);
  const barBlur = useTransform(progress, [0, 0.02], ["blur(0px)", "blur(12px)"]);
  const barBorder = useTransform(
    progress,
    [0, 0.02],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.1)"]
  );

  const handleNavigate = useCallback(
    (path, scrollToId) => {
      if (currentPath === "/" && scrollToId) {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        navigate(path, { state: { scrollTo: scrollToId } });
      }
      setIsMenuOpen(false);
    },
    [currentPath, navigate]
  );

  const navItems = useMemo(
    () => [
      {
        label: "Work",
        path: "/projects",
        onClick: () => handleNavigate("/projects", "projects"),
      },
      { label: "Story", path: "/", onClick: () => handleNavigate("/", "about") },
      { label: "Hello", path: "/contact", onClick: () => handleNavigate("/contact", "contact") },
    ],
    [handleNavigate]
  );

  const menuItems = useMemo(() => {
    const items =
      !isDesktop && currentPath !== "/"
        ? [{ label: "Home", path: "/", onClick: () => navigate("/") }]
        : [];
    return [
      ...items,
      ...navItems.map((item) => ({
        ...item,
        isActive: currentPath === item.path,
      })),
    ].map((item) => ({
      ...item,
      isActive: item.isActive ?? currentPath === item.path,
    }));
  }, [isDesktop, currentPath, navItems, navigate]);

  const handleNavigateHome = useCallback(() => navigate("/"), [navigate]);

  if (isHidden) return null;

  return (
    <>
      {isDesktop ? (
        <>
          {currentPath && currentPath !== "/" && (
            <motion.div
              style={{ opacity: navOpacity, pointerEvents: navPointerEvents }}
              className="fixed top-10 left-12 z-[1200]"
            >
              <HomeButton />
            </motion.div>
          )}
          <NavButtons
            items={navItems}
            currentPath={currentPath}
            navOpacity={scrollYProgress ? navOpacity : undefined}
            navPointerEvents={scrollYProgress ? navPointerEvents : undefined}
            className="fixed top-10 right-12 z-[1200] flex gap-10 items-center text-white mix-blend-difference"
          />

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
                      blobColor={isHomeLight ? "#686867" : "#ffffff"}
                      lineColor={isHomeLight ? "#ffffff" : "#000000"}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          style={{
            backgroundColor: barBackground,
            backdropFilter: barBlur,
            borderBottom: `1px solid`,
            borderColor: barBorder,
          }}
          className={`fixed top-0 left-0 right-0 z-[1200] flex min-h-20 items-center px-5 pb-3 pt-[calc(var(--safe-top)+0.75rem)] sm:px-6 transition-all duration-500 ${
            currentPath === "/" ? "justify-end" : "justify-between"
          } ${
            mobileNavVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-full"
          }`}
        >
          {currentPath !== "/" && <Branding onClick={handleNavigateHome} />}

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

      <MenuPanel isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navItems={menuItems} />
    </>
  );
}
