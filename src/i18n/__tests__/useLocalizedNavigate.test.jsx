import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";

const navigateMock = vi.fn();
vi.mock("react-router", () => ({ useNavigate: () => navigateMock }));
vi.mock("react-i18next", () => ({ useTranslation: () => ({ i18n: { language: "fr" } }) }));

import useLocalizedNavigate from "../useLocalizedNavigate";

describe("useLocalizedNavigate", () => {
  it("prefixes navigation with active language", () => {
    const { result } = renderHook(() => useLocalizedNavigate());
    result.current("/projects", { state: { scrollTo: "projects" } });
    expect(navigateMock).toHaveBeenCalledWith("/fr/projects", { state: { scrollTo: "projects" } });
  });
});
