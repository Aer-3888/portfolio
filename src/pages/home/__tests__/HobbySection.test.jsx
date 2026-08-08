import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithI18n } from "../../../test-utils";
import HobbySection from "../Profile/HobbySection";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useReducedMotion: () => false,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      figure: ({ children, ...props }) => <figure {...props}>{children}</figure>,
    },
  };
});

vi.mock("../../Gallery/galleryPhotos", () => ({
  galleryPhotos: Array.from({ length: 25 }, (_, i) => ({
    slug: `p${i}`,
    place: "Rennes",
    alt: `photo ${i}`,
    width: 100,
    height: 80,
    src: { thumb: `p${i}-400`, mid: `p${i}-1200`, full: `p${i}-2000` },
    exif: { taken: "2024-07-22" },
  })),
}));

describe("HobbySection", () => {
  it("sends both doors to the gallery route", () => {
    renderWithI18n(<HobbySection />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/gallery");
    }
  });

  it("renders no buttons, since the modal is gone", () => {
    renderWithI18n(<HobbySection />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("still shows three preview photos", () => {
    renderWithI18n(<HobbySection />);
    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("uses the mid derivative for the previews, not the full size", () => {
    renderWithI18n(<HobbySection />);
    for (const img of screen.getAllByRole("img")) {
      expect(img.getAttribute("src")).toMatch(/-1200$/);
    }
  });
});
