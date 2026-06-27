import { useAnimationFrame, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import * as flubber from "flubber";

// Organic blob silhouettes, morphed continuously by flubber.
const blobShapes = [
  "M48,8 C68,5 85,16 91,37 C97,57 92,75 73,86 C57,95 33,94 17,82 C3,71 4,47 12,29 C20,14 33,10 48,8 Z",
  "M53,6 C73,9 87,25 88,45 C90,67 83,82 61,90 C41,97 21,89 11,71 C2,54 9,33 23,19 C34,9 41,4 53,6 Z",
  "M50,9 C71,7 91,21 92,46 C94,69 81,87 59,92 C39,97 19,87 12,69 C4,51 7,29 23,17 C34,8 38,10 50,9 Z",
  "M45,8 C68,3 87,17 93,40 C98,61 89,81 67,90 C45,98 25,91 13,75 C2,59 6,35 19,21 C29,11 33,11 45,8 Z",
  "M48,8 C68,5 85,16 91,37 C97,57 92,75 73,86 C57,95 33,94 17,82 C3,71 4,47 12,29 C20,14 33,10 48,8 Z",
];

const interpolate =
  flubber.interpolate || (flubber.default && flubber.default.interpolate) || flubber.default;

export default function LiquidBackground({ isHovered, speed = 0.0018, blobColor = "white" }) {
  const prefersReduced = useReducedMotion();

  const morphers = useMemo(() => {
    if (prefersReduced) return [];
    return blobShapes.map((shape, i) =>
      interpolate(shape, blobShapes[(i + 1) % blobShapes.length], {
        maxSegmentLength: 2,
      })
    );
  }, [prefersReduced]);

  const progressRef = useRef(0);
  const pathRef = useRef(null);

  useAnimationFrame((_t, delta) => {
    if (prefersReduced || !morphers.length) return;

    // Keep morphing even while hovered.
    const total = morphers.length;
    const next = progressRef.current + delta * speed * (isHovered ? 1.6 : 1);
    const wrapped = next % total;
    progressRef.current = wrapped;

    const index = Math.floor(wrapped);
    const localT = wrapped - index;
    const path = morphers[index](localT);
    if (pathRef.current) pathRef.current.setAttribute("d", path);
  });

  return (
    <div className="absolute -inset-3 aspect-square flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        <path
          ref={pathRef}
          d={blobShapes[0]}
          fill={blobColor}
          style={{
            transform: isHovered ? "scale(1.08)" : "scale(1)",
            transformOrigin: "50px 50px",
            transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>
    </div>
  );
}
