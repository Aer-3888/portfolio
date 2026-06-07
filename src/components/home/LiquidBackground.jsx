import { useAnimationFrame, useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import * as flubber from "flubber";

// Organic blob shapes from existing implementation
const blobShapes = [
  "M50,10 C70,10 85,20 90,40 C95,60 90,75 70,85 C50,95 30,90 15,75 C5,60 5,40 15,25 C25,15 35,10 50,10 Z",
  "M50,15 C65,12 80,25 85,45 C88,65 80,82 60,88 C40,92 25,85 18,70 C10,55 12,35 22,22 C32,12 40,16 50,15 Z",
  "M50,12 C72,15 88,30 92,50 C94,70 85,85 65,90 C45,93 28,88 18,72 C8,56 10,38 20,25 C30,14 38,10 50,12 Z",
  "M50,8 C68,10 82,22 88,42 C92,62 88,80 68,92 C48,98 30,94 18,78 C8,62 6,42 14,26 C22,14 35,7 50,8 Z",
];

const interpolate =
  flubber.interpolate || (flubber.default && flubber.default.interpolate) || flubber.default;

export default function LiquidBackground({ color, intensity, speed, isPaused = false }) {
  const prefersReduced = useReducedMotion();

  // Refs for multiple background blobs for a more cinematic feel
  const pathRefs = [useRef(null), useRef(null), useRef(null)];
  const progressRefs = [useRef(0), useRef(1.5), useRef(3)];

  const morphers = useMemo(() => {
    if (prefersReduced) return [];
    return blobShapes.map((shape, i) =>
      interpolate(shape, blobShapes[(i + 1) % blobShapes.length], {
        maxSegmentLength: 2,
      })
    );
  }, [prefersReduced]);

  useAnimationFrame((_t, delta) => {
    if (prefersReduced || isPaused) return;

    // Default values if MotionValues are not provided or not yet ready
    const s = speed ? speed.get() : 0.0004;
    const i = intensity ? intensity.get() : 0.5;

    pathRefs.forEach((ref, idx) => {
      if (!ref.current) return;

      const total = morphers.length;
      // Vary speed slightly for each blob and modulate by intensity
      const baseSpeed = s * (1 + idx * 0.3) * (0.5 + i);
      const next = progressRefs[idx].current + delta * baseSpeed;
      const wrapped = next % total;
      progressRefs[idx].current = wrapped;

      const morphIndex = Math.floor(wrapped);
      const localT = wrapped - morphIndex;
      const path = morphers[morphIndex](localT);
      ref.current.setAttribute("d", path);
    });
  });

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700 ${isPaused ? "opacity-20" : "opacity-100"}`}
    >
      {/* Background base color driven by scroll */}
      <motion.div style={{ backgroundColor: color }} className="absolute inset-0" />

      {/* Drifting liquid blobs */}
      <svg
        viewBox="0 0 100 100"
        className="absolute w-full h-full opacity-[0.07] blur-[100px]"
        preserveAspectRatio="xMidYMid slice"
      >
        <g>
          <path
            ref={pathRefs[0]}
            d={blobShapes[0]}
            fill="white"
            style={{ transform: "scale(1.5) translate(-10%, -10%)" }}
          />
          <path
            ref={pathRefs[1]}
            d={blobShapes[1]}
            fill="white"
            style={{ transform: "scale(2) translate(15%, 15%)" }}
          />
          <path
            ref={pathRefs[2]}
            d={blobShapes[2]}
            fill="white"
            style={{ transform: "scale(1.8) translate(-20%, 10%)" }}
          />
        </g>
      </svg>
    </div>
  );
}
