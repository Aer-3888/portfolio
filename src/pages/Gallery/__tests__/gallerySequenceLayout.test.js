import { describe, it, expect } from "vitest";
import { galleryPhotos } from "../galleryPhotos";

// Packs the real sequence into rows the way CSS grid does, then checks each row
// holds a single orientation.
const SPAN = { full: 6, half: 3, third: 2 };
const COLUMNS = 6;

function packIntoRows(photos) {
  const rows = [];
  let row = [];
  let used = 0;

  for (const photo of photos) {
    const span = SPAN[photo.weight];
    if (used + span > COLUMNS) {
      rows.push(row);
      row = [];
      used = 0;
    }
    row.push(photo);
    used += span;
  }
  if (row.length) rows.push(row);
  return rows;
}

const orientationOf = (p) => (p.height > p.width ? "portrait" : "landscape");

describe("gallery sequence layout", () => {
  it("gives every photo a known weight", () => {
    for (const photo of galleryPhotos) {
      expect(SPAN[photo.weight], `${photo.name} has weight "${photo.weight}"`).toBeDefined();
    }
  });

  it("packs every row exactly full, leaving no gaps", () => {
    for (const row of packIntoRows(galleryPhotos)) {
      const width = row.reduce((sum, p) => sum + SPAN[p.weight], 0);
      const names = row.map((p) => p.name).join(", ");
      expect(width, `row [${names}] spans ${width} of ${COLUMNS} columns`).toBe(COLUMNS);
    }
  });

  it("never mixes portrait and landscape in the same row", () => {
    for (const row of packIntoRows(galleryPhotos)) {
      const orientations = new Set(row.map(orientationOf));
      const detail = row.map((p) => `${p.name} (${orientationOf(p)})`).join(", ");
      expect(orientations.size, `row mixes orientations: ${detail}`).toBe(1);
    }
  });

  it("keeps aspect ratios within a row close enough not to read as ragged", () => {
    for (const row of packIntoRows(galleryPhotos)) {
      if (row.length < 2) continue;
      const ratios = row.map((p) => p.width / p.height);
      const spread = Math.max(...ratios) / Math.min(...ratios);
      const detail = row.map((p) => `${p.name} ${p.width}x${p.height}`).join(", ");
      expect(spread, `row varies too much in shape: ${detail}`).toBeLessThan(1.15);
    }
  });
});
