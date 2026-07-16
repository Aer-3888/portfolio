import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RATINGS = [
  { max: 150, label: "Inhuman" },
  { max: 200, label: "Excellent" },
  { max: 250, label: "Great" },
  { max: 300, label: "Good" },
  { max: 400, label: "Average" },
  { max: Infinity, label: "Keep training" },
];

const COLORS = {
  idle: "#2356d8",
  waiting: "#2356d8",
  active: "#ffca45",
  early: "#f04d2f",
  result: "#171717",
};

function getRating(milliseconds) {
  return RATINGS.find((rating) => milliseconds < rating.max)?.label ?? "Keep training";
}

export default function ArcadeMachine() {
  const [state, setState] = useState("idle");
  const [score, setScore] = useState(null);
  const [best, setBest] = useState(null);
  const startRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const start = () => {
    setState("waiting");
    setScore(null);
    timerRef.current = window.setTimeout(
      () => {
        setState("active");
        startRef.current = Date.now();
      },
      Math.random() * 2500 + 1000
    );
  };

  const trigger = () => {
    if (state === "waiting") {
      window.clearTimeout(timerRef.current);
      setState("early");
      return;
    }

    if (state === "active") {
      const milliseconds = Date.now() - startRef.current;
      setScore(milliseconds);
      setBest((currentBest) =>
        currentBest === null || milliseconds < currentBest ? milliseconds : currentBest
      );
      setState("result");
    }
  };

  const handleClick = () => {
    if (state === "idle" || state === "result" || state === "early") start();
    else trigger();
  };

  const textColor = state === "active" ? "#171717" : "#f1eee7";

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-full w-full cursor-pointer select-none flex-col text-left transition-colors duration-300 focus-visible:outline-offset-[-4px]"
      style={{ backgroundColor: COLORS[state], color: textColor }}
      aria-label="Reaction test. Click to play."
    >
      <div className="flex shrink-0 items-center justify-between border-b border-current/20 px-5 py-4 text-[10px]">
        <span>Reaction test</span>
        <span>{best === null ? "A small distraction" : `Best ${best}ms`}</span>
      </div>

      <div aria-live="polite" className="relative flex-1">
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8"
            >
              <p className="max-w-sm font-serif text-5xl leading-[0.82] tracking-[-0.03em] sm:text-6xl">
                Test your reflexes.
              </p>
              <p className="text-xs opacity-60">Click anywhere to begin.</p>
            </motion.div>
          )}

          {state === "waiting" && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <p className="font-serif text-5xl animate-pulse">Not yet.</p>
            </motion.div>
          )}

          {state === "active" && (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.05 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <p className="font-serif text-8xl leading-none">Now.</p>
            </motion.div>
          )}

          {state === "early" && (
            <motion.div
              key="early"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            >
              <p className="font-serif text-6xl">Too soon.</p>
              <p className="text-xs opacity-60">Click to try again.</p>
            </motion.div>
          )}

          {state === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            >
              <p className="font-serif text-7xl leading-none sm:text-8xl">{score}ms</p>
              <p className="text-sm opacity-60">{getRating(score)}</p>
              <p className="mt-5 text-xs opacity-35">Click to try again.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
