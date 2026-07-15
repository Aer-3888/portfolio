import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export default function useMagneticEffect() {
  const sensorRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 105, damping: 17, mass: 0.55 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = sensorRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    const maxMove = 82;
    const moveX = Math.max(-maxMove, Math.min(maxMove, distanceX * 0.56));
    const moveY = Math.max(-maxMove, Math.min(maxMove, distanceY * 0.56));

    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    sensorRef,
    xSpring,
    ySpring,
    handleMouseMove,
    handleMouseLeave,
  };
}
