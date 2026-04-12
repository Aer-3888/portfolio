import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CvModal from "../CvModal";

describe("CvModal", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("renders nothing when isOpen is false", () => {
    const { container } = render(<CvModal isOpen={false} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders modal content when isOpen is true", () => {
    render(<CvModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByTitle("CV Preview")).toBeInTheDocument();
  });

  it("renders download link with correct href (defaults to EN)", () => {
    render(<CvModal isOpen={true} onClose={vi.fn()} />);
    const downloadLink = screen.getByRole("link", { name: /download/i });
    expect(downloadLink).toHaveAttribute("href", "/cv_en.pdf");
    expect(downloadLink).toHaveAttribute("download");
  });

  it("switches language when FR button is clicked", () => {
    render(<CvModal isOpen={true} onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "fr" }));
    const downloadLink = screen.getByRole("link", { name: /download/i });
    expect(downloadLink).toHaveAttribute("href", "/cv.pdf");
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<CvModal isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close CV preview"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    render(<CvModal isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByTestId("cv-modal-backdrop"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = vi.fn();
    render(<CvModal isOpen={true} onClose={onClose} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("locks body scroll when open", () => {
    render(<CvModal isOpen={true} onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when closed", () => {
    const { rerender } = render(<CvModal isOpen={true} onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe("hidden");
    rerender(<CvModal isOpen={false} onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe("");
  });
});
