import { motion, useVelocity, useSpring, useTransform } from "framer-motion";

export default function FloatingCard({ project, x }) {
  const xVelocity = useVelocity(x);
  const smoothVelocity = useSpring(xVelocity, { 
    damping: 40, 
    stiffness: 250,
    mass: 0.8,
  });
  
  const skewX = useTransform(smoothVelocity, [-1500, 0, 1500], [12, 0, -12]);
  const rotateZ = useTransform(smoothVelocity, [-1500, 0, 1500], [2, 0, -2]);
  const scale = useTransform(smoothVelocity, [-1500, 0, 1500], [0.98, 1, 0.98]);
  const xPos = useTransform(x, (v) => `${parseFloat(v || 0) * 0.04}px`);
  const yParallax = useTransform(x, (v) => `${Math.sin(parseFloat(v || 0) * 0.001) * 8}px`);

  return (
    <motion.div
      style={{ y: project.offset, skewX, rotateZ, scale }}
      className="relative w-[80vw] md:w-[600px] h-[38vh] md:h-[48vh] shrink-0 group cursor-pointer"
    >
      <motion.div 
        style={{ y: yParallax }}
        className="w-full h-full bg-neutral-900 border border-neutral-800 overflow-hidden relative shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-orange-500/30 group-hover:border-orange-500/60 group-hover:shadow-lg"
      >
        <motion.div className="absolute inset-0 scale-110" style={{ x: xPos }}>
          <img 
            src={project.img} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 via-50% to-transparent group-hover:via-black/50 transition-all duration-500" />

        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/5 group-hover:via-white/0 group-hover:to-white/5 transition-all duration-500" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 p-8 w-full z-10">
          <motion.div 
            className="flex justify-between items-end border-b border-white/20 pb-4 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">{project.title}</h3>
            <span className="font-mono text-xs text-orange-500 transition-colors duration-300 group-hover:text-orange-400">{project.year}</span>
          </motion.div>
          <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
            <span>{project.type}</span>
            <span>ID: {project.id}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}