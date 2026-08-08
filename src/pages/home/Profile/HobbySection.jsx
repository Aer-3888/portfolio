import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { galleryPhotos } from "../../Gallery/galleryPhotos";

const photoSet = [galleryPhotos[20], galleryPhotos[12], galleryPhotos[10]];

export default function HobbySection() {
  const { t } = useTranslation("home");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#ffca45] px-5 py-24 text-[#121212] sm:px-8 md:px-12 md:py-36">
      <div className="absolute -left-24 top-20 h-64 w-64 rounded-full border border-[#121212]/20 md:h-[30rem] md:w-[30rem]" />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid items-center gap-16 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/50">
              {t("hobbies.eyebrow")}
            </span>
            <h2 className="mt-6 max-w-[9ch] font-serif text-[clamp(4rem,7.5vw,8rem)] leading-[0.8] tracking-[-0.04em]">
              {t("hobbies.headlinePre")}
              <span className="italic text-[#2356d8]">{t("hobbies.headlineAccent")}</span>
            </h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-[#121212]/65">
              {t("hobbies.body")}
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <div className="border-t border-[#121212] pt-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#121212]/45">
                  {t("hobbies.boulderingLabel")}
                </span>
                <p className="mt-3 text-sm leading-relaxed">
                  {t("hobbies.boulderingText")}
                </p>
              </div>
              <div className="border-t border-[#121212] pt-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#121212]/45">
                  {t("hobbies.escapeLabel")}
                </span>
                <p className="mt-3 text-sm leading-relaxed">
                  {t("hobbies.escapeText")}
                </p>
              </div>
            </div>

          </motion.div>

          <div className="relative">
            <Link
              to="/gallery"
              className="group relative mx-auto block h-[34rem] w-full max-w-[42rem] cursor-pointer text-left sm:h-[44rem] md:h-[48rem]"
              aria-label={t("hobbies.galleryAria")}
            >
            <motion.figure
              initial={prefersReducedMotion ? false : { opacity: 0, rotate: -6, x: -30 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, rotate: -5, x: 0 }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-2 top-[8%] z-10 w-[55%] bg-[#f1eee7] p-2 pb-9 shadow-xl sm:p-3 sm:pb-12"
            >
              <img
                src={photoSet[1].src.mid}
                alt={t("hobbies.alt1")}
                className="aspect-[4/5] w-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
              />
              <figcaption className="absolute bottom-3 left-3 font-mono text-[8px] uppercase tracking-[0.1em] text-[#121212]/55 sm:bottom-4 sm:left-4">
                {photoSet[1].place} · © Théo Phan
              </figcaption>
            </motion.figure>

            <motion.figure
              initial={prefersReducedMotion ? false : { opacity: 0, rotate: 6, x: 30 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, rotate: 5, x: 0 }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 w-[62%] bg-[#2356d8] p-2 pb-9 shadow-xl sm:p-3 sm:pb-12"
            >
              <img
                src={photoSet[0].src.mid}
                alt={t("hobbies.alt2")}
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 font-mono text-[8px] uppercase tracking-[0.1em] text-white/70 sm:bottom-4 sm:left-4">
                {photoSet[0].place} · © Théo Phan
              </figcaption>
            </motion.figure>

            <motion.figure
              initial={prefersReducedMotion ? false : { opacity: 0, y: 35, rotate: -2 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0, rotate: -1 }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-[16%] z-20 w-[66%] bg-[#f1eee7] p-2 pb-9 shadow-2xl sm:p-3 sm:pb-12"
            >
              <img
                src={photoSet[2].src.mid}
                alt={t("hobbies.alt3")}
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 font-mono text-[8px] uppercase tracking-[0.1em] text-[#121212]/55 sm:bottom-4 sm:left-4">
                {photoSet[2].place} · © Théo Phan
              </figcaption>
            </motion.figure>
            </Link>

            <Link
              to="/gallery"
              className="group absolute right-2 top-[56%] z-30 grid h-28 w-28 cursor-pointer place-items-center rounded-full bg-[#2356d8] p-4 text-center font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:rotate-6 hover:scale-105 sm:h-32 sm:w-32"
              aria-label={t("hobbies.viewPhotos")}
            >
              <span>{t("hobbies.viewPhotos")}</span>
              <span className="text-lg transition-transform group-hover:rotate-12">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
