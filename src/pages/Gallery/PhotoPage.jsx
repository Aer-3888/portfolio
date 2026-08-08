import { useParams, useLocation, Link, Navigate } from "react-router";
import { useTranslation } from "react-i18next";
import PageNav from "../../components/layout/PageNav";
import PageTransition from "../../components/layout/PageTransition";
import useSeo from "../../hooks/useSeo";
import { getLangFromPath } from "../../i18n/localizePath";
import { galleryPhotos, findPhotoBySlug, photoNeighbours, formatCaptureDate } from "./galleryPhotos";

// A real route, not a lightbox, so there is no focus trap or scroll lock here.
// Near black is the one departure from the paper palette.
export default function PhotoPage() {
  const { slug } = useParams();
  const location = useLocation();
  const { t, i18n } = useTranslation("gallery");
  const { t: tSeo } = useTranslation("seo");

  const photo = findPhotoBySlug(slug);
  const { prev, next } = photoNeighbours(slug);
  const date = photo ? formatCaptureDate(photo.exif.taken, i18n.language) : "";

  useSeo({
    title: photo ? tSeo("photo.title", { place: photo.place }) : tSeo("gallery.title"),
    description: photo
      ? tSeo("photo.description", { place: photo.place, date })
      : tSeo("gallery.description"),
    path: photo ? `/gallery/${photo.slug}` : "/gallery",
    lang: getLangFromPath(location.pathname),
    image: photo?.src.full,
  });

  if (!photo) return <Navigate to="/gallery" replace />;

  const { exif } = photo;
  const technical = [
    exif.camera,
    exif.lens,
    exif.focal,
    exif.aperture,
    exif.shutter,
    `ISO ${exif.iso}`,
  ]
    .filter(Boolean)
    .join("  ");

  return (
    <PageTransition className="min-h-screen bg-sumi text-white">
      <PageNav currentPath="/gallery" />

      <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-5 py-28 sm:px-8">
        <img
          src={photo.src.full}
          srcSet={`${photo.src.mid} 1200w, ${photo.src.full} 2000w`}
          sizes="(min-width: 768px) 88vw, 100vw"
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          decoding="async"
          className="max-h-[74vh] w-auto max-w-full object-contain"
        />

        <figcaption className="w-full max-w-4xl">
          <p className="text-sm text-white/85">
            {photo.place}
            {date ? `, ${date}` : ""}
          </p>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
            {technical}
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">
            {t("photo.of", { index: photo.index, total: galleryPhotos.length })}
          </p>
        </figcaption>

        <nav className="flex w-full max-w-4xl items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
          <span className="flex-1">
            {prev && (
              <Link
                to={`/gallery/${prev.slug}`}
                className="text-white/50 transition-colors hover:text-white"
              >
                {t("photo.prev")}
              </Link>
            )}
          </span>
          {/* The slug travels back so GalleryPage can restore the scroll. */}
          <Link
            to="/gallery"
            state={{ scrollTo: photo.slug }}
            className="flex-1 text-center text-white/50 transition-colors hover:text-white"
          >
            {t("photo.back")}
          </Link>
          <span className="flex-1 text-right">
            {next && (
              <Link
                to={`/gallery/${next.slug}`}
                className="text-white/50 transition-colors hover:text-white"
              >
                {t("photo.next")}
              </Link>
            )}
          </span>
        </nav>
      </main>
    </PageTransition>
  );
}
