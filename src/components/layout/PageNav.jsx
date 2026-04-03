import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import HomeButton from "../HomeButton";
import NavButtons from "../NavButtons";
import LiquidMenu from "./LiquidMenu";
import MenuPanel from "../MenuPanel";
import { NAV_ITEMS } from "../../config/siteData";
import useMediaQuery from "../../hooks/useMediaQuery";
import useMobileNavVisible from "../../hooks/useMobileNavVisible";

/**
 * Shared page navigation component.
 *
 * - Desktop: HomeButton (top-left) + NavButtons (top-right), plus a LiquidMenu
 *   that fades in on scroll when scrollYProgress is provided.
 * - Mobile: LiquidMenu that shows/hides based on scroll direction.
 * - isHidden: hides the entire nav (e.g. gallery fullscreen on AboutPage).
 * - currentPath: highlights the active NavButton and adds a "Home" entry to
 *   the mobile menu panel on non-home pages.
 * - isMobileNavVisible: (optional) override for mobile navigation visibility.
 */
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

  const hasScrollFade = !!scrollYProgress;

  // Fallback static MotionValue (value = 0 = top of page) so useTransform
  // calls are always valid even when scrollYProgress is not provided.
  const staticProgress = useMotionValue(0);
  const progress = scrollYProgress ?? staticProgress;

  const navOpacity = useTransform(progress, [0, 0.05], [1, 0]);
  const menuOpacity = useTransform(progress, [0.05, 0.1], [0, 1]);
  const navPointerEvents = useTransform(progress, (v) => (v > 0.05 ? "none" : "auto"));
  const menuPointerEvents = useTransform(progress, (v) => (v > 0.05 ? "auto" : "none"));

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    onClick: () => navigate(item.path),
  }));

  const menuItems = [
    ...(!isDesktop && currentPath ? [{ label: "Home", onClick: () => navigate("/") }] : []),
    ...navItems,
  ];

  if (isHidden) return null;

  return (
    <>
      {/* HomeButton — desktop only, not shown on the home page */}
      {isDesktop && currentPath && (
        <div className="hidden md:block fixed top-8 left-6 md:left-10 z-[1200]">
          <HomeButton />
        </div>
      )}

      {isDesktop ? (
        <>
          {/* Desktop NavButtons — fade out on scroll when scrollYProgress provided */}
          <NavButtons
            items={navItems}
            currentPath={currentPath}
            navOpacity={hasScrollFade ? navOpacity : undefined}
            navPointerEvents={hasScrollFade ? navPointerEvents : undefined}
            className="hidden md:flex fixed top-8 right-10 z-[1200] gap-8 text-white mix-blend-difference"
          />

          {/* Desktop LiquidMenu — only rendered when scroll-fade is active */}
          {hasScrollFade && (
            <motion.div
              style={{ opacity: menuOpacity, pointerEvents: menuPointerEvents }}
              className="fixed top-8 right-10 z-[1200]"
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
        /* Mobile LiquidMenu — show/hide based on scroll direction AND menu open state */
        <div
          className={`fixed top-4 right-4 z-[1200] transition-all duration-300 ${
            mobileNavVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-2"
          }`}
        >
          <AnimatePresence mode="wait">
            {!isMenuOpen && (
              <motion.div
                key="mobile-menu"
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
        </div>
      )}

      <MenuPanel
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={menuItems}
      />
    </>
  );
}
