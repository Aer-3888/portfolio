// src/pages/Projects/__tests__/MobileProjectCard.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MobileProjectCard from "../MobileProjectCard";

const mockProject = {
  id: "01",
  title: "Waiki",
  year: "2025",
  type: "Mobile Development",
  category: "Freelance",
  img: "/test.png",
  offset: 0,
};

describe("MobileProjectCard", () => {
  it("renders project title", () => {
    render(<MobileProjectCard project={mockProject} onSelect={vi.fn()} />);
    expect(screen.getByText("Waiki")).toBeInTheDocument();
  });

  it("renders type and category", () => {
    render(<MobileProjectCard project={mockProject} onSelect={vi.fn()} />);
    expect(screen.getByText("Mobile Development")).toBeInTheDocument();
    expect(screen.getByText(/freelance/i)).toBeInTheDocument();
  });

  it("calls onSelect when tapped", () => {
    const onSelect = vi.fn();
    render(<MobileProjectCard project={mockProject} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(mockProject);
  });

  it("renders image with loading=lazy", () => {
    render(<MobileProjectCard project={mockProject} onSelect={vi.fn()} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("loading", "lazy");
  });
});
