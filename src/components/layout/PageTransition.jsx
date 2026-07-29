import { useLayoutEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

/**
 * Page root for every route. AnimatePresence runs in "wait" mode, so the
 * outgoing page finishes fading before this one mounts, which makes mount the
 * right moment to land the reader at the top. Resetting scroll any earlier
 * would visibly yank the outgoing page while it is still on screen.
 *
 * The veil is opacity only. Each page owns its own entrance choreography
 * underneath, and a y offset here would compound with theirs.
 */
export default function PageTransition({ children, className }) {
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const duration = prefersReducedMotion ? 0 : 0.34;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration, ease } }}
      exit={{ opacity: 0, transition: { duration: duration * 0.65, ease } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
