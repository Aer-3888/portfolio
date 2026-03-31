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
});
