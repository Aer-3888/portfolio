import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  // Reset scroll before paint
  useLayoutEffect(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (lenisRef.current) lenisRef.current.destroy();
    lenisRef.current = null;
    rafIdRef.current = null;
    window.scrollTo(0, 0);
  }, [pathname]);

  // Recreate Lenis after DOM settles
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
      const lenis = new Lenis({ lerp: 0.1, duration: 1.5, smoothWheel: true });
      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }
      rafIdRef.current = requestAnimationFrame(raf);
    }, 50);

    return () => {
      clearTimeout(timeout);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
      lenisRef.current = null;
      rafIdRef.current = null;
    };
  }, [pathname]);

  return <>{children}</>;
}
