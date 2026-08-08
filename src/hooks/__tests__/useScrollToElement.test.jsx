import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useScrollToElement from "../useScrollToElement";
import ScrollProvider from "../../components/layout/ScrollProvider";

function makeElement() {
  const el = document.createElement("div");
  el.scrollIntoView = vi.fn();
  return el;
}

function renderScrollTo(lenisRef) {
  if (!lenisRef) return renderHook(() => useScrollToElement());
  const wrapper = ({ children }) => <ScrollProvider lenisRef={lenisRef}>{children}</ScrollProvider>;
  return renderHook(() => useScrollToElement(), { wrapper });
}

describe("useScrollToElement", () => {
  it("falls back to native scrolling when no provider is mounted", () => {
    const el = makeElement();
    const { result } = renderScrollTo(null);
    result.current(el);
    expect(el.scrollIntoView).toHaveBeenCalled();
  });

  it("falls back to native scrolling when lenis is absent, the touch and reduced motion case", () => {
    const el = makeElement();
    const { result } = renderScrollTo({ current: null });
    result.current(el);
    expect(el.scrollIntoView).toHaveBeenCalled();
  });

  it("uses lenis when there is an instance", () => {
    const el = makeElement();
    const scrollTo = vi.fn();
    const { result } = renderScrollTo({ current: { scrollTo } });
    result.current(el, { offset: -80 });
    expect(scrollTo).toHaveBeenCalledWith(el, { offset: -80 });
    expect(el.scrollIntoView).not.toHaveBeenCalled();
  });

  it("reads the instance at call time, so a late arriving lenis is still used", () => {
    const el = makeElement();
    const ref = { current: null };
    const { result } = renderScrollTo(ref);
    const scrollTo = vi.fn();
    ref.current = { scrollTo };
    result.current(el);
    expect(scrollTo).toHaveBeenCalled();
  });

  it("does nothing when the target element is missing", () => {
    const scrollTo = vi.fn();
    const { result } = renderScrollTo({ current: { scrollTo } });
    result.current(null);
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
