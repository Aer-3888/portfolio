import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageNav from "../PageNav";

// Provide window.matchMedia stub for jsdom (required by useMediaQuery before mock intercepts)
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Framer Motion motion values need mocking in tests
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useMotionValue: () => 0,
    // Return scalar 0 — motion.div is also mocked as plain <div> so no subscription occurs
    useTransform: () => 0,
    AnimatePresence: ({ children }) => children,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
      span: ({ children, ...props }) => <span {...props}>{children}</span>,
      aside: ({ children, ...props }) => <aside {...props}>{children}</aside>,
    },
  };
});

// Force mobile viewport
vi.mock("../../hooks/useMediaQuery", () => ({ default: () => false }));
vi.mock("../../hooks/useMobileNavVisible", () => ({ default: () => true }));

// Stub out heavy components with SVG/canvas dependencies
vi.mock("../LiquidMenu", () => ({ default: () => <button>menu</button> }));
vi.mock("../../MenuPanel", () => ({ default: () => null }));

function renderNav(props = {}) {
  return render(
    <MemoryRouter>
      <PageNav {...props} />
    </MemoryRouter>
  );
}

describe("PageNav — mobile", () => {
  it("renders the name on mobile", () => {
    renderNav();
    expect(screen.getByText("Theo Phan")).toBeInTheDocument();
  });

  it("does not render desktop nav links on mobile", () => {
    renderNav();
    expect(screen.queryByText("Projects")).not.toBeInTheDocument();
    expect(screen.queryByText("About")).not.toBeInTheDocument();
    expect(screen.queryByText("Contact")).not.toBeInTheDocument();
  });
});
