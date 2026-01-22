import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import ProjectItem from "./ProjectItem";

// Project Data
const projects = [
  {
    title: "Waiki",
    year: "2025",
    services: "Flutter — Mobile Development — Product Design",
  },
  {
    title: "Vesper",
    year: "2024",
    services: "Front End — Animation — 3D",
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

export default function ProjectList() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    // Get mouse position relative to THIS container
    const { top, left } = containerRef.current.getBoundingClientRect();

    // Set position (centered on cursor)
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-screen bg-neutral-900 py-32 flex flex-col justify-center cursor-default overflow-hidden"
    >
      {/* Mouse Circle */}
      <motion.div
        style={{
          left: xSpring,
          top: ySpring,
        }}
        animate={{
          opacity: isHovered ? 0.8 : 0,
          scale: isHovered ? 1 : 0.5,
        }}
        className="absolute w-[250px] h-[250px] bg-white rounded-full mix-blend-difference pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
      />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 mb-16 z-10 relative">
        <h2 className="text-white/50 font-mono text-sm tracking-widest uppercase mb-4">
          Selected Works (04)
        </h2>
        <div className="w-full h-[1px] bg-neutral-800" />
      </div>

      {/* Project List */}
      <div className="container mx-auto px-0 z-10 relative">
        {projects.map((project, i) => (
          <ProjectItem key={i} index={i} {...project} />
        ))}
        {/* Final Border */}
        <div className="w-full h-[1px] bg-neutral-800" />
      </div>
    </section>
  );
}
