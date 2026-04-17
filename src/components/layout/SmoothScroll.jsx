import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

const isTouchDevice = () =>
  window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  useLayoutEffect(() => {
    if (lenisRef.current) lenisRef.current.destroy();
    lenisRef.current = null;
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/projects") return;
    if (isTouchDevice()) return;
    if (prefersReducedMotion()) return;

    window.scrollTo(0, 0);
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });
    lenisRef.current = lenis;

    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
      lenisRef.current = null;
    };
  }, [pathname]);

  return <>{children}</>;
}
