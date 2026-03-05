import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";
const PHRASES = ["LET'S HAVE \n FUN", "HELLO \n WORLD.", "STUDENT \n HERE!"];

export default function CipherText() {
  const [display, setDisplay] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const currentPhrase = PHRASES[phraseIndex];
    let currentIndex = 0;
    let scrambleTicks = 0;
    const maxScrambleTicks = 3;
    let isPaused = false;

    const interval = setInterval(() => {
      if (isPaused) return;

      if (currentIndex >= currentPhrase.length) {
        setDisplay(currentPhrase);
        isPaused = true;

        setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }, 2000);

        return;
      }

      const solvedPart = currentPhrase.substring(0, currentIndex);
      let currentPart = "";
      const char = currentPhrase[currentIndex];

      if (char === " " || char === "\n") {
        currentPart = char;
      } else {
        currentPart = CHARS[Math.floor(Math.random() * CHARS.length)];
      }

      setDisplay(solvedPart + currentPart);

      scrambleTicks++;

      if (char === " " || char === "\n") {
        currentIndex++;
        scrambleTicks = 0;
      } else if (scrambleTicks > maxScrambleTicks) {
        scrambleTicks = 0;
        currentIndex++;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isInView, phraseIndex]);

  return (
    <span
      ref={ref}
      className="block text-[9vw] leading-[0.9] font-black text-neutral-900 tracking-tighter whitespace-pre-line min-h-[1em]"
    >
      {display}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="text-orange-500 inline-block ml-1 align-baseline"
      >
        _
      </motion.span>
    </span>
  );
}
