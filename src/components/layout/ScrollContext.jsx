import { createContext, useContext } from "react";

/*
  Null is a normal value here, not an error. SmoothScroll deliberately skips
  Lenis on touch devices and under reduced motion, so consumers fall back to
  native scrolling rather than assuming an instance exists.
*/
const ScrollContext = createContext(null);

export function ScrollProvider({ lenis, children }) {
  return <ScrollContext.Provider value={lenis}>{children}</ScrollContext.Provider>;
}

export function useLenis() {
  return useContext(ScrollContext);
}
