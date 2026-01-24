import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: (direction) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1,
  }),
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    y: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 1,
  }),
};

export default function VerticalFilmStrip({ activeHobby, direction, onClick }) {
  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] cursor-pointer group overflow-hidden border-4 border-neutral-800 bg-neutral-900 shadow-2xl"
      onClick={onClick}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={activeHobby.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: {
              type: "spring",
              stiffness: 60,
              damping: 25,
              mass: 0.8,
            },
            opacity: {
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.6,
            },
            scale: {
              type: "spring",
              stiffness: 120,
              damping: 20,
            },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activeHobby.image}
            alt={activeHobby.label}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-900/20" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 border-[16px] border-neutral-900 pointer-events-none z-20" />

      <div className="absolute bottom-6 right-6 z-30 mix-blend-difference">
        <span className="font-mono text-white text-[10px] tracking-widest uppercase border border-white/30 px-2 py-1 bg-black/50">
          0{activeHobby.index + 1} // 03
        </span>
      </div>
    </div>
  );
}
