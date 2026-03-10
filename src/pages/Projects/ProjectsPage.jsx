import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavButtons from "../../components/NavButtons";
import HomeButton from "../../components/HomeButton";
import FloatingCard from "./FloatingCard";
import ProjectDetails from "./ProjectDetails";
import { NAV_ITEMS, PROJECTS } from "../../config/siteData";
import { BackgrounGrid } from "./BackgroundGrid";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [hasEntered, setHasEntered] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const introControls = useAnimation();
  const flashControls = useAnimation();
  const tunnelControls = useAnimation();
  const entryControls = useAnimation();

  // Lock scroll on mount
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else if (!showIntro) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro, selectedProject]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Warp Sequence
  const handleWarp = async () => {
    setHasEntered(true);

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

    await new Promise((r) => requestAnimationFrame(r));

    tunnelControls.start({
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    });

    await entryControls.start({
      x: 0,
      transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
    });

    document.body.style.overflow = "";
  };

  // Scroll Progress Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply spring physics to scroll
  const smoothScroll = useSpring(scrollYProgress, {
    damping: 35,
    mass: 0.5,
    stiffness: 100,
  });

  // Map Vertical Scroll to Horizontal Move
  const tunnelX = useTransform(smoothScroll, [0, 1], ["0%", "-80%"]);
  const tunnelTextX = useTransform(smoothScroll, [0, 1], ["0%", "30%"]);
  const totalScrollHeight = (PROJECTS.length + 2) * 100;

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
        {/* Navigation */}
        <div className="fixed top-8 left-6 md:left-10 z-[1200] mix-blend-difference">
          <HomeButton />
        </div>
        <NavButtons
          items={NAV_ITEMS.map((item) => ({ ...item, onClick: () => navigate(item.path) }))}
          currentPath="/projects"
          className="fixed top-8 right-10 z-[1200] flex gap-8 text-white mix-blend-difference"
        />

        {/* Scroll Container */}
        <div
          ref={containerRef}
          style={{ height: `${totalScrollHeight}vh` }}
          className="absolute top-0 left-0 w-full pointer-events-none"
        />

        <div 
          className="fixed inset-0 w-full h-full overflow-hidden bg-black flex items-center justify-center perspective-[1000px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
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

          {/* Projects Tunnel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={tunnelControls}
            className="absolute inset-0 z-10 w-full h-full"
          >
            <motion.div
              initial={{ x: "60vw" }}
              animate={entryControls}
              className="h-full"
              style={{ willChange: "transform" }}
            >
              <motion.div
                style={{ x: tunnelX }}
                className="flex items-center pl-[35vw] gap-[10vw] w-max h-full will-change-transform"
              >
                {/* Tunnel Text */}
                <div className="w-[30vw] shrink-0 text-left pl-12 relative mr-[-10vw]">
                  <motion.div style={{ x: tunnelTextX }} className="relative z-10">
                    <div className="w-16 h-1 bg-orange-500 mb-6" />
                    <h2 className="text-7xl font-black uppercase tracking-tighter mb-2 leading-[0.85]">
                      Selected <br /> Projects
                    </h2>
                    
                    <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.2em] mt-4">
                      [ INDEX.2024_2026 ]
                    </p>
                  </motion.div>
                </div>

                {/* Project Cards */}
                {PROJECTS.map((project) => (
                  <FloatingCard
                    key={project.id}
                    project={project}
                    x={tunnelX}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}

                {/* Contact Link */}
                <div className="w-[40vw] h-full flex items-center justify-center shrink-0 -m-[10vw]">
                  <button
                    onClick={() => navigate("/contact")}
                    className="group flex flex-col items-center gap-4 relative cursor-pointer"
                  >
                    <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all z-10 duration-300">
                      <span className="text-2xl group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest z-10 text-neutral-500 group-hover:text-white transition-colors">
                      Let's build <br /> something together
                    </span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Project Details Modal */}
          <ProjectDetails
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />

          {/* Progress Bar */}
          {!showIntro && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[30vw] h-[2px] bg-white/10 z-[1200] overflow-hidden">
              <motion.div
                style={{ scaleX: smoothScroll, transformOrigin: "left" }}
                className="w-full h-full bg-orange-500"
              />
            </div>
          )}

          {/* Grain & Gradient Overlays */}
          <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <div className="absolute inset-0 z-30 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/80" />
        </div>
      </div>
  );
}
