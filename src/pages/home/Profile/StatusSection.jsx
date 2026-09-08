import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

function StatusSection() {
  const { t } = useTranslation("home");
  const principles = t("status.principles", { returnObjects: true });
  const reduced = useReducedMotion();

  return (
    <section className="border-t border-rule bg-ground px-6 pb-12 pt-24 text-ink md:px-10 md:pb-16 md:pt-32">
      <div className="mx-auto max-w-[100rem]">
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3.5rem,5.4vw,4.75rem)] leading-none tracking-[-0.025em]"
        >
          {t("status.eyebrow")}
        </motion.h2>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-[12%]">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[25em] text-[clamp(1.25rem,2vw,1.45rem)] leading-[1.4]"
          >
            {t("status.headline")}
          </motion.p>

          <div>
            {principles.map((principle, index) => (
              <motion.article
                key={principle.title}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: reduced ? 0 : index * 0.06 }}
                className="mt-7 first:mt-0"
              >
                <h3 className="font-sans text-base font-medium">{principle.title}</h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ash">{principle.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(StatusSection);
