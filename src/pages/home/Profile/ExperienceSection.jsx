import { memo } from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    date: "2025 - Present",
    title: "Engineering Degree",
    org: "INSA Rennes",
    detail: "Specializing in Computer Science. Building on the foundations of AI and Data Engineering.",
    tags: ["Architecture", "Algorithms", "AI"],
  },
  {
    date: "12/2025 - Present",
    title: "Freelance Developer",
    org: "Waiki",
    detail: "Collaborated on building and optimizing full-stack features and user experiences for client platforms.",
    tags: ["Freelance", "Full-Stack", "Optimization"],
  },
  {
    date: "12/2025 - Present",
    title: "Accountant",
    org: "Ouest INSA",
    detail: "Managing financial oversight and budget tracking. Developed a custom AI solution to automate accounting entries and streamline administrative workflows.",
    tags: ["AI Automation", "Management", "Rigour"],
  },
  {
    date: "04/2025 - 06/2025",
    title: "AI Engineer Intern",
    org: "FPT Telecom",
    detail: "Developed object detection models (YOLO/PyTorch) to automate identification of anomalies in fiber optic distribution.",
    tags: ["Computer Vision", "Object Detection", "PyTorch"],
  },
  {
    date: "2023 - 2025",
    title: "BUT Informatique",
    org: "IUT Nantes",
    detail: "Application Development Track. Built full-stack projects: Real Estate Data Analysis (Pandas) and E-commerce platforms.",
    tags: ["Go", "React", "Node.js", "SQL", "Pandas"],
  },
  {
    date: "08/2022",
    title: "Admin Assistant",
    org: "BMW Alphabet",
    detail: "Digitization of contracts and resolving formatting inconsistencies. Developed rigor and professional adaptability.",
    tags: ["Organization", "Adaptability"],
  }
];

function ExperienceItem({ exp, index }) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative w-full mb-16 md:mb-32 flex flex-col md:flex-row items-start md:items-center">
      {/* Central Line Node (Desktop) */}
      <div className="absolute left-[-2px] md:left-1/2 md:-translate-x-1/2 top-1.5 md:top-auto w-4 h-4 rounded-full bg-orange-500 z-10 border-4 border-neutral-950" />

      {/* Content Block */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`pl-8 md:pl-0 w-full md:w-[42%] ${isEven ? "md:text-right md:ml-0" : "md:ml-auto md:text-left"}`}
      >
        <span className="font-mono text-[10px] text-orange-500 uppercase tracking-[0.3em] font-bold block mb-2">
          {exp.date}
        </span>
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none mb-1">
          {exp.title}
        </h3>
        <h4 className="text-sm md:text-base font-bold text-neutral-500 uppercase tracking-wide mb-4">
          {exp.org}
        </h4>
        <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-md inline-block">
          {exp.detail}
        </p>
        
        <div className={`flex flex-wrap gap-2 mt-4 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
          {exp.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-neutral-900 border border-white/5 rounded text-[9px] font-mono text-neutral-500 uppercase">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full bg-neutral-950 py-16 md:py-32 px-6 overflow-hidden border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-24 text-center">
          <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-[0.4em] block mb-4">
            Professional Path
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            Career <span className="text-neutral-600">Milestones.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-[5px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-neutral-800" />

          <div className="flex flex-col">
            {experiences.map((exp, i) => (
              <ExperienceItem key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ExperienceSection);
