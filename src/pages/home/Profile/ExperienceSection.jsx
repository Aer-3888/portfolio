import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";

function ExperienceSection() {
  const { t } = useTranslation("home");
  const moments = t("experience.moments", { returnObjects: true });
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="bg-ground px-6 pb-24 pt-8 text-ink md:px-10 md:pb-32">
      <div className="mx-auto grid max-w-[100rem] grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-5 md:gap-6">
        {moments.map((moment, index) => (
          <motion.article
            key={moment.year + moment.title}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: reduced ? 0 : index * 0.05 }}
            className="border-t border-rule pt-4"
          >
            <span className="text-sm text-accent-deep">{moment.year}</span>
            <h3 className="mt-3 font-sans text-sm font-medium">{moment.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ash">{moment.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default memo(ExperienceSection);
