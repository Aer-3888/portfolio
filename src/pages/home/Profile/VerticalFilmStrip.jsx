import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const variants = {
  enter: (_direction) => ({
    opacity: 0,
    scale: 1.05,
    filter: "blur(10px)",
  }),
  center: {
    zIndex: 1,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (_direction) => ({
    zIndex: 0,
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
  }),
};

const reducedVariants = {
  enter: () => ({ opacity: 0 }),
  center: { zIndex: 1, opacity: 1 },
  exit: () => ({ zIndex: 0, opacity: 0 }),
};

export default function VerticalFilmStrip({ activeHobby, direction, onClick }) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="relative w-full aspect-[4/5] max-h-[70vh] cursor-pointer group overflow-hidden bg-neutral-950 rounded-lg border border-white/5 shadow-2xl"
      onClick={onClick}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={activeHobby.id}
          custom={direction}
          variants={prefersReduced ? reducedVariants : variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={
            prefersReduced
              ? { duration: 0.15 }
              : {
                  opacity: { duration: 0.4, ease: "linear" },
                  scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  filter: { duration: 0.3, ease: "easeOut" },
                }
          }
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activeHobby.image}
            alt={activeHobby.label}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Corner Metadata */}
      <div className="absolute top-6 right-6 z-30">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-lg">
          <span className="font-mono text-white text-[10px] font-bold tracking-widest uppercase">
            0{activeHobby.index + 1}
          </span>
        </div>
      </div>

      {/* Interaction Hint */}
      <div className="absolute bottom-6 left-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="font-mono text-white/40 text-[9px] tracking-[0.3em] uppercase">
          Open Gallery →
        </span>
      </div>
    </div>
  );
}
