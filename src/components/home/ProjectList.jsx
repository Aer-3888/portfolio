import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import ProjectItem from "./ProjectItem";

// Project Data
const projects = [
  {
    title: "Waiki",
    year: "2025",
    services: "Flutter — Mobile Development — Product Design",
  },
  {
    title: "Portfolio",
    year: "2026",
    services: "Front End — Animation — React",
  },
  {
    title: "Morph",
    year: "2023",
    services: "Concept — Interaction — WebGL",
  },
  {
    title: "Helios",
    year: "2023",
    services: "Branding — React Native",
  },
];

// Scroll Reveal Component
function ScrollReveal({ children, className }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "end 0%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], [0, 1, 1, 0]);
  
  const y = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], [100, 0, 0, -100]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ProjectList() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { top, bottom } = containerRef.current.getBoundingClientRect();
    
    // Store last mouse position
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    
    // Check if mouse is within container bounds
    const isInContainer = e.clientY >= top && e.clientY <= bottom;
    
    if (isInContainer) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  };

  // Check on scroll if mouse is still in container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, bottom } = containerRef.current.getBoundingClientRect();
      const isInContainer = lastMousePos.current.y >= top && lastMousePos.current.y <= bottom;
      setIsHovered(isInContainer);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-screen bg-neutral-900 py-32 flex flex-col justify-center cursor-default overflow-hidden"
    >
      {/* Mouse Spotlight */}
      <motion.div
        style={{
          left: xSpring,
          top: ySpring,
        }}
        animate={{
          opacity: isHovered ? 0.8 : 0,
          scale: isHovered ? 1 : 0.5,
        }}
        className="fixed w-[250px] h-[250px] bg-white rounded-full mix-blend-difference pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* Header Area */}
      <div className="container mx-auto px-6 md:px-12 mb-16 z-10 relative">
        <ScrollReveal>
          <h2 className="text-white/50 font-mono text-sm tracking-widest uppercase mb-4">
            Highlight Projects (04)
          </h2>
        </ScrollReveal>
        
        <ScrollReveal>
          <div className="w-full h-[1px] bg-neutral-800" />
        </ScrollReveal>
      </div>

      {/* Project Rows */}
      <div className="container mx-auto px-0 z-10 relative">
        {projects.map((project, i) => (
          <ScrollReveal key={i} className="w-full">
            <ProjectItem index={i} {...project} />
          </ScrollReveal>
        ))}
      </div>

      {/* See More Button */}
      <div className="container mx-auto px-6 md:px-12 mt-16 z-10 relative">
        <ScrollReveal>
          <button
            type="button"
            className="group flex items-center gap-3 text-white/70 hover:text-white font-mono text-sm tracking-widest uppercase transition-colors cursor-pointer"
          >
            <span>See More Projects</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}