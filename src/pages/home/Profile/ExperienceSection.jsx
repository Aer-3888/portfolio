import { memo } from "react";
import { motion } from "framer-motion";

const moments = [
  {
    year: "2023",
    kicker: "The foundation",
    title: "Learned to make applications hold together.",
    detail:
      "At IUT Nantes, full-stack projects taught me the full path from an idea and a data model to something another person can actually use.",
  },
  {
    year: "2025",
    kicker: "The real world",
    title: "Pointed computer vision at fiber-optic defects.",
    detail:
      "At FPT Telecom, accuracy was only one part of the job. Latency, messy images, documentation, and leaving a maintainable pipeline behind mattered too.",
  },
  {
    year: "2025",
    kicker: "The leap",
    title: "Helped turn an NFC tag into a shipped product.",
    detail:
      "Waiki was the first time I led a team from a blank page to both app stores. It taught me that background reliability and team clarity are product features.",
  },
  {
    year: "2026",
    kicker: "The sharp edges",
    title: "Started breaking systems to understand them.",
    detail:
      "CTFs pulled me into cryptography, forensics, and OSINT. GardeFou brought that mindset to AI: build the vulnerable thing, attack it, then prove the defense works.",
  },
  {
    year: "Now",
    kicker: "The next chapter",
    title: "Studying AI, while keeping one foot outside the model.",
    detail:
      "I’m at INSA Rennes, building backend tools for an accessibility association and looking for a summer 2027 internship where software meets a hard, real problem.",
  },
];

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#ded8cc] px-5 py-24 text-[#121212] sm:px-8 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="relative z-10 grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
          <div className="md:sticky md:top-28 md:h-fit">
            <span className="font-serif text-2xl italic leading-none tracking-[-0.03em] text-[#121212]/70">
              How I got here
            </span>
            <h2 className="mt-5 max-w-[8ch] font-serif text-[clamp(4rem,7vw,7.5rem)] leading-[0.8] tracking-[-0.04em]">
              A path, not a checklist.
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-[#121212]/60">
              Each step made the next question a little more ambitious, and a little closer to the
              physical world.
            </p>
          </div>

          <div className="relative border-t border-[#121212]">
            {moments.map((moment, index) => (
              <motion.article
                key={moment.year + moment.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.7, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-4 border-b border-[#121212]/25 py-9 sm:grid-cols-[7rem_1fr] md:py-12"
              >
                <div>
                  <span className="font-serif text-3xl italic text-[#c8452b]">{moment.year}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-[#121212]/45">
                    {moment.kicker}
                  </span>
                  <h3 className="mt-3 max-w-2xl font-serif text-3xl leading-[0.98] md:text-5xl">
                    {moment.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#121212]/60">
                    {moment.detail}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ExperienceSection);
