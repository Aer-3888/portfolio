import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router";
import Lenis from "lenis";
import ScrollProvider from "./ScrollProvider";

const isTouchDevice = () =>
  window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  // Scroll reset lives in PageTransition, which mounts only once the outgoing
  // page has finished exiting. Resetting here would fire the moment the URL
  // changes, jerking the old page to the top while it is still visible.
  useLayoutEffect(() => {
    if (lenisRef.current) lenisRef.current.destroy();
    lenisRef.current = null;
  }, [pathname]);

  useEffect(() => {
    if (isTouchDevice()) return;
    if (prefersReducedMotion()) return;

    lenisRef.current = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
      lenisRef.current = null;
    };
  }, [pathname]);

  // The ref is passed down rather than the instance, so creating or destroying
  // Lenis never re-renders the tree. See useScrollToElement for why.
  return <ScrollProvider lenisRef={lenisRef}>{children}</ScrollProvider>;
}
