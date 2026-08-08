import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router";
import { renderWithI18n } from "../../../test-utils";
import PhotoPage from "../PhotoPage";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useReducedMotion: () => false,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
  };
});

vi.mock("../../../components/layout/PageNav", () => ({ default: () => <nav /> }));

// Hoisted because vi.mock factories run before top level consts initialise.
const { photos } = vi.hoisted(() => ({
  photos: [
    {
      name: "A",
      slug: "a",
      index: 1,
      place: "Rennes",
      alt: "first",
      weight: "full",
      width: 100,
      height: 80,
      src: { thumb: "a-400", mid: "a-1200", full: "a-2000" },
      exif: {
        camera: "Canon EOS 4000D",
        lens: "EF-S18-55mm",
        focal: "35mm",
        aperture: "f/8",
        shutter: "1/200",
        iso: 100,
        taken: "2024-07-22",
      },
    },
    {
      name: "B",
      slug: "b",
      index: 2,
      place: "Brest",
      alt: "second",
      weight: "half",
      width: 80,
      height: 100,
      src: { thumb: "b-400", mid: "b-1200", full: "b-2000" },
      exif: {
        camera: "Canon EOS 4000D",
        lens: "EF-S18-55mm",
        focal: "50mm",
        aperture: "f/4",
        shutter: "1/500",
        iso: 200,
        taken: "2024-07-26",
      },
    },
  ],
}));

vi.mock("../galleryPhotos", () => ({
  galleryPhotos: photos,
  formatCaptureDate: () => "July 2024",
  findPhotoBySlug: (slug) => photos.find((p) => p.slug === slug) ?? null,
  photoNeighbours: (slug) => {
    const i = photos.findIndex((p) => p.slug === slug);
    if (i === -1) return { prev: null, next: null };
    return {
      prev: i > 0 ? photos[i - 1] : null,
      next: i < photos.length - 1 ? photos[i + 1] : null,
    };
  },
}));

function renderAt(route) {
  return renderWithI18n(
    <Routes>
      <Route path="/gallery/:slug" element={<PhotoPage />} />
      <Route path="/gallery" element={<div>gallery index</div>} />
    </Routes>,
    { route }
  );
}

describe("PhotoPage", () => {
  it("renders the photo matching the slug", () => {
    renderAt("/gallery/b");
    expect(screen.getByAltText("second")).toBeInTheDocument();
  });

  it("uses the full derivative", () => {
    renderAt("/gallery/b");
    expect(screen.getByAltText("second")).toHaveAttribute("src", "b-2000");
  });

  it("shows the place and the capture date", () => {
    renderAt("/gallery/b");
    expect(screen.getByText("Brest, July 2024")).toBeInTheDocument();
  });

  it("shows the technical line including the lens", () => {
    renderAt("/gallery/b");
    const technical = screen.getByText(/Canon EOS 4000D/);
    expect(technical).toHaveTextContent("EF-S18-55mm");
    expect(technical).toHaveTextContent("ISO 200");
  });

  it("states the position in the sequence", () => {
    renderAt("/gallery/b");
    expect(screen.getByText(/2 of 2/)).toBeInTheDocument();
  });

  it("links back to the gallery", () => {
    renderAt("/gallery/b");
    expect(screen.getByRole("link", { name: /back to the gallery/i })).toHaveAttribute(
      "href",
      "/gallery"
    );
  });

  it("links to the previous frame", () => {
    renderAt("/gallery/b");
    expect(screen.getByRole("link", { name: /previous frame/i })).toHaveAttribute(
      "href",
      "/gallery/a"
    );
  });

  it("does not offer a previous link on the first frame", () => {
    renderAt("/gallery/a");
    expect(screen.queryByRole("link", { name: /previous frame/i })).toBeNull();
  });

  it("does not offer a next link on the last frame", () => {
    renderAt("/gallery/b");
    expect(screen.queryByRole("link", { name: /next frame/i })).toBeNull();
  });

  it("redirects an unknown slug to the gallery", () => {
    renderAt("/gallery/nope");
    expect(screen.getByText("gallery index")).toBeInTheDocument();
  });

  it("sets its own og image", () => {
    renderAt("/gallery/b");
    expect(
      document.head.querySelector('meta[property="og:image"]').getAttribute("content")
    ).toContain("b-2000");
  });
});
