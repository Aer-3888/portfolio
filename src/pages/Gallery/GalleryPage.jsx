import { useEffect } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useScroll } from "framer-motion";
import PageNav from "../../components/layout/PageNav";
import PageTransition from "../../components/layout/PageTransition";
import useSeo from "../../hooks/useSeo";
import { getLangFromPath } from "../../i18n/localizePath";
import { galleryPhotos } from "./galleryPhotos";
import GalleryFrame from "./GalleryFrame";
import GalleryContactSheet from "./GalleryContactSheet";

export default function GalleryPage() {
  const { scrollYProgress } = useScroll();
  const { t } = useTranslation("gallery");
  const { t: tSeo } = useTranslation("seo");
  const location = useLocation();

  useSeo({
    title: tSeo("gallery.title"),
    description: tSeo("gallery.description"),
    path: "/gallery",
    lang: getLangFromPath(location.pathname),
  });

  /*
    PageTransition resets scroll to the top on mount, which is right for a fresh
    arrival and wrong when the reader is coming back from a photo page. The photo
    page hands the slug back through router state, and this lands them on the
    frame they left. Same mechanism the home page uses for its section links.
  */
  useEffect(() => {
    const slug = location.state?.scrollTo;
    if (!slug) return;
    const el = document.getElementById(`frame-${slug}`);
    if (!el) return;
    const timer = setTimeout(() => el.scrollIntoView({ block: "center" }), 50);
    return () => clearTimeout(timer);
  }, [location.state]);

  return (
    <PageTransition className="walden min-h-screen bg-paper text-ink">
      <PageNav currentPath="/gallery" scrollYProgress={scrollYProgress} />

      <main className="mx-auto max-w-[1500px] px-5 pb-32 pt-32 sm:px-8 md:px-12 md:pt-44">
        <header className="max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pebble">
            {t("eyebrow")}
          </span>
          <h1 className="mt-6 font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.85] tracking-[-0.04em]">
            {t("title")}
          </h1>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-ash">{t("intro")}</p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-pebble">
            {t("count", { count: galleryPhotos.length })}
          </p>
        </header>

        <div className="mt-24 grid grid-cols-6 gap-x-6 gap-y-24 md:mt-36 md:gap-y-40">
          {galleryPhotos.map((photo) => (
            <GalleryFrame key={photo.slug} photo={photo} />
          ))}
        </div>

        <GalleryContactSheet photos={galleryPhotos} />
      </main>
    </PageTransition>
  );
}
