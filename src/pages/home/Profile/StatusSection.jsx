import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

function StatusSection() {
  const { t } = useTranslation("home");
  const principles = t("status.principles", { returnObjects: true });

  const prefersReducedMotion = useReducedMotion();

  // Beat 1. The headline rises out of its clip mask, or fades only when motion is reduced.
  const headlineMotion = prefersReducedMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
    : { initial: { opacity: 0, y: "100%" }, whileInView: { opacity: 1, y: "0%" } };

  // Beat 3. Items rise a short distance, overlapping the tail of the rule draw.
  const itemMotion = prefersReducedMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
    : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section className="relative overflow-hidden bg-[#f1eee7] px-5 py-20 text-[#121212] sm:px-8 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <h2 className="font-serif text-2xl italic leading-none tracking-[-0.03em] text-[#121212]/70">
          {t("status.eyebrow")}
        </h2>

        <div className="mt-8 overflow-hidden md:mt-10">
          <motion.p
            initial={headlineMotion.initial}
            whileInView={headlineMotion.whileInView}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[20ch] pb-[0.18em] font-serif text-[clamp(2.8rem,6.6vw,6.2rem)] leading-[0.92] tracking-[-0.03em]"
          >
            {t("status.headlinePre")}
            <span className="italic text-[#f04d2f]">{t("status.headlineAccent")}</span>
            {t("status.headlinePost")}
          </motion.p>
        </div>

        {/* Beat 2. The rule draws from the left once the headline is underway. */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 h-px w-full origin-left bg-[#121212] md:mt-16"
        />

        <div className="grid md:grid-cols-3">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              initial={itemMotion.initial}
              whileInView={itemMotion.whileInView}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: (prefersReducedMotion ? 0 : 0.6) + index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-b border-[#121212]/25 py-7 last:border-b-0 md:border-b-0 md:border-r md:border-[#121212]/25 md:px-10 md:py-9 first:md:pl-0 last:md:border-r-0 last:md:pr-0"
            >
              <span className="font-mono text-[10px] tracking-[0.14em] text-[#121212]/45">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 max-w-[22ch] font-serif text-xl leading-tight md:text-2xl">
                {principle.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#121212]/55">
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
