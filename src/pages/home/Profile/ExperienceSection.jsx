import { memo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function ExperienceSection() {
  const { t } = useTranslation("home");
  const moments = t("experience.moments", { returnObjects: true });
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#ded8cc] px-5 py-24 text-[#121212] sm:px-8 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="relative z-10 grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
          <div className="md:sticky md:top-28 md:h-fit">
            <span className="font-serif text-2xl italic leading-none tracking-[-0.03em] text-[#121212]/70">
              {t("experience.eyebrow")}
            </span>
            <h2 className="mt-5 max-w-[8ch] font-serif text-[clamp(4rem,7vw,7.5rem)] leading-[0.8] tracking-[-0.04em]">
              {t("experience.headline")}
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-[#121212]/60">
              {t("experience.intro")}
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
                  <h3 className="max-w-2xl font-serif text-3xl leading-[0.98] md:text-5xl">
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
