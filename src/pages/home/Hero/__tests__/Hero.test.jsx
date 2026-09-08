import { describe, it, expect, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithI18n } from "../../../../test-utils";
import i18n from "../../../../i18n";
import Hero from "../Hero";

afterEach(async () => {
  await i18n.changeLanguage("en");
});

describe("Hero", () => {
  it("links to the work", () => {
    renderWithI18n(<Hero />);

    expect(screen.getByRole("link", { name: /view projects/i })).toHaveAttribute(
      "href",
      "/projects",
    );
  });

  it("offers a direct CV download", () => {
    renderWithI18n(<Hero />);

    expect(screen.getByRole("link", { name: /download cv/i })).toHaveAttribute(
      "href",
      "/cv_en.pdf",
    );
  });

  it("renders the statement in French", async () => {
    await i18n.changeLanguage("fr");
    renderWithI18n(<Hero />, { route: "/fr" });

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Je construis des choses qui doivent fonctionner\./i);
  });
});
