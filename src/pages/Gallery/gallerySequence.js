/**
 * The curation, edited by hand. EXIF lives in src/data/gallery.generated.js.
 *
 * name    matches the generated entry, filename without extension
 * slug    the URL at /gallery/<slug>, stable once shared
 * place   real location, shown in the placard
 * alt     describes the photograph, not the location
 * weight  full spans the row, half pairs across, third triples across
 * note    optional, both languages, shown only on full weight frames
 *
 * Capture date is not here, it comes from EXIF and is formatted per locale.
 *
 * TO FINISH: every `place` and `alt` is a placeholder, and the slugs should be
 * renamed to something readable at the same time.
 *
 * Rows must not mix orientations. Frames in a row share a column width, so a
 * portrait beside a landscape is 2.25 times taller and the row reads as broken.
 * Halves come in pairs, thirds in threes, a full frame stands alone.
 */
export const sequence = [
  // Panorama, 2:1, opens the page alone.
  { name: "IMG_3153", slug: "img-3153", place: "REPLACE ME", alt: "REPLACE ME", weight: "full" },

  // Landscape pair.
  { name: "IMG_3338", slug: "img-3338", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_5860", slug: "img-5860", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },

  // Portrait trio.
  { name: "IMG_3006", slug: "img-3006", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_3360", slug: "img-3360", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_3439", slug: "img-3439", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },

  // Landscape, full width.
  { name: "IMG_6701", slug: "img-6701", place: "REPLACE ME", alt: "REPLACE ME", weight: "full" },

  // Landscape pair.
  { name: "IMG_6260", slug: "img-6260", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_6266", slug: "img-6266", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },

  // Portrait trio.
  { name: "IMG_5775", slug: "img-5775", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_6470", slug: "img-6470", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_6540", slug: "img-6540", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },

  // Landscape, full width.
  { name: "IMG_6282", slug: "img-6282", place: "REPLACE ME", alt: "REPLACE ME", weight: "full" },

  // Landscape pair.
  { name: "IMG_6481", slug: "img-6481", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_6539", slug: "img-6539", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },

  // Portrait trio.
  { name: "IMG_6647", slug: "img-6647", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_6729", slug: "img-6729", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_6940", slug: "img-6940", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },

  // Landscape, full width.
  { name: "IMG_6944", slug: "img-6944", place: "REPLACE ME", alt: "REPLACE ME", weight: "full" },

  // Landscape pair.
  { name: "IMG_7026", slug: "img-7026", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },
  { name: "IMG_7048", slug: "img-7048", place: "REPLACE ME", alt: "REPLACE ME", weight: "half" },

  // Portrait trio.
  { name: "IMG_6157", slug: "img-6157", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_6950", slug: "img-6950", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },
  { name: "IMG_6976", slug: "img-6976", place: "REPLACE ME", alt: "REPLACE ME", weight: "third" },

  // Tallest frame, closes the page alone.
  { name: "IMG_6652", slug: "img-6652", place: "REPLACE ME", alt: "REPLACE ME", weight: "full" },
];
