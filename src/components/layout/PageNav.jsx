import { useState, useMemo, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { motion, useTransform, useMotionValue, useScroll, AnimatePresence } from "framer-motion";
import useLocalizedNavigate from "../../i18n/useLocalizedNavigate";
import HomeButton from "../HomeButton";
import NavButtons from "../NavButtons";
import LiquidMenu from "./LiquidMenu";
import MenuPanel from "../MenuPanel";
import LanguageSwitcher from "./LanguageSwitcher";
import useMediaQuery from "../../hooks/useMediaQuery";
import useMobileNavVisible from "../../hooks/useMobileNavVisible";

const Branding = memo(function Branding({ className = "", onClick }) {
  const { t } = useTranslation();
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
        {t("branding.tagline")}
      </span>
    </motion.button>
  );
});

export default function PageNav({ currentPath, scrollYProgress, isHidden = false }) {
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isHomeLight = currentPath === "/";
  const mobileNavVisible = useMobileNavVisible();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const staticProgress = useMotionValue(0);
  const progress = scrollYProgress ?? staticProgress;
  const { scrollY } = useScroll();

  /*
    Only pages that pass scrollYProgress render the floating blob, so only those
    may retire the text nav. Anywhere else the text is the only navigation on
    screen and has to stay put.
  */
  const hasBlobTakeover = Boolean(scrollYProgress);

  /*
    Measured in pixels rather than as a fraction of the document. "Not at the
    top" should mean the same distance everywhere, and as a fraction of a page
    as long as the home page, 5% left the text hanging around for several
    hundred pixels of scrolling.
  */
  const TOP_THRESHOLD = 48;

  const navOpacity = useTransform(scrollY, [0, TOP_THRESHOLD], [1, 0]);
  const menuOpacity = useTransform(scrollY, [TOP_THRESHOLD, TOP_THRESHOLD + 62], [0, 1]);
  const navPointerEvents = useTransform(scrollY, (v) => (v > TOP_THRESHOLD ? "none" : "auto"));
  const menuPointerEvents = useTransform(scrollY, (v) => (v > TOP_THRESHOLD ? "auto" : "none"));

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
        label: t("nav.work"),
        path: "/projects",
        onClick: () => handleNavigate("/projects", "projects"),
      },
      {
        label: t("nav.gallery"),
        path: "/gallery",
        onClick: () => handleNavigate("/gallery"),
      },
      { label: t("nav.story"), path: "/", onClick: () => handleNavigate("/", "about") },
      {
        label: t("nav.hello"),
        path: "/contact",
        onClick: () => handleNavigate("/contact", "contact"),
      },
    ],
    [handleNavigate, t]
  );

  const menuItems = useMemo(() => {
    const items =
      !isDesktop && currentPath !== "/"
        ? [{ label: t("nav.home"), path: "/", onClick: () => navigate("/") }]
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
  }, [isDesktop, currentPath, navItems, navigate, t]);

  const handleNavigateHome = useCallback(() => navigate("/"), [navigate]);

  if (isHidden) return null;

  return (
    <>
      {isDesktop ? (
        <>
          {currentPath && currentPath !== "/" && (
            <motion.div
              style={
                hasBlobTakeover
                  ? { opacity: navOpacity, pointerEvents: navPointerEvents }
                  : undefined
              }
              className="fixed top-10 left-12 z-[1200]"
            >
              <HomeButton />
            </motion.div>
          )}
          <NavButtons
            items={navItems}
            currentPath={currentPath}
            navOpacity={hasBlobTakeover ? navOpacity : undefined}
            navPointerEvents={hasBlobTakeover ? navPointerEvents : undefined}
            trailing={<LanguageSwitcher className="pl-1 text-white" />}
            className="fixed top-10 right-12 z-[1200] flex gap-10 items-center text-white mix-blend-difference"
          />

          {hasBlobTakeover && (
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
