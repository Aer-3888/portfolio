import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectItem from "./ProjectItem";
import { PROJECTS } from "../../../config/siteData";

function Cursor({ mouseX, mouseY, isHovered }) {
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      style={{
        left: xSpring,
        top: ySpring,
      }}
      animate={{
        opacity: isHovered ? 0.8 : 0,
        scale: isHovered ? 1 : 0.5,
      }}
      className="fixed w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[230px] md:h-[230px] lg:w-[260px] lg:h-[260px] bg-white rounded-full mix-blend-difference pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
    />
  );
}

// Project Data moved to src/config/siteData.js as PROJECTS

// Scroll Reveal Component
function ScrollReveal({ children, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "end 0%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [50, 0, 0, -50]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ProjectList() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [entryPoint, setEntryPoint] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => {
      const wasCoarse = isCoarsePointer;
      const isNowCoarse = mq.matches;
      setIsCoarsePointer(isNowCoarse);

      // Clear active project when switching from touch to mouse
      if (wasCoarse && !isNowCoarse) {
        setActiveProject(null);
      }
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [isCoarsePointer]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Close all expanded projects when section leaves viewport
        if (!entry.isIntersecting && activeProject !== null) {
          setActiveProject(null);
        }
      },
      { threshold: 0 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [activeProject]);

  const handleProjectToggle = (index) => {
    if (!isCoarsePointer) return; // clicks only matter on touch devices
    setActiveProject((prev) => (prev === index ? null : index));
  };

  const handleMouseMove = useCallback(
    (e) => {
      // Don't show spotlight on touch devices
      if (isCoarsePointer) return;

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Only show spotlight after the cursor actually moves inside
      if (!isHovered) {
        setEntryPoint({ x: e.clientX, y: e.clientY });
        setIsHovered(true);
      }
    },
    [mouseX, mouseY, isHovered, isCoarsePointer]
  );

  const handleTouchStart = useCallback(() => {
    // Hide spotlight on touch to prevent it showing during scroll
    setIsHovered(false);
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={undefined}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onTouchStart={handleTouchStart}
      className="relative w-full min-h-screen bg-neutral-900 py-32 flex flex-col justify-center cursor-default overflow-hidden"
    >
      <Cursor
        key={`${entryPoint?.x}-${entryPoint?.y}`}
        mouseX={mouseX}
        mouseY={mouseY}
        isHovered={isHovered}
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 mb-16 z-10 relative">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <h2 className="text-white/50 font-mono text-sm tracking-widest uppercase">
              {`Highlight Projects (${String(Math.min(4, PROJECTS.length)).padStart(2, "0")})`}
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="w-full h-[1px] bg-neutral-800" />
        </ScrollReveal>
      </div>

      {/* List */}
      <div className="container mx-auto px-0 z-10 relative">
        {PROJECTS.slice(0, 4).map((project, i) => (
          <ScrollReveal key={project.id || i} className="w-full">
            <ProjectItem
              index={i}
              isActive={activeProject === i}
              isCoarsePointer={isCoarsePointer}
              onToggle={() => handleProjectToggle(i)}
              title={project.title}
              year={project.year}
              services={project.services}
            />
          </ScrollReveal>
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-24 z-10 relative flex justify-center md:justify-start">
        <ScrollReveal>
          <motion.button
            whileHover="hover"
            initial="initial"
            className="group relative px-10 py-5 border border-white/20 overflow-hidden bg-transparent cursor-pointer flex items-center gap-4"
            onClick={() => navigate("/projects")}
          >
            {/* 1. Fill Animation: Slides up from bottom */}
            <motion.div
              variants={{
                initial: { y: "100%" },
                hover: { y: "0%" },
              }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0 bg-white"
            />

            {/* 2. Text Content */}
            <div className="relative z-10 flex items-center gap-4 mix-blend-difference">
              <span className="text-white font-mono text-sm font-bold uppercase tracking-[0.2em]">
                View All Projects
              </span>

              {/* Animated Arrow */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 text-white"
                variants={{
                  initial: { x: 0 },
                  hover: { x: 5 },
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </motion.svg>
            </div>
          </motion.button>
        </ScrollReveal>
      </div>
    </section>
  );
}
