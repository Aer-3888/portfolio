import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectItem from "./ProjectItem";
import ProjectDetails from "../../../components/ProjectDetails";
import { PROJECTS } from "../../../config/siteData";

// Black spotlight that trails the cursor, mix-blend inverts the names to white.
// Positioned with a compositor-only transform (x/y) rather than left/top so the
// browser skips layout/paint on every frame, which keeps the mix-blend repaint cheap.
function Cursor({ mouseX, mouseY, isHovered }) {
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  return (
    <motion.div
      style={{ x: xSpring, y: ySpring }}
      className="absolute left-0 top-0 z-0 pointer-events-none will-change-transform"
    >
      {/* Centering wrapper: static transform, kept separate so it never fights
          the spring transform above or the scale transform below. */}
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.4 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-[130px] h-[130px] md:w-[230px] md:h-[230px] bg-black rounded-full"
        />
      </div>
    </motion.div>
  );
}

// Scroll Reveal Component
function ScrollReveal({ children, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 5%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [24, 0, 0, -24]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ProjectList({ selectedProject, setSelectedProject }) {
  const containerRef = useRef(null);
  const rectRef = useRef(null);
  const navigate = useNavigate();
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [entryPoint, setEntryPoint] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleSelect = useCallback(
    (project) => {
      setSelectedProject(project);
    },
    [setSelectedProject]
  );

  useEffect(() => {
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const hoverMq = window.matchMedia("(hover: none)");
    const update = () => {
      setIsCoarsePointer(
        coarseMq.matches ||
          hoverMq.matches ||
          ("ontouchstart" in window && window.innerWidth < 1024)
      );
    };
    update();
    coarseMq.addEventListener("change", update);
    hoverMq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      coarseMq.removeEventListener("change", update);
      hoverMq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Cache the section's bounding rect so handleMouseMove never forces a
  // synchronous reflow on every pointer event. Refresh it on scroll/resize,
  // the only things that move the section relative to the viewport.
  useEffect(() => {
    const updateRect = () => {
      if (containerRef.current) rectRef.current = containerRef.current.getBoundingClientRect();
    };
    updateRect();
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && selectedProject !== null) {
          setSelectedProject(null);
        }
      },
      { threshold: 0 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [selectedProject, setSelectedProject]);

  const handleMouseMove = useCallback(
    (e) => {
      if (isCoarsePointer) return;
      const rect = rectRef.current || e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      if (!isHovered) {
        setEntryPoint({ x, y });
        setIsHovered(true);
      }
    },
    [mouseX, mouseY, isHovered, isCoarsePointer]
  );

  const handleTouchStart = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      className="relative isolate w-full bg-paper py-24 md:py-32 flex flex-col justify-center border-t border-stone overflow-hidden cursor-default"
    >
      {!selectedProject && !isCoarsePointer && (
        <Cursor
          key={`${entryPoint?.x}-${entryPoint?.y}`}
          mouseX={mouseX}
          mouseY={mouseY}
          isHovered={isHovered}
        />
      )}

      {/* Header */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <ScrollReveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500 mix-blend-difference block mb-3">
            Selected work
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-normal text-white mix-blend-difference tracking-[0] leading-[0.95]">
            A few things I&apos;ve built
          </h2>
        </ScrollReveal>
      </div>

      {/* List */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12">
        {PROJECTS.slice(0, 5).map((project, i) => (
          <ScrollReveal key={project.id || i} className="w-full">
            <ProjectItem
              project={project}
              index={i}
              isCoarsePointer={isCoarsePointer}
              onSelect={handleSelect}
            />
          </ScrollReveal>
        ))}
      </div>

      {/* Modal */}
      <ProjectDetails
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 mt-12">
        <ScrollReveal>
          <button
            onClick={() => navigate("/projects")}
            className="group inline-flex items-center gap-2 text-[13px] text-white mix-blend-difference cursor-pointer"
          >
            <span className="border-b border-transparent group-hover:border-white transition-colors duration-300 pb-0.5">
              View all projects
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
