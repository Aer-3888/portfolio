import { useState, useEffect, useRef } from "react";

const phrases = ["READY TO\nDISRUPT?", "HELLO \n WORLD.", "STUDENT \n HERE!"];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+={}|[]:;<>?,./";

export default function CipherText() {
  const [text, setText] = useState(phrases[0]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  // The Decryption Effect
  const scramble = (targetPhrase) => {
    let iterations = 0;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      // Generate the scrambled text
      const scrambled = targetPhrase
        .split("")
        .map((char, i) => {
          if (char === "\n") return "\n";
          if (i < iterations) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]; // Show random glyph
        })
        .join("");

      setText(scrambled);

      // Speed of decryption
      if (iterations >= targetPhrase.length) {
        clearInterval(intervalRef.current);
      }

      iterations += 1 / 5;
    }, 50);
  };

  // Cycle through phrases
  useEffect(() => {
    const cycle = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % phrases.length;
        scramble(phrases[next]);
        return next;
      });
    }, 5500); // Wait 5.5s

    return () => clearInterval(cycle);
  }, []);

  return (
    <h2 className="text-[12vw] leading-[0.8] font-black text-neutral-900 tracking-tighter uppercase text-left whitespace-pre-line font-mono">
      {text}
    </h2>
  );
}
