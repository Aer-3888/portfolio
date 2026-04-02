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

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= threshold) {
        setVisible(true);
      } else if (currentY > lastScrollYRef.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return visible;
}
