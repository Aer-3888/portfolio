import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithI18n } from "../../../test-utils";

const navigateMock = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...actual, useNavigate: () => navigateMock };
});

import LanguageSwitcher from "../LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("navigates to the fr counterpart of the current path", () => {
    renderWithI18n(<LanguageSwitcher />, { route: "/projects/03" });
    fireEvent.click(screen.getByRole("button", { name: /français|french/i }));
    expect(navigateMock).toHaveBeenCalledWith("/fr/projects/03");
  });
});
