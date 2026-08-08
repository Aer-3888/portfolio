import { createContext, useCallback, useContext } from "react";

// Carries a ref, not the Lenis instance. Nothing renders from it, and state here
// would mean setState from an effect on every route change.
export const ScrollContext = createContext(null);

// Falls back to native scrolling when Lenis is absent, which is the normal case
// on touch, under reduced motion, and with no provider mounted.
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
