import { describe, it, expect, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithI18n } from "../../../../test-utils";
import i18n from "../../../../i18n";
import Hero from "../Hero";

afterEach(async () => {
  await i18n.changeLanguage("en");
});

describe("Hero", () => {
  it("names who he is, what he does and where he studies", () => {
    renderWithI18n(<Hero />);

    const identity = screen.getByText(/computer science student at INSA Rennes/i);
    expect(identity).toBeInTheDocument();
  });

  it("makes a direct introduction the page heading", () => {
    renderWithI18n(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/I build things that need to work\./i);
  });

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

  it("describes the portrait rather than only naming the subject", () => {
    renderWithI18n(<Hero />);

    const portrait = screen.getByRole("img", { name: /Théo Phan/i });
    expect(portrait).toHaveAttribute(
      "alt",
      expect.stringMatching(/smiling/i),
    );
  });

  it("keeps one meaningful portrait in the hero", () => {
    renderWithI18n(<Hero />);

    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  it("renders the statement in French", async () => {
    await i18n.changeLanguage("fr");
    renderWithI18n(<Hero />, { route: "/fr" });

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Je construis des choses qui doivent fonctionner\./i);
  });
});
