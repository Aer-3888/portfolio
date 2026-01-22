import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { wrap } from "@motionone/utils";
import TextStrip from "./TextStrip";

export default function InfiniteLoopText({ speed = 0.2 }) {
  const baseX = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    let moveBy = -(speed * (delta / 200));
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap w-full">
      <motion.div
        className="flex whitespace-nowrap"
        style={{ x: useTransform(baseX, (v) => `${wrap(0, -50, v)}%`) }}
      >
        <TextStrip />
        <TextStrip />
      </motion.div>
    </div>
  );
}
