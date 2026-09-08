import { describe, it, expect, vi, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithI18n } from "../../../test-utils";
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
  const mockComponent = (tag) => {
    const Component = tag;
    return ({
      children,
      whileHover,
      whileTap,
      transition,
      animate,
      initial,
      exit,
      layoutId,
      ...props
    }) => <Component {...props}>{children}</Component>;
  };
  return {
    ...actual,
    useMotionValue: () => ({ get: () => 0 }),
    useTransform: () => ({ get: () => 0 }),
    AnimatePresence: ({ children }) => children,
    motion: {
      ...actual.motion,
      div: mockComponent("div"),
      header: mockComponent("header"),
      nav: mockComponent("nav"),
      span: mockComponent("span"),
      aside: mockComponent("aside"),
      button: mockComponent("button"),
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
  return renderWithI18n(<PageNav scrollYProgress={mockScrollY} {...props} />);
}

describe("PageNav — desktop", () => {
  it("renders the wordmark in the top navigation", () => {
    renderNav();
    expect(screen.getByText("Théo Phan")).toBeInTheDocument();
  });

  it("renders nav links on desktop", () => {
    renderNav();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("offers a gallery destination", () => {
    renderNav({ currentPath: "/" });
    expect(screen.getByText("Photos")).toBeInTheDocument();
  });

  it("keeps the wordmark on pages without scroll takeover", () => {
    renderWithI18n(<PageNav />);
    expect(screen.getByText("Théo Phan")).toBeInTheDocument();
  });
});
