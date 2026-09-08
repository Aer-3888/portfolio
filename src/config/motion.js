/*
 * Every duration and curve on the site. One curve, four durations. Variants
 * take the reduced-motion flag so the JavaScript path collapses too: the CSS
 * media query alone does not stop framer-motion.
 */
export const EASE = [0.16, 1, 0.3, 1];

export const DURATION = {
  state: 0.2,
  exit: 0.4,
  enter: 0.7,
  surface: 1.2,
};

export const REVEAL_RISE = 24;

export function reveal(reduced, { delay = 0, duration = DURATION.enter } = {}) {
  return {
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: REVEAL_RISE },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? DURATION.state : duration, delay, ease: EASE },
  };
}

export const VIEWPORT = { once: true, margin: "-15%" };
