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
