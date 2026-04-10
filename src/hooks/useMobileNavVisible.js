import { useState, useRef, useEffect } from "react";

/**
 * Returns true when the mobile nav should be visible:
 * - always at the top (scrollY <= threshold)
 * - when scrolling up
 * - hides when scrolling down past the threshold
 */
export default function useMobileNavVisible(threshold = 10) {
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const next = currentY <= threshold || currentY < lastScrollYRef.current;
        lastScrollYRef.current = currentY;
        setVisible((prev) => (prev === next ? prev : next));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [threshold]);

  return visible;
}
