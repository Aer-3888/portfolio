import { generatedPhotos } from "../../data/gallery.generated";
import { sequence } from "./gallerySequence";

// Joins generated EXIF with hand written curation on `name`. Photos missing from
// the sequence are skipped so a stray JPEG never publishes itself.
export function mergeGallery(generated, seq) {
  const byName = new Map(generated.map((p) => [p.name, p]));

  const photos = seq.map((entry, i) => {
    const source = byName.get(entry.name);
    if (!source) {
      throw new Error(
        `gallerySequence lists "${entry.name}" but no generated photo matches. ` +
          `Add the file to public/images/Gallery and run npm run optimize:images.`
      );
    }
    return { ...source, ...entry, index: i + 1 };
  });

  const listed = new Set(seq.map((e) => e.name));
  const skipped = generated.filter((p) => !listed.has(p.name)).map((p) => p.name);

  return { photos, skipped };
}

// Formatted in explicit UTC. Parsing the raw string would land on the previous
// day west of Greenwich, dropping the first of a month into the month before.
export function formatCaptureDate(taken, lang = "en") {
  if (!taken) return "";
  const [year, month, day] = taken.split("-").map(Number);
  if (!year || !month) return "";
  const locale = lang === "fr" ? "fr-FR" : "en-GB";
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day || 1)));
}

const merged = mergeGallery(generatedPhotos, sequence);

if (import.meta.env.DEV && merged.skipped.length > 0) {
  console.info(
    `[gallery] ${merged.skipped.length} photo(s) not in the sequence, so not shown: ${merged.skipped.join(", ")}`
  );
}

export const galleryPhotos = merged.photos;

export function findPhotoBySlug(slug) {
  return galleryPhotos.find((p) => p.slug === slug) ?? null;
}

// Does not wrap. The order is authored, so looping past the last frame would
// undercut the sequence.
export function photoNeighbours(slug) {
  const i = galleryPhotos.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? galleryPhotos[i - 1] : null,
    next: i < galleryPhotos.length - 1 ? galleryPhotos[i + 1] : null,
  };
}
