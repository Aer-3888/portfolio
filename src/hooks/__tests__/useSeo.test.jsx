import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import useSeo from "../useSeo";

describe("useSeo hreflang", () => {
  it("emits en, fr and x-default alternates for a path", () => {
    renderHook(() => useSeo({ title: "T", description: "D", path: "/projects", lang: "en" }));
    const alts = [...document.head.querySelectorAll("link[rel='alternate']")];
    const map = Object.fromEntries(
      alts.map((l) => [l.getAttribute("hreflang"), l.getAttribute("href")])
    );
    expect(map.en).toMatch(/\/projects$/);
    expect(map.fr).toMatch(/\/fr\/projects$/);
    expect(map["x-default"]).toMatch(/\/projects$/);
  });

  it("localizes the canonical url to the active language", () => {
    renderHook(() => useSeo({ title: "T", description: "D", path: "/contact", lang: "fr" }));
    const canonical = document.head.querySelector("link[rel='canonical']");
    expect(canonical.getAttribute("href")).toMatch(/\/fr\/contact$/);
  });
});

describe("useSeo og:image", () => {
  it("leaves og:image alone when no image is given", () => {
    document.head.querySelector('meta[property="og:image"]')?.remove();
    renderHook(() => useSeo({ title: "T", description: "D", path: "/projects" }));
    expect(document.head.querySelector('meta[property="og:image"]')).toBeNull();
  });

  it("writes an absolute og:image when given a path", () => {
    renderHook(() =>
      useSeo({ title: "T", description: "D", path: "/gallery/a", image: "/images/x.webp" })
    );
    expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://portfolio-theo.pages.dev/images/x.webp"
    );
  });

  it("mirrors the image onto twitter:image", () => {
    renderHook(() =>
      useSeo({ title: "T", description: "D", path: "/gallery/a", image: "/images/x.webp" })
    );
    expect(document.head.querySelector('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      "https://portfolio-theo.pages.dev/images/x.webp"
    );
  });

  it("passes an already absolute image through unchanged", () => {
    renderHook(() =>
      useSeo({
        title: "T",
        description: "D",
        path: "/gallery/a",
        image: "https://cdn.example/x.webp",
      })
    );
    expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://cdn.example/x.webp"
    );
  });
});
