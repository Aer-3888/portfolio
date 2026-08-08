import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithI18n } from "../../../test-utils";
import GalleryPage from "../GalleryPage";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useReducedMotion: () => false,
    useScroll: () => ({ scrollYProgress: { get: () => 0, on: () => () => {} } }),
    motion: {
      ...actual.motion,
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      main: ({ children, ...props }) => <main {...props}>{children}</main>,
      figure: ({ children, ...props }) => <figure {...props}>{children}</figure>,
    },
  };
});

vi.mock("../../../components/layout/PageNav", () => ({ default: () => <nav /> }));

// GalleryFrame pulls formatCaptureDate from here too, so the mock must supply it.
vi.mock("../galleryPhotos", () => ({
  formatCaptureDate: () => "July 2024",
  galleryPhotos: [
    {
      name: "A",
      slug: "a",
      index: 1,
      place: "Rennes",
      alt: "first frame",
      weight: "full",
      width: 100,
      height: 80,
      src: { thumb: "a-400", mid: "a-1200", full: "a-2000" },
      exif: { camera: "Canon", focal: "35mm", aperture: "f/8", shutter: "1/200", iso: 100, taken: "2024-07-22" },
    },
    {
      name: "B",
      slug: "b",
      index: 2,
      place: "Brest",
      alt: "second frame",
      weight: "half",
      width: 80,
      height: 100,
      src: { thumb: "b-400", mid: "b-1200", full: "b-2000" },
      exif: { camera: "Canon", focal: "50mm", aperture: "f/4", shutter: "1/500", iso: 200, taken: "2024-07-26" },
    },
  ],
}));

describe("GalleryPage", () => {
  // Scoped to figures because the contact sheet repeats every alt text below.
  it("renders every photo in sequence order", () => {
    const { container } = renderWithI18n(<GalleryPage />, { route: "/gallery" });
    const images = [...container.querySelectorAll("figure img")];
    expect(images.map((i) => i.getAttribute("alt"))).toEqual(["first frame", "second frame"]);
  });

  it("closes the page with the contact sheet", () => {
    renderWithI18n(<GalleryPage />, { route: "/gallery" });
    expect(screen.getByRole("heading", { level: 2, name: /all frames/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("shows the title plate", () => {
    renderWithI18n(<GalleryPage />, { route: "/gallery" });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Frames");
  });

  it("states the count", () => {
    renderWithI18n(<GalleryPage />, { route: "/gallery" });
    expect(screen.getByText("2 frames")).toBeInTheDocument();
  });

  it("sets the document title", () => {
    renderWithI18n(<GalleryPage />, { route: "/gallery" });
    expect(document.title).toContain("Photography");
  });
});
