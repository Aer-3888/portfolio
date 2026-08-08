/**
 * The curation. Order is the whole design of the page, so this file is the one
 * a human edits. Machine truth lives in src/data/gallery.generated.js and is
 * merged in at module load.
 *
 * name    matches the generated entry, filename without extension
 * slug    the URL at /gallery/<slug>, kebab case, stable, never reused
 * place   real location, shown in the placard
 * alt     describes the photograph for screen readers, not the location
 * weight  full spans the measure, half pairs across, third triples across
 * note    optional one line, both languages, shown only on full weight frames
 *
 * The capture date is NOT here. It comes from EXIF and is formatted per locale,
 * so there is nothing to keep in sync and nothing to write by hand.
 *
 * TO FINISH: every `place` and `alt` below is a placeholder. The slugs are
 * derived from filenames so the routes work, and should be renamed to something
 * readable at the same time as the places. Nothing links here yet, so renaming
 * a slug now costs nothing.
 *
 * Order is chronological, which is a defensible default rather than a decision.
 * The two trips it contains are July 2023 (frames 1 to 5) and July 2024 (the
 * rest). Reorder freely, the page follows this array.
 *
 * Weights are set so full weight frames land on wide compositions and fall on
 * frames 1, 7, 13, 18, 21 and 25, which keeps the rows packing cleanly. Changing
 * one weight can leave a gap in a row, which is worth a look in the browser.
 */
export const sequence = [
  { name: "IMG_3006", slug: "img-3006", place: "REPLACE ME", alt: "REPLACE ME", weight: "full" },
  { name: "IMG_3153", slug: "img-3153", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_3338", slug: "img-3338", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_3360", slug: "img-3360", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_3439", slug: "img-3439", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_5775", slug: "img-5775", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_5860", slug: "img-5860", place: "REPLACE ME", alt: "REPLACE ME", weight: "full" },
  { name: "IMG_6157", slug: "img-6157", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_6260", slug: "img-6260", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_6266", slug: "img-6266", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_6282", slug: "img-6282", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_6470", slug: "img-6470", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_6481", slug: "img-6481", place: "REPLACE ME", alt: "REPLACE ME", weight: "full" },
  { name: "IMG_6539", slug: "img-6539", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_6540", slug: "img-6540", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_6647", slug: "img-6647", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_6652", slug: "img-6652", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_6701", slug: "img-6701", place: "REPLACE ME", alt: "REPLACE ME", weight: "full" },
  { name: "IMG_6729", slug: "img-6729", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_6940", slug: "img-6940", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_6944", slug: "img-6944", place: "REPLACE ME", alt: "REPLACE ME", weight: "full" },
  { name: "IMG_6950", slug: "img-6950", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_6976", slug: "img-6976", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_7026", slug: "img-7026", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_7048", slug: "img-7048", place: "REPLACE ME", alt: "REPLACE ME", weight: "full" },
];
