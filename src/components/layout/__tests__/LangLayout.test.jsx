import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const changeLanguage = vi.fn();
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ i18n: { language: "en", changeLanguage } }),
}));

import LangLayout from "../LangLayout";

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<LangLayout />}>
          <Route path="/" element={<div>home</div>} />
        </Route>
        <Route path="fr" element={<LangLayout />}>
          <Route index element={<div>accueil</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => changeLanguage.mockClear());

describe("LangLayout", () => {
  it("switches i18n language to fr on /fr", () => {
    renderAt("/fr");
    expect(changeLanguage).toHaveBeenCalledWith("fr");
    expect(document.documentElement.lang).toBe("fr");
  });
  it("does not change language when already en on /", () => {
    renderAt("/");
    expect(changeLanguage).not.toHaveBeenCalled();
  });
});
