import { useMemo } from "react";
import { motion } from "framer-motion";

const PARTICLE_COUNT = 20;

export const BackgrounGrid = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, () => ({
        width: Math.random() * 4 + 1,
        height: Math.random() * 4 + 1,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 flex items-center justify-center [perspective:1000px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute w-[200vw] h-[200vh] bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(60deg)] origin-center"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 40%, black 70%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 40%, black 70%, transparent)",
          }}
        >
          <motion.div
            animate={{ y: [0, 64] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-full"
          />
        </motion.div>
      </div>

      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-orange-500 rounded-full opacity-20"
          style={{ width: p.width, height: p.height, left: p.left, top: p.top }}
          animate={{ y: [0, -100], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
};
