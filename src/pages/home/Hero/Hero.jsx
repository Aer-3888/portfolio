import { Link, useLocation } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getLangFromPath, localizePath } from "../../../i18n/localizePath";
import { reveal } from "../../../config/motion";
import PhoneScreen from "../Stage/PhoneScreen";

const PORTRAIT = `${import.meta.env.BASE_URL}images/optimized/me_.webp`;

export default function Hero({
  figureRef,
  figureStyle,
  textStyle,
  textRef,
  screen = <PhoneScreen />,
}) {
  const { t } = useTranslation("home");
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);
  const reduced = useReducedMotion();
  const cvUrl = `${import.meta.env.BASE_URL}cv${lang === "fr" ? "" : "_en"}.pdf`;
  const facts = t("hero.facts", { returnObjects: true });

  return (
    <section className="bg-ground px-6 pt-28 text-ink md:px-10 md:pt-24">
      <motion.div
        {...reveal(reduced)}
        className="mx-auto grid max-w-[100rem] gap-12 md:min-h-[calc(100svh-6rem)] md:grid-cols-12 md:gap-6"
      >
        <motion.div
          style={textStyle}
          ref={textRef}
          className="flex flex-col gap-12 md:col-span-7 md:pb-12"
        >
          <div className="md:my-auto">
            <h1 className="font-display text-[clamp(4.5rem,11vw,13rem)] leading-[0.9] tracking-[-0.03em]">
              {t("hero.headline")}
            </h1>

            <p className="mt-8 max-w-[36ch] text-body-lg text-ash">{t("hero.identity")}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-small">
              <a
                href={cvUrl}
                download
                className="underline decoration-accent-deep decoration-1 underline-offset-8 transition-colors duration-200 ease-site hover:text-accent-deep"
              >
                {t("hero.ctaCv")}
              </a>
              <Link
                to={localizePath("/projects", lang)}
                className="underline decoration-rule-strong decoration-1 underline-offset-8 transition-colors duration-200 ease-site hover:text-accent-deep"
              >
                {t("hero.ctaWork")}
              </Link>
            </div>
          </div>

          <dl className="grid gap-6 border-t border-rule pt-6 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-caption text-ash">{fact.label}</dt>
                <dd className="mt-1 text-small tabular-nums">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.figure
          ref={figureRef}
          style={figureStyle}
          className="relative mx-auto w-full max-w-[22rem] self-end md:col-span-5 md:col-start-8 md:mx-0 md:max-w-[calc((100svh-6rem)*0.8)] md:justify-self-end"
        >
          <img
            src={PORTRAIT}
            alt={t("hero.portraitAlt")}
            width={796}
            height={1024}
            fetchPriority="high"
            className="block aspect-[4/5] w-full object-cover object-top grayscale transition duration-500 hover:grayscale-0"
          />
          {screen}
        </motion.figure>
      </motion.div>
    </section>
  );
}
