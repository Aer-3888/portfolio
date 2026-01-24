import { useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import ProjectItem from "./ProjectItem";

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
      className="fixed w-[250px] h-[250px] bg-white rounded-full mix-blend-difference pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
    />
  );
}

// Project Data
const projects = [
  { title: "Waiki", year: "2025", services: "Flutter — Mobile Development" },
  { title: "Portfolio", year: "2026", services: "Front End — Animation" },
  { title: "Morph", year: "2023", services: "Concept — WebGL" },
  { title: "Helios", year: "2023", services: "Branding — React Native" },
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
  const [entryPoint, setEntryPoint] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        setEntryPoint({ x: e.clientX, y: e.clientY });
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
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

      <div className="container mx-auto px-0 z-10 relative">
        {projects.map((project, i) => (
          <ScrollReveal key={i} className="w-full">
            <ProjectItem index={i} {...project} />
          </ScrollReveal>
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-16 z-10 relative">
        <ScrollReveal>
           <button className="text-white/50 uppercase tracking-widest text-sm">See More</button>
        </ScrollReveal>
      </div>
    </section>
  );
}