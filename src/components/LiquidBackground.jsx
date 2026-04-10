import { useAnimationFrame } from "framer-motion";
import { useMemo, useRef, useEffect } from "react";
import { interpolate } from "flubber";

// Organic blob shapes
const blobShapes = [
  "M50,10 C70,10 85,20 90,40 C95,60 90,75 70,85 C50,95 30,90 15,75 C5,60 5,40 15,25 C25,15 35,10 50,10 Z",
  "M50,15 C65,12 80,25 85,45 C88,65 80,82 60,88 C40,92 25,85 18,70 C10,55 12,35 22,22 C32,12 40,16 50,15 Z",
  "M50,12 C72,15 88,30 92,50 C94,70 85,85 65,90 C45,93 28,88 18,72 C8,56 10,38 20,25 C30,14 38,10 50,12 Z",
  "M50,8 C68,10 82,22 88,42 C92,62 88,80 68,92 C48,98 30,94 18,78 C8,62 6,42 14,26 C22,14 35,7 50,8 Z",
  "M50,10 C70,10 85,20 90,40 C95,60 90,75 70,85 C50,95 30,90 15,75 C5,60 5,40 15,25 C25,15 35,10 50,10 Z",
];

const circlePath = "M50,5 C75,5 95,25 95,50 C95,75 75,95 50,95 C25,95 5,75 5,50 C5,25 25,5 50,5 Z";

export default function LiquidBackground({ isHovered, speed = 0.0007, blobColor = "white" }) {
  const morphers = useMemo(() => {
    return blobShapes.map((shape, i) =>
      interpolate(shape, blobShapes[(i + 1) % blobShapes.length], {
        maxSegmentLength: 2,
      })
    );
  }, []);

  const progressRef = useRef(0);
  const pathRef = useRef(null);
  const isHoveredRef = useRef(isHovered);

  useEffect(() => {
    isHoveredRef.current = isHovered;
    if (isHovered && pathRef.current) {
      pathRef.current.setAttribute("d", circlePath);
    }
  }, [isHovered]);

  useAnimationFrame((_t, delta) => {
    if (isHoveredRef.current) return;

    const total = morphers.length;
    const next = progressRef.current + delta * speed;
    const wrapped = next % total;
    progressRef.current = wrapped;

    const index = Math.floor(wrapped);
    const localT = wrapped - index;
    const path = morphers[index](localT);
    if (pathRef.current) pathRef.current.setAttribute("d", path);
  });

  return (
    <div className="absolute -inset-4 aspect-square flex items-center justify-center">
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
            transform: isHovered ? "scale(0.9)" : "scale(1)",
            transformOrigin: "50px 50px",
            transition: "transform 0.3s ease-out, d 0.3s ease-out",
          }}
        />
      </svg>
    </div>
  );
}
