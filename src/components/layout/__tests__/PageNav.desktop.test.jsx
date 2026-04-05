import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageNav from "../PageNav";

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

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useMotionValue: () => 0,
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

// Force desktop viewport
vi.mock("../../../hooks/useMediaQuery", () => ({ default: () => true }));
vi.mock("../../../hooks/useMobileNavVisible", () => ({ default: () => true }));

vi.mock("../LiquidMenu", () => ({ default: () => <button>menu</button> }));
vi.mock("../../MenuPanel", () => ({ default: () => null }));
vi.mock("../../HomeButton", () => ({ default: () => <a>home</a> }));

// Provide a mock scrollYProgress so hasScrollFade = true
const mockScrollY = { get: () => 0 };

function renderNav(props = {}) {
  return render(
    <MemoryRouter>
      <PageNav scrollYProgress={mockScrollY} {...props} />
    </MemoryRouter>
  );
}

describe("PageNav — desktop", () => {
  it("renders the name on desktop when scrollYProgress is provided", () => {
    renderNav();
    expect(screen.getByText("Theo Phan")).toBeInTheDocument();
  });

  it("renders nav links on desktop", () => {
    renderNav();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("does not render the name when scrollYProgress is not provided", () => {
    render(
      <MemoryRouter>
        <PageNav />
      </MemoryRouter>
    );
    expect(screen.queryByText("Theo Phan")).not.toBeInTheDocument();
  });
});
