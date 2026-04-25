import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RATINGS = [
  { max: 150, label: "Inhuman" },
  { max: 200, label: "Excellent" },
  { max: 250, label: "Great" },
  { max: 300, label: "Good" },
  { max: 400, label: "Average" },
  { max: Infinity, label: "Keep training" },
];

function getRating(ms) {
  return RATINGS.find((r) => ms < r.max)?.label ?? "Keep training";
}

export default function ArcadeMachine() {
  const [state, setState] = useState("idle");
  const [score, setScore] = useState(null);
  const [best, setBest] = useState(null);
  const startRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const start = () => {
    setState("waiting");
    setScore(null);
    timerRef.current = setTimeout(() => {
      setState("active");
      startRef.current = Date.now();
    }, Math.random() * 2500 + 1000);
  };

  const trigger = () => {
    if (state === "waiting") {
      clearTimeout(timerRef.current);
      setState("early");
      return;
    }
    if (state === "active") {
      const ms = Date.now() - startRef.current;
      setScore(ms);
      if (!best || ms < best) setBest(ms);
      setState("result");
    }
  };

  const handleClick = () => {
    if (state === "idle" || state === "result" || state === "early") start();
    else trigger();
  };

  return (
    <div
      className="w-full h-full flex flex-col cursor-pointer select-none outline-none"
      onClick={handleClick}
    >
      {/* Status bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 shrink-0">
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
          Reaction Test
        </span>
        {best && (
          <span className="text-[10px] font-mono text-neutral-500 tracking-widest">
            Best:{" "}
            <span className="text-white font-bold">{best}ms</span>
          </span>
        )}
      </div>

      {/* Game area */}
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center gap-3"
          >
            <p className="text-4xl font-black text-white tracking-tighter">
              Ready?
            </p>
            <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
              Click anywhere to begin
            </p>
          </motion.div>
        )}

        {state === "waiting" && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex items-center justify-center"
          >
            <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.5em] animate-pulse">
              Wait for it...
            </p>
          </motion.div>
        )}

        {state === "active" && (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
            className="flex-1 flex items-center justify-center bg-white"
          >
            <p className="text-6xl font-black text-black tracking-tighter uppercase">
              Now
            </p>
          </motion.div>
        )}

        {state === "early" && (
          <motion.div
            key="early"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center gap-3"
          >
            <p className="text-4xl font-black text-red-400 tracking-tighter">
              Too early.
            </p>
            <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
              Click to retry
            </p>
          </motion.div>
        )}

        {state === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center gap-3"
          >
            <p className="text-7xl md:text-8xl font-black text-white tracking-tighter">
              {score}ms
            </p>
            <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              {getRating(score)}
            </p>
            <p className="text-[10px] font-mono text-neutral-700 uppercase tracking-widest mt-4">
              Click to retry
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
