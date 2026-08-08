import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithI18n } from "../../../test-utils";
import GalleryContactSheet from "../GalleryContactSheet";

const scrollTo = vi.fn();
vi.mock("../../../components/layout/ScrollContext", () => ({
  useLenis: () => ({ scrollTo }),
}));

const photos = [
  { slug: "a", index: 1, place: "Rennes", alt: "first", src: { thumb: "a-400" }, width: 100, height: 80 },
  { slug: "b", index: 2, place: "Brest", alt: "second", src: { thumb: "b-400" }, width: 80, height: 100 },
];

beforeEach(() => {
  scrollTo.mockClear();
  document.body.replaceChildren();
});

describe("GalleryContactSheet", () => {
  it("renders one thumbnail per photo", () => {
    renderWithI18n(<GalleryContactSheet photos={photos} />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("numbers the thumbnails", () => {
    renderWithI18n(<GalleryContactSheet photos={photos} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
  });

  it("uses the smallest derivative, not the full size", () => {
    renderWithI18n(<GalleryContactSheet photos={photos} />);
    expect(screen.getByAltText("first")).toHaveAttribute("src", "a-400");
  });

  it("labels each thumbnail with its place for screen readers", () => {
    renderWithI18n(<GalleryContactSheet photos={photos} />);
    expect(screen.getByRole("button", { name: /Brest/ })).toBeInTheDocument();
  });

  it("scrolls to the matching frame through lenis when one exists", async () => {
    const target = document.createElement("div");
    target.id = "frame-b";
    document.body.appendChild(target);

    renderWithI18n(<GalleryContactSheet photos={photos} />);
    await userEvent.click(screen.getAllByRole("button")[1]);

    expect(scrollTo).toHaveBeenCalledWith(target, expect.objectContaining({ offset: expect.any(Number) }));
  });

  it("does nothing when the target frame is not on the page", async () => {
    renderWithI18n(<GalleryContactSheet photos={photos} />);
    await userEvent.click(screen.getAllByRole("button")[0]);
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
