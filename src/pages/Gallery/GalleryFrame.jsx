import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { formatCaptureDate } from "./galleryPhotos";

// Rendered width per weight. Keep in sync with the grid in GalleryPage.
const SIZES = {
  full: "(min-width: 768px) 72vw, 92vw",
  half: "(min-width: 768px) 36vw, 92vw",
  third: "(min-width: 768px) 24vw, 46vw",
};

const WIDTH_CLASS = {
  full: "col-span-6",
  half: "col-span-6 md:col-span-3",
  third: "col-span-3 md:col-span-2",
};

// Full frames are capped by height, or a full weight portrait runs taller than
// the viewport.
const IMAGE_CLASS = {
  full: "mx-auto max-h-[82vh] w-auto max-w-full",
  half: "w-full",
  third: "w-full",
};

export default function GalleryFrame({ photo }) {
  const { i18n } = useTranslation("gallery");
  const prefersReducedMotion = useReducedMotion();
  const { exif } = photo;

  const technical = [exif.camera, exif.focal, exif.aperture, exif.shutter, `ISO ${exif.iso}`]
    .filter(Boolean)
    .join("  ");

  const date = formatCaptureDate(exif.taken, i18n.language);
  const note = photo.weight === "full" ? photo.note?.[i18n.language] ?? photo.note?.en : null;

  return (
    <motion.figure
      id={`frame-${photo.slug}`}
      className={`${WIDTH_CLASS[photo.weight]} scroll-mt-24`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/gallery/${photo.slug}`} className="group block">
        {/* 400px is contact sheet only, too soft for a frame at any size. */}
        <img
          src={photo.src.full}
          srcSet={`${photo.src.mid} 1200w, ${photo.src.full} 2000w`}
          sizes={SIZES[photo.weight]}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading={photo.index <= 2 ? "eager" : "lazy"}
          decoding="async"
          className={`${IMAGE_CLASS[photo.weight]} transition-opacity duration-500 group-hover:opacity-90`}
        />
      </Link>

      <figcaption className="mt-4 flex items-baseline gap-4 border-t border-stone pt-3">
        <span aria-hidden="true" className="font-mono text-[10px] text-pebble">
          {String(photo.index).padStart(2, "0")}
        </span>
        <span className="flex-1">
          <span className="block text-sm text-ink">
            {photo.place}
            {date ? `, ${date}` : ""}
          </span>
          <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.12em] text-ash sm:block">
            {technical}
          </span>
          <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-ash sm:hidden">
            {exif.aperture}
          </span>
          {note && <span className="mt-3 block max-w-prose text-sm leading-relaxed text-ash">{note}</span>}
        </span>
      </figcaption>
    </motion.figure>
  );
}
