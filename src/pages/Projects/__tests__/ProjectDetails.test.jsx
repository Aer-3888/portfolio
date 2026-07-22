import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, cleanup } from "@testing-library/react";
import { renderWithI18n } from "../../../test-utils";
import ProjectDetails from "../../../components/ProjectDetails";
const mockProject = {
  id: "01",
  title: "Waiki",
  year: "2025",
  type: "Mobile Development",
  category: "Freelance",
  img: "/test.png",
  url: "https://example.com",
  logoType: "website",
  description: "Test description text.",
  insight: "Test insight.",
  challenge: "Test challenge.",
  tags: ["Flutter", "Dart"],
  tools: ["Android Studio"],
  architecture: ["MVVM"],
};

describe("ProjectDetails", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.runAllTimers();
    vi.useRealTimers();
  });

  it("renders project title when open", () => {
    renderWithI18n(<ProjectDetails project={mockProject} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("Waiki")).toBeInTheDocument();
  });

  it("renders description text", () => {
    renderWithI18n(<ProjectDetails project={mockProject} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("Test description text.")).toBeInTheDocument();
  });

  it("renders all tech tags", () => {
    renderWithI18n(<ProjectDetails project={mockProject} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("Flutter")).toBeInTheDocument();
    expect(screen.getByText("Dart")).toBeInTheDocument();
  });

  it("renders nothing when project is null", () => {
    const { container } = renderWithI18n(
      <ProjectDetails project={null} isOpen={false} onClose={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("locks body scroll when modal is open", () => {
    renderWithI18n(<ProjectDetails project={mockProject} isOpen={true} onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.documentElement.classList.contains("lenis-stopped")).toBe(true);
  });

  it("unlocks body scroll when modal is closed", () => {
    const { unmount } = renderWithI18n(
      <ProjectDetails project={mockProject} isOpen={true} onClose={vi.fn()} />
    );
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
    expect(document.documentElement.classList.contains("lenis-stopped")).toBe(false);
  });

  it("has data-lenis-prevent attribute on scrollable container", () => {
    renderWithI18n(<ProjectDetails project={mockProject} isOpen={true} onClose={vi.fn()} />);
    const description = screen.getByText("Test description text.");
    const scrollContainer = description.closest("[data-lenis-prevent]");
    expect(scrollContainer).toBeInTheDocument();
  });
});
