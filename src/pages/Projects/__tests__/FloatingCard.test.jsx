import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useMotionValue } from "framer-motion";
import FloatingCard from "../FloatingCard";

const mockProject = {
  id: "01",
  title: "Waiki",
  year: "2025",
  type: "Mobile Development",
  category: "Freelance",
  img: "/test-image.png",
  offset: 0,
};

function Wrapper() {
  const x = useMotionValue(0);
  return <FloatingCard project={mockProject} x={x} onClick={vi.fn()} />;
}

describe("FloatingCard", () => {
  it("renders project title", () => {
    render(<Wrapper />);
    expect(screen.getByText("Waiki")).toBeInTheDocument();
  });

  it("renders image with loading=lazy", () => {
    render(<Wrapper />);
    const img = screen.getByRole("img", { name: /waiki/i });
    expect(img).toHaveAttribute("loading", "lazy");
  });
});
