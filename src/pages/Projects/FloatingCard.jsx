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
        prefersReduced ? { opacity: 1, y: project.offset } : { opacity: 0, y: project.offset + 40 }
      }
      whileInView={prefersReduced ? {} : { opacity: 1, y: project.offset }}
      viewport={{ once: true, margin: "0px 200px" }}
      style={{ skewX, rotateZ, transformZ: 0 }}
      onClick={onClick}
      className="relative w-[90vw] md:w-[min(720px,45vw)] h-[42vh] md:h-[52vh] shrink-0 group cursor-pointer will-change-transform"
    >
      <motion.div
        style={{ y: yParallax, transformZ: 0 }}
        className="w-full h-full bg-neutral-900 border border-white/5 overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-[1.03] group-hover:border-orange-500/40 group-hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)]"
      >
        <div className="absolute inset-0 scale-105 transition-transform duration-1000 group-hover:scale-110">
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Improved Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="absolute bottom-0 left-0 p-10 w-full z-10 flex flex-col gap-6">
          <motion.div
            initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange-500 font-bold">
              {project.type}
            </span>
          </motion.div>

          <div className="flex flex-col gap-2">
            <motion.div
              className="flex justify-between items-end"
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mix-blend-difference">
                {project.title}
              </h3>
              <span className="font-mono text-sm text-neutral-500 group-hover:text-orange-500 transition-colors duration-500 font-bold">
                {project.year}
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-[1px] w-full bg-white/10 origin-left group-hover:bg-white/20 transition-colors" 
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-400 group-hover:text-neutral-200 transition-colors duration-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {project.category}
            </div>
            <span>ID: {project.id}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
