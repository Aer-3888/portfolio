import { memo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function StatusSection() {
  const { t } = useTranslation("home");
  const principles = t("status.principles", { returnObjects: true });
  return (
    <section className="relative overflow-hidden bg-[#f1eee7] px-5 py-20 text-[#121212] sm:px-8 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 md:grid-cols-[0.6fr_1.4fr] md:gap-16">
          <div>
            <h2 className="font-serif text-2xl italic leading-none tracking-[-0.03em] text-[#121212]/70">
              {t("status.eyebrow")}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="max-w-5xl font-serif text-[clamp(2.6rem,5.2vw,5.8rem)] leading-[0.92] tracking-[-0.03em]">
              {t("status.headlinePre")}
              <span className="italic text-[#f04d2f]">{t("status.headlineAccent")}</span>
              {t("status.headlinePost")}
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid border-t border-[#121212] md:mt-20 md:grid-cols-3">
          {principles.map((principle, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="relative border-b border-[#121212]/25 py-7 md:min-h-[16rem] md:border-b-0 md:border-r md:border-[#121212] md:px-8 md:py-8 first:md:pl-0 last:md:border-r-0 last:md:pr-0"
            >
              <span className="font-mono text-[10px] tracking-[0.14em] text-[#121212]/45">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-10 font-serif text-3xl leading-none md:text-4xl">
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
