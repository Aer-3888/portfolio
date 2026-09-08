import { Link, useLocation } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getLangFromPath, localizePath } from "../../../i18n/localizePath";
import { reveal } from "../../../config/motion";

const PORTRAIT = `${import.meta.env.BASE_URL}images/optimized/me_.webp`;

export default function Hero() {
  const { t } = useTranslation("home");
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);
  const reduced = useReducedMotion();
  const cvUrl = `${import.meta.env.BASE_URL}cv${lang === "fr" ? "" : "_en"}.pdf`;

  return (
    <section className="bg-ground px-6 pb-16 pt-28 text-ink md:px-10 md:pb-20 md:pt-36">
      <motion.div
        {...reveal(reduced)}
        className="mx-auto grid max-w-[100rem] items-end gap-12 md:min-h-[calc(100svh-9rem)] md:grid-cols-[minmax(0,1fr)_14rem] md:gap-[8%]"
      >
        <div>
          <h1 className="max-w-[9ch] font-display text-[clamp(4rem,8.2vw,7.9rem)] leading-[0.95] tracking-[-0.04em]">
            {t("hero.headline")}
          </h1>

          <p className="mt-9 max-w-md text-body text-ash md:mt-10">{t("hero.identity")}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 font-sans text-small">
            <Link
              to={localizePath("/projects", lang)}
              className="underline decoration-accent-deep decoration-1 underline-offset-8 transition-colors duration-200 ease-site hover:text-accent-deep"
            >
              {t("hero.ctaWork")}
            </Link>
            <a
              href={cvUrl}
              download
              className="underline decoration-rule-strong decoration-1 underline-offset-8 transition-colors duration-200 ease-site hover:text-accent-deep"
            >
              {t("hero.ctaCv")}
            </a>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-[13.75rem] -rotate-4 grayscale transition duration-500 hover:grayscale-0 md:mb-[10vh] md:max-w-none">
          <img
            src={PORTRAIT}
            alt={t("hero.portraitAlt")}
            width={796}
            height={1024}
            fetchPriority="high"
            className="block aspect-[4/5] w-full object-cover object-top"
          />
        </figure>
      </motion.div>
    </section>
  );
}
