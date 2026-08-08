import { ScrollContext } from "../../hooks/useScrollToElement";

// Publishes SmoothScroll's Lenis ref to anything that needs to drive the scroll.
export default function ScrollProvider({ lenisRef, children }) {
  return <ScrollContext.Provider value={lenisRef}>{children}</ScrollContext.Provider>;
}
