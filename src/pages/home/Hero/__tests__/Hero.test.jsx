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

  it("leads with the name and states the availability", () => {
    renderWithI18n(<Hero />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Théo Phan");
    expect(screen.getByText("A summer 2027 internship")).toBeInTheDocument();
  });

  it("renders the introduction in French", async () => {
    await i18n.changeLanguage("fr");
    renderWithI18n(<Hero />, { route: "/fr" });

    expect(screen.getByText(/Étudiant en informatique à l’INSA Rennes/)).toBeInTheDocument();
    expect(screen.getByText("Un stage pour l’été 2027")).toBeInTheDocument();
  });
});
