import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithI18n } from "../../../test-utils";
import GalleryFrame from "../GalleryFrame";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useReducedMotion: () => false,
    motion: {
      ...actual.motion,
      figure: ({ children, ...props }) => <figure {...props}>{children}</figure>,
    },
  };
});

const photo = {
  name: "IMG_3006",
  slug: "rennes-rooftops",
  index: 3,
  place: "Rennes",
  alt: "Slate rooftops stepping down a hill",
  weight: "half",
  width: 2000,
  height: 1333,
  src: { thumb: "/t-400.webp", mid: "/t-1200.webp", full: "/t-2000.webp" },
  exif: {
    camera: "Canon EOS 4000D",
    lens: "EF-S18-55mm f/3.5-5.6 III",
    focal: "35mm",
    aperture: "f/11",
    shutter: "1/125",
    iso: 100,
    taken: "2024-09-14",
  },
};

describe("GalleryFrame", () => {
  it("uses the authored alt text, not the place", () => {
    renderWithI18n(<GalleryFrame photo={photo} />);
    expect(screen.getByAltText("Slate rooftops stepping down a hill")).toBeInTheDocument();
  });

  it("reserves layout space with intrinsic dimensions", () => {
    renderWithI18n(<GalleryFrame photo={photo} />);
    const img = screen.getByAltText(photo.alt);
    expect(img).toHaveAttribute("width", "2000");
    expect(img).toHaveAttribute("height", "1333");
  });

  it("offers all three derivatives to the browser", () => {
    renderWithI18n(<GalleryFrame photo={photo} />);
    const srcset = screen.getByAltText(photo.alt).getAttribute("srcset");
    expect(srcset).toContain("/t-400.webp 400w");
    expect(srcset).toContain("/t-1200.webp 1200w");
    expect(srcset).toContain("/t-2000.webp 2000w");
  });

  it("shows the place and the capture date read from EXIF", () => {
    renderWithI18n(<GalleryFrame photo={photo} />);
    expect(screen.getByText(/Rennes/)).toBeInTheDocument();
    expect(screen.getByText(/September 2024/)).toBeInTheDocument();
  });

  it("shows the technical line", () => {
    renderWithI18n(<GalleryFrame photo={photo} />);
    const technical = screen.getByText(/Canon EOS 4000D/);
    expect(technical).toHaveTextContent("35mm");
    expect(technical).toHaveTextContent("f/11");
    expect(technical).toHaveTextContent("1/125");
    expect(technical).toHaveTextContent("ISO 100");
  });

  it("renders a condensed aperture alongside it for small screens", () => {
    // Both variants are in the DOM and CSS picks one, so the aperture appearing
    // twice is the intended behaviour rather than a duplication bug.
    renderWithI18n(<GalleryFrame photo={photo} />);
    expect(screen.getAllByText(/f\/11/)).toHaveLength(2);
  });

  it("links to its own page", () => {
    renderWithI18n(<GalleryFrame photo={photo} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/gallery/rennes-rooftops");
  });

  it("anchors an id for the contact sheet to scroll to", () => {
    const { container } = renderWithI18n(<GalleryFrame photo={photo} />);
    expect(container.querySelector("#frame-rennes-rooftops")).not.toBeNull();
  });

  it("marks the index number so it is not read as content", () => {
    renderWithI18n(<GalleryFrame photo={photo} />);
    expect(screen.getByText("03")).toHaveAttribute("aria-hidden", "true");
  });

  it("lazy loads everything past the first two frames", () => {
    renderWithI18n(<GalleryFrame photo={photo} />);
    expect(screen.getByAltText(photo.alt)).toHaveAttribute("loading", "lazy");
  });

  it("eagerly loads the opening frames so the top of the page paints", () => {
    renderWithI18n(<GalleryFrame photo={{ ...photo, index: 1 }} />);
    expect(screen.getByAltText(photo.alt)).toHaveAttribute("loading", "eager");
  });

  it("shows a note on a full weight frame when there is one", () => {
    const withNote = {
      ...photo,
      weight: "full",
      note: { en: "The light only does this for ten minutes.", fr: "La lumiere ne fait cela que dix minutes." },
    };
    renderWithI18n(<GalleryFrame photo={withNote} />);
    expect(screen.getByText("The light only does this for ten minutes.")).toBeInTheDocument();
  });

  it("does not show a note on a half weight frame", () => {
    const withNote = { ...photo, weight: "half", note: { en: "Hidden here.", fr: "Cache ici." } };
    renderWithI18n(<GalleryFrame photo={withNote} />);
    expect(screen.queryByText("Hidden here.")).toBeNull();
  });
});
