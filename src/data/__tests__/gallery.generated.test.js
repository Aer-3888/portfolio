import { describe, it, expect } from "vitest";
import { generatedPhotos } from "../gallery.generated";

describe("gallery.generated", () => {
  it("has one entry per source photo", () => {
    expect(generatedPhotos).toHaveLength(25);
  });

  it("gives every photo three derivative sizes", () => {
    for (const photo of generatedPhotos) {
      expect(photo.src.thumb).toMatch(/-400\.webp$/);
      expect(photo.src.mid).toMatch(/-1200\.webp$/);
      expect(photo.src.full).toMatch(/-2000\.webp$/);
    }
  });

  it("gives every photo positive intrinsic dimensions", () => {
    for (const photo of generatedPhotos) {
      expect(photo.width).toBeGreaterThan(0);
      expect(photo.height).toBeGreaterThan(0);
    }
  });

  it("gives every photo real EXIF, not placeholders", () => {
    for (const photo of generatedPhotos) {
      expect(photo.exif.camera).toMatch(/\S/);
      expect(photo.exif.aperture).toMatch(/^f\/\d/);
      expect(photo.exif.shutter).toMatch(/^(1\/\d+|\d+(\.\d+)?s)$/);
      expect(photo.exif.iso).toBeGreaterThan(0);
      expect(photo.exif.taken).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("reports portrait photos as portrait after EXIF rotation", () => {
    const hasPortrait = generatedPhotos.some((p) => p.height > p.width);
    expect(hasPortrait).toBe(true);
  });
});
