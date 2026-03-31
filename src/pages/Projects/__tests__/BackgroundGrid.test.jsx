import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BackgrounGrid } from "../BackgroundGrid";

describe("BackgrounGrid", () => {
  it("renders without crashing", () => {
    const { container } = render(<BackgrounGrid />);
    expect(container.firstChild).toBeTruthy();
  });
});
