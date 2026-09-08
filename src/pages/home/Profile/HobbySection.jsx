import { motion, useReducedMotion } from "framer-motion";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { galleryPhotos } from "../../Gallery/galleryPhotos";
import { getLangFromPath, localizePath } from "../../../i18n/localizePath";

const photoSet = [galleryPhotos[20], galleryPhotos[12]];

export default function HobbySection() {
  const { t } = useTranslation("home");
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const galleryPath = localizePath("/gallery", getLangFromPath(pathname));

  return (
    <section id="hobbies" className="border-t border-rule bg-ground px-6 py-20 text-ink md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[100rem] items-center gap-12 md:grid-cols-[.7fr_1.3fr] md:gap-[9%]">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-[clamp(3.5rem,5.4vw,4.75rem)] leading-none tracking-[-0.025em]">
            {t("hobbies.heading")}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ash">{t("hobbies.body")}</p>
          <Link
            to={galleryPath}
            className="mt-7 inline-block border-b border-accent pb-1.5 text-sm transition-colors hover:text-accent-deep"
          >
            {t("hobbies.viewPhotos")}
          </Link>
        </motion.div>

        <Link to={galleryPath} className="grid grid-cols-2 gap-5" aria-label={t("hobbies.galleryAria")}>
          {photoSet.map((photo, index) => (
            <motion.figure
              key={photo.slug}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: reduced ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={index === 1 ? "mt-16" : ""}
            >
              <img
                src={photo.src.mid}
                alt={index === 0 ? t("hobbies.alt1") : t("hobbies.alt2")}
                className="aspect-[3/4] w-full object-cover"
              />
            </motion.figure>
          ))}
        </Link>
      </div>
    </section>
  );
}
