import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectDetails from "../ProjectDetails";

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
  it("renders project title when open", () => {
    render(<ProjectDetails project={mockProject} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("Waiki")).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<ProjectDetails project={mockProject} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("Test description text.")).toBeInTheDocument();
  });

  it("renders all tech tags", () => {
    render(<ProjectDetails project={mockProject} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText("Flutter")).toBeInTheDocument();
    expect(screen.getByText("Dart")).toBeInTheDocument();
  });

  it("renders nothing when project is null", () => {
    const { container } = render(
      <ProjectDetails project={null} isOpen={false} onClose={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("blocks wheel scroll on document when modal is open and target is outside panel", () => {
    render(<ProjectDetails project={mockProject} isOpen={true} onClose={vi.fn()} />);
    const wheelEvent = new WheelEvent("wheel", { bubbles: true, cancelable: true, deltaY: 100 });
    const preventDefaultSpy = vi.spyOn(wheelEvent, "preventDefault");
    document.dispatchEvent(wheelEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("does not block wheel scroll when modal is closed", () => {
    render(<ProjectDetails project={mockProject} isOpen={false} onClose={vi.fn()} />);
    const wheelEvent = new WheelEvent("wheel", { bubbles: true, cancelable: true, deltaY: 100 });
    const preventDefaultSpy = vi.spyOn(wheelEvent, "preventDefault");
    document.dispatchEvent(wheelEvent);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it("does not block wheel scroll when target is inside the scroll panel", () => {
    render(<ProjectDetails project={mockProject} isOpen={true} onClose={vi.fn()} />);
    const titleEl = screen.getByText("Waiki");
    const wheelEvent = new WheelEvent("wheel", { bubbles: true, cancelable: true, deltaY: 100 });
    const preventDefaultSpy = vi.spyOn(wheelEvent, "preventDefault");
    titleEl.dispatchEvent(wheelEvent);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
});
