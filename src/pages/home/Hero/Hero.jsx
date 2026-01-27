import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import InfiniteLoopText from "../../../components/InfiniteLoopText";
import LiquidMenu from "../../../components/layout/LiquidMenu";
import NavButtons from "../../../components/NavButtons";
import { nav } from "framer-motion/client";

// Color interpolation helper
function interpolateColor(color1, color2, factor) {
  const c1 = color1.match(/\w\w/g).map((c) => parseInt(c, 16));
  const c2 = color2.match(/\w\w/g).map((c) => parseInt(c, 16));
  const result = c1.map((c, i) => Math.round(c + factor * (c2[i] - c)));
  return `#${result.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

export default function Hero() {
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuInteractive, setIsMenuInteractive] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { label: "Projects", onClick: scrollToProjects },
    { label: "About", onClick: () => navigate("/about") },
    { label: "Contact", onClick: () => navigate("/contact") },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Track scroll progress for gradual color change
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Calculate how close we are to the bottom
      const maxScroll = docHeight - windowHeight;
      const triggerPoint = maxScroll - windowHeight * 1.5;

      if (scrollTop >= triggerPoint) {
        const progress = Math.min((scrollTop - triggerPoint) / (windowHeight * 1.5), 1);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interpolate colors based on scroll progress
  const blobColor = interpolateColor("#ffffff", "#ff8c00", scrollProgress);
  const lineColor = interpolateColor("#000000", "#ffffff", scrollProgress);

  // Animation transforms
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["10%", "0%"]);

  // Crossfade Logic
  const tickerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const lockedOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  // Navigation Switch Logic
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const menuOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);

  // Pointer Events Logic
  const navPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.05 ? "none" : "auto"));
  const menuPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.05 ? "auto" : "none"));

  // Keep a React state copy of the MotionValue for pointer-events
  useEffect(() => {
    const unsub = menuPointerEvents.onChange((v) => {
      setIsMenuInteractive(v === "auto");
    });
    // initialize
    setIsMenuInteractive(menuPointerEvents.get() === "auto");
    return unsub;
  }, [menuPointerEvents]);

  const menuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.08, duration: 0.25 } }),
    exit: { opacity: 0, x: 10, transition: { duration: 0.15 } },
  };

  return (
    <div ref={containerRef} className="relative h-[100vh] w-full bg-neutral-900 overflow-x-hidden">
      {/* Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1090]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.aside
              className="fixed top-0 right-0 h-screen w-[320px] max-w-[85vw] bg-neutral-950/90 border-l border-white/10 shadow-2xl z-[1100] p-8 flex flex-col gap-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.3em] text-white/60">Menu</span>
                <button
                  type="button"
                  className="text-white/70 hover:text-white text-sm tracking-widest uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    custom={index}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="text-left text-2xl font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors"
                    onClick={() => {
                      item.onClick();
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 1. Text Navigation (Visible at Top) */}
      <NavButtons items={navItems} navOpacity={navOpacity} navPointerEvents={navPointerEvents} />

      {/* 2. Liquid Menu (Visible on Scroll) */}
      <motion.div
        style={{ opacity: menuOpacity, pointerEvents: isMenuInteractive ? "auto" : "none" }}
        className={`fixed top-8 right-10 z-[999] ${isMenuInteractive ? "" : "pointer-events-none"}`}
        aria-hidden={!isMenuInteractive}
      >
        {isMenuInteractive && (
          <LiquidMenu
            isOpen={isMenuOpen}
            toggle={() => setIsMenuOpen(!isMenuOpen)}
            blobColor={blobColor}
            lineColor={lineColor}
          />
        )}
      </motion.div>

      {/* Hero Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Layer 0: Side Info */}
        <motion.div
          style={{ opacity: navOpacity }}
          className="absolute top-8 left-6 md:left-10 z-[40] hidden md:flex flex-col gap-6 mix-blend-difference text-white"
        >
          {/* Line 1: Current Status */}
          <div className="group flex flex-col gap-1">
            <p className="font-mono text-[10px] text-white/60 tracking-[0.2em] uppercase">
              01 // Currently
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <h3 className="text-sm font-bold tracking-widest uppercase">CS Student @ INSA</h3>
            </div>
          </div>

          {/* Line 2: Target */}
          <div className="group flex flex-col gap-1">
            <p className="font-mono text-[10px] text-white/60 tracking-[0.2em] uppercase">
              02 // Focus
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 border border-white/60 rounded-full" />
              <h3 className="text-sm font-bold tracking-widest uppercase">Aspiring AI Engineer</h3>
            </div>
          </div>
        </motion.div>

        {/* Layer 1: Text After Scroll Down */}
        <motion.div
          style={{ opacity: lockedOpacity, scale, y }}
          className="absolute z-10 w-full flex justify-center top-[65%] -translate-y-1/2"
        >
          <h1 className="text-[15vw] font-black text-white leading-none tracking-tighter whitespace-nowrap drop-shadow-2xl">
            THEO PHAN
          </h1>
        </motion.div>

        {/* Layer 2: Main Component */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <img
            src="/images/me_.png"
            alt="Subject"
            className="h-[100dvh] w-auto max-w-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Layer 3: Front Text*/}
        <motion.div
          style={{ opacity: tickerOpacity, scale, y }}
          className="absolute z-30 inset-x-0 top-[65%] -translate-y-1/2"
        >
          <InfiniteLoopText speed={0.2} />
        </motion.div>

        {/* Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-800">
          {/* Dot Pattern */}
          <div
            className="absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Cool Light */}
          <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] bg-neutral-600/30 rounded-full blur-[120px] mix-blend-screen" />

          {/* Subtle Warmth/Accent */}
          <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] bg-orange-900/20 rounded-full blur-[100px] mix-blend-screen" />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-neutral-900/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/50 via-transparent to-neutral-900/50" />
        </div>
      </div>
    </div>
  );
}
