import { useRef, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { wrap } from "@motionone/utils";
import TextStrip from "./TextStrip";

export default function InfiniteLoopText({ speed = 0.2 }) {
  const containerRef = useRef(null);
  const isVisible = useRef(true);
  const baseX = useMotionValue(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!isVisible.current) return;
    let moveBy = -(speed * (delta / 200));
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

  return (
    <div ref={containerRef} className="flex overflow-hidden whitespace-nowrap w-full">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        <TextStrip />
        <TextStrip />
      </motion.div>
    </div>
  );
}
