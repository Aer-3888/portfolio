import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SOCIALS, EMAIL } from "../../config/siteData";
import { getLangFromPath } from "../../i18n/localizePath";
import ArcadeMachine from "./ArcadeMachine";
import PageNav from "../../components/layout/PageNav";
import useSeo from "../../hooks/useSeo";

export default function ContactPage() {
  const { t } = useTranslation("contact");
  const { t: tSeo } = useTranslation("seo");
  const location = useLocation();
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useSeo({
    title: tSeo("contact.title"),
    description: tSeo("contact.description"),
    path: "/contact",
    lang: getLangFromPath(location.pathname),
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Paris",
        })
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => () => window.clearTimeout(copyTimerRef.current), []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f1eee7] font-sans text-[#171717]">
      <PageNav currentPath="/contact" />

      <motion.main
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReduced ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
        className="mx-auto w-full max-w-[1600px] px-5 pb-[calc(var(--safe-bottom)+2.5rem)] pt-[calc(var(--safe-top)+var(--mobile-nav-height)+3rem)] sm:px-8 md:px-12 md:pb-12 md:pt-44"
      >
        <header className="border-b border-black/20 pb-16 md:pb-24">
          <h1 className="font-serif text-[clamp(4.7rem,10vw,10rem)] leading-[0.76] tracking-[-0.045em]">
            {t("headlineLine1")}
            <br />
            {t("headlineLine2")}
          </h1>
        </header>

        <div className="grid border-b border-black/20 md:grid-cols-12">
          <section className="flex flex-col justify-between py-14 md:col-span-7 md:min-h-[34rem] md:py-20 md:pr-12 lg:pr-20">
            <p className="max-w-md text-sm leading-relaxed text-black/55 md:text-base">
              {t("intro")}
            </p>

            <div className="mt-20 md:mt-24">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-block break-all text-[clamp(1.35rem,3.2vw,3.8rem)] leading-tight tracking-[-0.035em] text-black transition-colors hover:text-[#2356d8]"
              >
                {EMAIL}
              </a>
              <div className="mt-7 flex items-center gap-5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="min-h-11 cursor-pointer bg-[#ffca45] px-5 text-sm text-black transition-transform hover:-translate-y-0.5"
                >
                  {copied ? t("copied") : t("copy")}
                </button>
                <span aria-live="polite" className="text-xs text-black/40">
                  {copied ? t("copiedHint") : t("copyHint")}
                </span>
              </div>
            </div>
          </section>

          <aside className="border-t border-black/20 py-8 md:col-span-5 md:border-l md:border-t-0 md:p-8 lg:p-12">
            <div className="h-[24rem] overflow-hidden md:h-full md:min-h-[30rem]">
              <ArcadeMachine />
            </div>
          </aside>
        </div>

        <div className="grid gap-10 py-10 text-sm text-black/55 sm:grid-cols-2 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p>{t("location")}</p>
            <p className="mt-1 text-black/35">{t("localTime", { time })}</p>
          </div>
          <p className="max-w-xs md:col-span-4">{t("availability")}</p>
          <nav
            aria-label={t("socialAria")}
            className="flex flex-wrap gap-x-7 gap-y-3 sm:justify-end md:col-span-5"
          >
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex cursor-pointer items-center gap-2 text-black transition-colors hover:text-[#2356d8]"
              >
                {social.label}
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            ))}
          </nav>
        </div>
      </motion.main>

      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025] mix-blend-multiply"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
