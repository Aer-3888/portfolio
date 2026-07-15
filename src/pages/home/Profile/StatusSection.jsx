import { memo } from "react";
import { motion } from "framer-motion";

const principles = [
  {
    number: "01",
    title: "Find the friction",
    text: "A blocker that is too easy to disable. A model that looks good only in a notebook. A file you know exists but still can’t find.",
  },
  {
    number: "02",
    title: "Get uncomfortably close",
    text: "Native bridges, signed messages, raycast vision, physical NFC tags. The interesting part is usually below the convenient abstraction.",
  },
  {
    number: "03",
    title: "Put it in someone’s hands",
    text: "Shipping changes the question. Reliability, trust, and whether it helps a real person suddenly matter more than the clever bit.",
  },
];

function StatusSection() {
  return (
    <section className="relative overflow-hidden bg-[#f1eee7] px-5 py-24 text-[#121212] sm:px-8 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 md:grid-cols-[0.6fr_1.4fr] md:gap-16">
          <div>
            <h2 className="font-serif text-2xl italic leading-none tracking-[-0.03em] text-[#121212]/70">
              How I work
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif text-[clamp(3.1rem,6.8vw,7.5rem)] leading-[0.86] tracking-[-0.035em]">
              Most projects start when I hit a{" "}
              <span className="italic text-[#f04d2f]">frustrating limit</span> and wonder who
              decided it had to stay there.
            </p>
            <p className="ml-auto mt-10 max-w-xl text-base leading-relaxed text-[#121212]/60 md:text-lg">
              I’ve worked on mobile apps, computer vision, CTFs, and NFC hardware. I like
              understanding how things work, then turning that knowledge into something useful.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid border-t border-[#121212] md:mt-28 md:grid-cols-3">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.number}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="relative border-b border-[#121212]/25 py-8 md:min-h-[20rem] md:border-b-0 md:border-r md:border-[#121212] md:px-8 md:py-10 first:md:pl-0 last:md:border-r-0 last:md:pr-0"
            >
              <span className="font-mono text-[10px] tracking-[0.14em] text-[#121212]/45">
                {principle.number}
              </span>
              <h3 className="mt-12 font-serif text-4xl leading-none md:text-5xl">
                {principle.title}
              </h3>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#121212]/55">
                {principle.text}
              </p>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default memo(StatusSection);
