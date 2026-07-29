import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router";
import { render } from "@testing-library/react";
import i18n from "./i18n";

export function TestProviders({ children, route = "/" }) {
  return (
    <I18nextProvider i18n={i18n}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </I18nextProvider>
  );
}

export function renderWithI18n(ui, { route = "/" } = {}) {
  return render(<TestProviders route={route}>{ui}</TestProviders>);
}
