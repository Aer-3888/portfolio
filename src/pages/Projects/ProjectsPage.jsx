import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import PageNav from "../../components/layout/PageNav";
import ProjectDetails from "./ProjectDetails";
import TunnelView from "./TunnelView";
import MobileProjectList from "./MobileProjectList";
import { PROJECTS } from "../../config/siteData";
import { BackgrounGrid } from "./BackgroundGrid";
import useMediaQuery from "../../hooks/useMediaQuery";

export default function ProjectsPage() {
  const tunnelRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const totalScrollHeight = (PROJECTS.length + 2) * 100;

  const [hasEntered, setHasEntered] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileNavVisible, setMobileNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const introControls = useAnimation();
  const flashControls = useAnimation();

  const prefersReduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Lock scroll on mount
  useEffect(() => {
    const lockScroll = () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    if (selectedProject) {
      lockScroll();
    } else if (!showIntro && !isDesktop) {
      // Mobile: body scroll stays hidden (list scrolls internally)
      lockScroll();
    } else if (!showIntro) {
      unlockScroll();
    } else {
      lockScroll();
    }

    return () => unlockScroll();
  }, [showIntro, selectedProject, isDesktop]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Skip intro for return visitors
  useEffect(() => {
    if (localStorage.getItem("hasVisitedProjects")) {
      setShowIntro(false);
      setHasEntered(true);
    }
  }, []);

  // Warp Sequence
  const handleWarp = async () => {
    setHasEntered(true);
    localStorage.setItem("hasVisitedProjects", "1");

    if (prefersReduced) {
      setShowIntro(false);
      document.body.style.overflow = "";
      return;
    }

    const zoomDone = introControls.start({
      scale: 15,
      opacity: 0,
      filter: "blur(8px)",
      transition: { duration: 0.8, ease: [0.7, 0, 0.3, 1] },
    });

    const flashDone = flashControls.start({
      opacity: [0, 1, 1, 0],
      transition: { duration: 0.6, times: [0, 0.3, 0.6, 1], delay: 0.3 },
    });

    await Promise.all([zoomDone, flashDone]);

    setShowIntro(false);
    window.scrollTo(0, 0);

    if (tunnelRef.current) {
      await tunnelRef.current.playEntry();
    } else {
      document.body.style.overflow = "";
    }
  };

  // Deep Linking Support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const project = PROJECTS.find((p) => p.id === hash);
        if (project) setSelectedProject(project);
      } else {
        setSelectedProject(null);
      }
    };

    // Check on mount
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update hash when project selected
  useEffect(() => {
    if (selectedProject) {
      window.history.replaceState(null, "", `#${selectedProject.id}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [selectedProject]);

  // Show mobile nav again whenever the modal closes
  useEffect(() => {
    if (!selectedProject) setMobileNavVisible(true);
  }, [selectedProject]);

  // Track scroll direction inside MobileProjectList to hide/show the nav
  const handleMobileScroll = (e) => {
    const currentY = e.currentTarget.scrollTop;
    if (currentY <= 10) {
      setMobileNavVisible(true);
    } else if (currentY > lastScrollYRef.current) {
      setMobileNavVisible(false);
    } else {
      setMobileNavVisible(true);
    }
    lastScrollYRef.current = currentY;
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject || showIntro) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, showIntro]);

  // Touch Drag Support
  const touchStart = useRef(0);
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (showIntro || selectedProject) return;
    const touchEnd = e.touches[0].clientX;
    const deltaX = touchStart.current - touchEnd;

    // Map horizontal swipe to vertical scroll
    if (Math.abs(deltaX) > 10) {
      window.scrollBy({ top: deltaX * 1.5, behavior: "auto" });
      touchStart.current = touchEnd;
    }
  };

  return (
    <div className="bg-neutral-950 text-white font-sans selection:bg-orange-500/30 overflow-x-hidden">
      {/* Scroll driver — must live outside fixed wrapper to create document scroll height */}
      {isDesktop && (
        <div
          ref={scrollContainerRef}
          style={{ height: `${totalScrollHeight}vh` }}
          className="absolute top-0 left-0 w-full pointer-events-none"
        />
      )}

      {/* Navigation */}
      <PageNav
        currentPath="/projects"
        isHidden={!!selectedProject}
        isMobileNavVisible={mobileNavVisible}
      />

      <div
        className="fixed inset-0 w-full h-full bg-black flex items-center justify-center perspective-[1000px] overflow-hidden"
        onTouchStart={isDesktop ? handleTouchStart : undefined}
        onTouchMove={isDesktop ? handleTouchMove : undefined}
      >
        {showIntro && (
          <motion.div
            animate={introControls}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center origin-center overflow-hidden"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {/* Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 z-0"
            >
              <BackgrounGrid />
            </motion.div>

            {/* Pulse animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.2, 0.5, 0.2],
                scale: [0.5, 0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 1],
              }}
              className="absolute z-0 w-[40vw] h-[40vw] rounded-full bg-orange-500/20 blur-[120px] pointer-events-none mix-blend-screen"
            />

            {/* Intro Text */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="relative z-10 flex flex-col items-center"
            >
              <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-[0.8] text-center mix-blend-overlay opacity-90 pointer-events-none drop-shadow-2xl">
                My
                <br />
                Projects
              </h1>
            </motion.div>

            {/* Warp Button */}
            {!hasEntered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "backOut", delay: 0.8 }}
                className="relative z-20 mt-12"
              >
                <motion.button
                  onClick={handleWarp}
                  animate={{
                    boxShadow: [
                      "0px 0px 0px rgba(249, 115, 22, 0)",
                      "0px 0px 30px rgba(249, 115, 22, 0.3)",
                      "0px 0px 0px rgba(249, 115, 22, 0)",
                    ],
                    borderColor: [
                      "rgba(249, 115, 22, 0.5)",
                      "rgba(249, 115, 22, 1)",
                      "rgba(249, 115, 22, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(249, 115, 22, 0.15)",
                    borderColor: "rgba(249, 115, 22, 1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-orange-500 border border-orange-500/50 bg-black/80 px-10 py-5 backdrop-blur-md hover:text-white transition-all cursor-pointer group overflow-hidden"
                >
                  <span className="relative z-10">[ Let's Go ]</span>
                  {/* Scanline */}
                  <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:animate-[shimmer_1s_infinite]" />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={flashControls}
          className="absolute inset-0 z-50 bg-white pointer-events-none"
        />

        {isDesktop ? (
          <TunnelView
            ref={tunnelRef}
            containerRef={scrollContainerRef}
            setSelectedProject={setSelectedProject}
            showIntro={showIntro}
            isModalOpen={!!selectedProject}
          />
        ) : (
          !showIntro && (
            <MobileProjectList onProjectSelect={setSelectedProject} onScroll={handleMobileScroll} />
          )
        )}

        {/* Project Details Modal */}
        <ProjectDetails
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Grain & Gradient Overlays */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] w-full h-full"
          aria-hidden="true"
        >
          <filter id="noise-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-grain)" />
        </svg>
        <div className="absolute inset-0 z-30 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/80" />
      </div>
    </div>
  );
}
