import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { TestProviders } from "../../test-utils";
import useProjects from "../useProjects";

describe("useProjects", () => {
  it("merges structure with English prose", () => {
    const { result } = renderHook(() => useProjects(), {
      wrapper: ({ children }) => <TestProviders>{children}</TestProviders>,
    });
    const waiki = result.current.find((p) => p.id === "01");
    expect(waiki.title).toBe("Waiki");
    expect(waiki.img).toContain("waiki.webp");
    expect(typeof waiki.description).toBe("string");
    expect(waiki.description.length).toBeGreaterThan(0);
    expect(Array.isArray(waiki.architecture)).toBe(true);
  });

  it("returns all projects in order", () => {
    const { result } = renderHook(() => useProjects(), {
      wrapper: ({ children }) => <TestProviders>{children}</TestProviders>,
    });
    expect(result.current).toHaveLength(10);
    expect(result.current[0].id).toBe("01");
  });
});
