import { describe, it, expect } from "vitest";
import i18n from "../../../i18n";

const KEYS = [
  "eyebrow",
  "title",
  "intro",
  "count",
  "sheetHeading",
  "sheetAria",
  "placard.copyright",
  "photo.back",
  "photo.prev",
  "photo.next",
  "photo.of",
];

describe("gallery namespace", () => {
  it.each(["en", "fr"])("defines every gallery key in %s", (lang) => {
    for (const key of KEYS) {
      const value = i18n.getFixedT(lang, "gallery")(key);
      expect(value, `${lang}:gallery:${key}`).not.toBe(key);
      expect(value).toMatch(/\S/);
    }
  });

  it.each(["en", "fr"])("defines the gallery nav label in %s", (lang) => {
    expect(i18n.getFixedT(lang, "common")("nav.gallery")).toMatch(/\S/);
    expect(i18n.getFixedT(lang, "common")("nav.gallery")).not.toBe("nav.gallery");
  });

  it.each(["en", "fr"])("defines the gallery and photo seo entries in %s", (lang) => {
    const t = i18n.getFixedT(lang, "seo");
    for (const key of ["gallery.title", "gallery.description", "photo.title", "photo.description"]) {
      expect(t(key), `${lang}:seo:${key}`).not.toBe(key);
    }
  });

  it.each(["en", "fr"])("uses no em dashes or semicolons in %s copy", (lang) => {
    const flat = JSON.stringify(i18n.getResourceBundle(lang, "gallery"));
    expect(flat).not.toMatch(/—/);
    expect(flat).not.toMatch(/;/);
  });
});
