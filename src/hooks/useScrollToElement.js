import { createContext, useCallback, useContext } from "react";

/*
  The context carries a ref, not the Lenis instance. SmoothScroll creates and
  destroys Lenis inside effects, and publishing the instance as state would mean
  calling setState from an effect on every route change, cascading renders for a
  value nothing renders from.

  Consumers only ever need Lenis inside an event handler, so reading it from a
  stable ref at call time is both simpler and cheaper.
*/
export const ScrollContext = createContext(null);

/**
 * Returns a stable callback that scrolls an element into view.
 *
 * Falls back to native scrolling when Lenis is absent, which is the normal case
 * on touch devices and under reduced motion, and also when no provider is
 * mounted at all, as in isolated component tests.
 */
export default function useScrollToElement() {
  const lenisRef = useContext(ScrollContext);

  return useCallback(
    (el, { offset = 0 } = {}) => {
      if (!el) return;
      const lenis = lenisRef?.current;
      if (lenis) lenis.scrollTo(el, { offset });
      else el.scrollIntoView({ block: "start" });
    },
    [lenisRef]
  );
}
