import { describe, it, expect } from "vitest";
import { mergeGallery, formatCaptureDate } from "../galleryPhotos";

const generated = [
  {
    name: "A",
    src: { thumb: "a-400", mid: "a-1200", full: "a-2000" },
    width: 100,
    height: 80,
    exif: { taken: "2024-07-22" },
  },
  {
    name: "B",
    src: { thumb: "b-400", mid: "b-1200", full: "b-2000" },
    width: 80,
    height: 100,
    exif: { taken: "2024-07-26" },
  },
  {
    name: "C",
    src: { thumb: "c-400", mid: "c-1200", full: "c-2000" },
    width: 100,
    height: 100,
    exif: { taken: "2023-07-14" },
  },
];

describe("mergeGallery", () => {
  it("follows the sequence order, not the generated order", () => {
    const seq = [
      { name: "C", slug: "c", place: "C", weight: "full", alt: "c" },
      { name: "A", slug: "a", place: "A", weight: "half", alt: "a" },
    ];
    const { photos } = mergeGallery(generated, seq);
    expect(photos.map((p) => p.name)).toEqual(["C", "A"]);
  });

  it("numbers photos from one in sequence order", () => {
    const seq = [
      { name: "C", slug: "c", place: "C", weight: "full", alt: "c" },
      { name: "A", slug: "a", place: "A", weight: "half", alt: "a" },
    ];
    const { photos } = mergeGallery(generated, seq);
    expect(photos.map((p) => p.index)).toEqual([1, 2]);
  });

  it("skips generated photos absent from the sequence and reports them", () => {
    const seq = [{ name: "A", slug: "a", place: "A", weight: "full", alt: "a" }];
    const { photos, skipped } = mergeGallery(generated, seq);
    expect(photos).toHaveLength(1);
    expect(skipped).toEqual(["B", "C"]);
  });

  it("keeps both generated and sequence fields on each photo", () => {
    const seq = [{ name: "A", slug: "a", place: "Rennes", weight: "full", alt: "a" }];
    const { photos } = mergeGallery(generated, seq);
    expect(photos[0].src.full).toBe("a-2000");
    expect(photos[0].place).toBe("Rennes");
  });

  it("throws when the sequence names a photo that does not exist", () => {
    const seq = [{ name: "Z", slug: "z", place: "Z", weight: "full", alt: "z" }];
    expect(() => mergeGallery(generated, seq)).toThrow(/Z/);
  });
});

describe("formatCaptureDate", () => {
  it("reads the capture date as a month and year in English", () => {
    expect(formatCaptureDate("2024-07-26", "en")).toBe("July 2024");
  });

  it("reads it in French", () => {
    expect(formatCaptureDate("2023-07-14", "fr")).toBe("juillet 2023");
  });

  it("falls back to English for an unknown language", () => {
    expect(formatCaptureDate("2024-07-26", "de")).toBe("July 2024");
  });

  it("returns an empty string when there is no date", () => {
    expect(formatCaptureDate("", "en")).toBe("");
    expect(formatCaptureDate(undefined, "en")).toBe("");
  });

  it("does not shift the month across a timezone boundary", () => {
    // A naive new Date("2024-07-01") parses as UTC midnight, which is still
    // June 30 in the Americas. Every date here must stay in its own month.
    expect(formatCaptureDate("2024-07-01", "en")).toBe("July 2024");
    expect(formatCaptureDate("2024-12-31", "en")).toBe("December 2024");
  });
});
