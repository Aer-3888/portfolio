import { motion, useVelocity, useSpring, useTransform, useReducedMotion } from "framer-motion";

export default function FloatingCard({ project, x, onClick }) {
  const prefersReduced = useReducedMotion();

  const xVelocity = useVelocity(x);
  const smoothVelocity = useSpring(xVelocity, {
    damping: 40,
    stiffness: 250,
    mass: 0.8,
  });

  const skewX = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    prefersReduced ? [0, 0, 0] : [12, 0, -12]
  );
  const rotateZ = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    prefersReduced ? [0, 0, 0] : [2, 0, -2]
  );
  const yParallax = useTransform(
    x,
    prefersReduced ? () => "0px" : (v) => `${Math.sin(parseFloat(v || 0) * 0.001) * 8}px`
  );

  return (
    <motion.div
      initial={
        prefersReduced ? { opacity: 1, y: project.offset } : { opacity: 0, y: project.offset + 20 }
      }
      whileInView={prefersReduced ? {} : { opacity: 1, y: project.offset }}
      viewport={{ once: true, margin: "0px 100px" }}
      style={{ skewX, rotateZ, transformZ: 0 }}
      onClick={onClick}
      className="relative w-[80vw] md:w-[min(600px,40vw)] h-[38vh] md:h-[48vh] shrink-0 group cursor-pointer will-change-transform"
    >
      <motion.div
        style={{ y: yParallax, transformZ: 0 }}
        className="w-full h-full bg-neutral-900 border border-neutral-800 overflow-hidden relative shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-orange-500/30 group-hover:border-orange-500/60 group-hover:shadow-lg"
      >
        <div className="absolute inset-0 scale-110">
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 via-50% to-transparent group-hover:via-black/50 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/5 group-hover:via-white/0 group-hover:to-white/5 transition-all duration-500" />

        <div className="absolute bottom-0 left-0 p-8 w-full z-10">
          <motion.div
            initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-2"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-orange-500/80 px-2 py-0.5 border border-orange-500/30 bg-orange-500/5 backdrop-blur-sm">
              {project.type}
            </span>
          </motion.div>
          <motion.div
            className="flex justify-between items-end border-b border-white/20 pb-4 mb-4"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-orange-500 transition-colors duration-300 group-hover:text-orange-400">
              {project.year}
            </span>
          </motion.div>
          <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
            <span>{project.category}</span>
            <span>ID: {project.id}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
