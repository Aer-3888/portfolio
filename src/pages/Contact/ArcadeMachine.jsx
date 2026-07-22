import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const RATINGS = [
  { max: 150, key: "inhuman" },
  { max: 200, key: "excellent" },
  { max: 250, key: "great" },
  { max: 300, key: "good" },
  { max: 400, key: "average" },
  { max: Infinity, key: "keepTraining" },
];

const COLORS = {
  idle: "#2356d8",
  waiting: "#2356d8",
  active: "#ffca45",
  early: "#f04d2f",
  result: "#171717",
};

function getRatingKey(milliseconds) {
  return RATINGS.find((rating) => milliseconds < rating.max)?.key ?? "keepTraining";
}

export default function ArcadeMachine() {
  const { t } = useTranslation("contact");
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
      aria-label={t("arcade.ariaLabel")}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-current/20 px-5 py-4 text-[10px]">
        <span>{t("arcade.title")}</span>
        <span>{best === null ? t("arcade.distraction") : t("arcade.best", { ms: best })}</span>
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
                {t("arcade.idleHeadline")}
              </p>
              <p className="text-xs opacity-60">{t("arcade.idleHint")}</p>
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
              <p className="font-serif text-5xl animate-pulse">{t("arcade.waiting")}</p>
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
              <p className="font-serif text-8xl leading-none">{t("arcade.active")}</p>
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
              <p className="font-serif text-6xl">{t("arcade.earlyHeadline")}</p>
              <p className="text-xs opacity-60">{t("arcade.earlyHint")}</p>
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
              <p className="text-sm opacity-60">{t(`arcade.ratings.${getRatingKey(score)}`)}</p>
              <p className="mt-5 text-xs opacity-35">{t("arcade.resultHint")}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
