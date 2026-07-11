import { memo } from "react";
import { motion } from "framer-motion";
import { EXPERIENCES } from "../../../config/siteData";

function ExperienceItem({ exp, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.05 }}
      className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-2 md:gap-10 py-8 border-t border-stone"
    >
      <span className="font-mono text-[12px] text-pebble tracking-tight pt-1">{exp.date}</span>

      <div className="flex flex-col gap-2 max-w-2xl">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-base md:text-lg font-medium text-ink tracking-tight">{exp.title}</h3>
          <h4 className="text-[13px] text-ash">{exp.org}</h4>
        </div>
        <p className="text-[13px] text-ash leading-relaxed">{exp.detail}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
          {exp.tags.map((tag) => (
            <span key={tag} className="font-mono text-[11px] uppercase tracking-[0.08em] text-pebble">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative w-full bg-paper py-24 md:py-32 px-6 md:px-12 border-t border-stone"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-pebble block mb-3">
            Path
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-normal text-ink tracking-[0] leading-[0.95]">
            Experience &amp; education
          </h2>
        </div>

        <div className="flex flex-col">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceItem key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ExperienceSection);
