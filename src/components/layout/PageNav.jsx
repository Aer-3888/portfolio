import { useState, useMemo, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { motion, useTransform, useMotionValue, useScroll, AnimatePresence } from "framer-motion";
import useLocalizedNavigate from "../../i18n/useLocalizedNavigate";
import NavButtons from "../NavButtons";
import LiquidMenu from "./LiquidMenu";
import MenuPanel from "../MenuPanel";
import LanguageSwitcher from "./LanguageSwitcher";
import useMediaQuery from "../../hooks/useMediaQuery";
import useMobileNavVisible from "../../hooks/useMobileNavVisible";
import palette from "../../config/palette";

const Branding = memo(function Branding({ className = "", onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`cursor-pointer font-display text-[1.8rem] leading-none tracking-[-0.02em] text-ink ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      Théo Phan
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

  // Pages with scroll progress hand navigation over to the floating blob.
  const hasBlobTakeover = Boolean(scrollYProgress);

  // A pixel threshold keeps the handover consistent across page lengths.
  const TOP_THRESHOLD = 48;

  const navOpacity = useTransform(scrollY, [0, TOP_THRESHOLD], [1, 0]);
  const menuOpacity = useTransform(scrollY, [TOP_THRESHOLD, TOP_THRESHOLD + 62], [0, 1]);
  const navPointerEvents = useTransform(scrollY, (v) => (v > TOP_THRESHOLD ? "none" : "auto"));
  const menuPointerEvents = useTransform(scrollY, (v) => (v > TOP_THRESHOLD ? "auto" : "none"));

  const barBackground = useTransform(progress, [0, 0.02], ["rgba(246,245,241,0)", "rgba(246,245,241,0.94)"]);
  const barBlur = useTransform(progress, [0, 0.02], ["blur(0px)", "blur(12px)"]);
  const barBorder = useTransform(
    progress,
    [0, 0.02],
    ["rgba(203,208,198,0)", "rgba(203,208,198,1)"]
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
      { label: t("nav.about"), path: "/", onClick: () => handleNavigate("/", "about") },
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
          <motion.header
            style={
              hasBlobTakeover
                ? { opacity: navOpacity, pointerEvents: navPointerEvents }
                : undefined
            }
            className="fixed inset-x-0 top-0 z-[1200] border-b border-rule bg-ground/95 px-6 py-6 backdrop-blur-md md:px-10"
          >
            <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-8">
              <Branding onClick={handleNavigateHome} />
              <NavButtons
                items={navItems}
                currentPath={currentPath}
                trailing={<LanguageSwitcher className="pl-1 text-ink" />}
                className="flex items-center gap-8 text-ink"
                buttonClass="cursor-pointer py-2 text-sm transition-colors hover:text-accent-deep"
                activeButtonClass="cursor-pointer py-2 text-sm text-accent-deep"
              />
            </div>
          </motion.header>

          {hasBlobTakeover && (
            <motion.div
              style={{ opacity: menuOpacity, pointerEvents: menuPointerEvents }}
              className="fixed right-8 top-6 z-[1200] md:right-10"
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
                      blobColor={isHomeLight ? palette.accent : palette.paper}
                      lineColor={isHomeLight ? palette.ground : palette.ink}
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
          className={`fixed top-0 left-0 right-0 z-[1200] flex min-h-20 items-center justify-between px-5 pb-3 pt-[calc(var(--safe-top)+0.75rem)] sm:px-6 transition-all duration-500 ${
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
                    blobColor={palette.accent}
                    lineColor={palette.ground}
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
