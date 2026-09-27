import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithI18n } from "../../../../test-utils";
import i18n from "../../../../i18n";
import HomeStage from "../HomeStage";

afterEach(async () => {
  await i18n.changeLanguage("en");
});

describe("HomeStage", () => {
  it("keeps the hero and the CV download", () => {
    renderWithI18n(<HomeStage onSelect={() => {}} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Théo Phan");
    expect(screen.getByRole("link", { name: /download cv/i })).toHaveAttribute("href", "/cv_en.pdf");
  });

  it("presents the four selected projects in order", () => {
    renderWithI18n(<HomeStage onSelect={() => {}} />);

    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(["Waiki", "GardeFou", "IAJ Evades", "Plant Detection"]);
  });

  it("opens the project behind a caption", () => {
    const onSelect = vi.fn();
    renderWithI18n(<HomeStage onSelect={onSelect} />);

    fireEvent.click(screen.getByRole("button", { name: "Open GardeFou" }));

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "09" }));
  });

  it("opens the project on screen when the frame is clicked", () => {
    const onSelect = vi.fn();
    renderWithI18n(<HomeStage onSelect={onSelect} />);

    fireEvent.click(screen.getByRole("button", { name: /open waiki case study/i }));

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "01" }));
  });

  it("keeps the section anchors the nav scrolls to", () => {
    const { container } = renderWithI18n(<HomeStage onSelect={() => {}} />);

    expect(container.querySelector("#home")).not.toBeNull();
    expect(container.querySelector("#projects")).not.toBeNull();
  });
});
