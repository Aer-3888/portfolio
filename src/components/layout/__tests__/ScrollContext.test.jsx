import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { ScrollProvider, useLenis } from "../ScrollContext";

describe("useLenis", () => {
  it("returns null when no provider is mounted", () => {
    const { result } = renderHook(() => useLenis());
    expect(result.current).toBeNull();
  });

  it("returns null when the provider has no instance, which is the touch and reduced motion case", () => {
    const wrapper = ({ children }) => <ScrollProvider lenis={null}>{children}</ScrollProvider>;
    const { result } = renderHook(() => useLenis(), { wrapper });
    expect(result.current).toBeNull();
  });

  it("returns the instance when there is one", () => {
    const fake = { scrollTo: () => {} };
    const wrapper = ({ children }) => <ScrollProvider lenis={fake}>{children}</ScrollProvider>;
    const { result } = renderHook(() => useLenis(), { wrapper });
    expect(result.current).toBe(fake);
  });
});
