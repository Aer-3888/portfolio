import { generatedPhotos } from "../../data/gallery.generated";
import { sequence } from "./gallerySequence";

/**
 * Machine truth and curation are separate files so regenerating EXIF can never
 * overwrite hand written copy. This joins them on `name`.
 *
 * A generated photo missing from the sequence is skipped, not appended, so
 * dropping a JPEG into the folder never silently publishes it. A sequence entry
 * with no generated photo is a mistake worth failing loudly on.
 */
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

/**
 * The capture date comes from EXIF, so there is nothing to keep in sync and
 * nothing to write by hand. Day precision is more than a placard needs, so this
 * renders month and year.
 *
 * Parsed into an explicit UTC date and formatted in UTC. Passing the raw string
 * to `new Date` parses it as UTC midnight, which a viewer in the Americas would
 * see as the previous day, and the first of any month would fall back a month.
 */
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

// Deliberately does not wrap. The order is authored, so looping past the last
// frame back to the first would undercut the sequence.
export function photoNeighbours(slug) {
  const i = galleryPhotos.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? galleryPhotos[i - 1] : null,
    next: i < galleryPhotos.length - 1 ? galleryPhotos[i + 1] : null,
  };
}
