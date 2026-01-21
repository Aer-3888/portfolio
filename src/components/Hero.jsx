import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import InfiniteLoopText from "./InfiniteLoopText";

export default function Hero() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ANIMATIONS 
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], ["10%", "0%"]);
  
  // Crossfade Logic
  const tickerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const lockedOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[125vh] w-full bg-neutral-900 overflow-x-hidden">
      
      {/* Sticky Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Navigation */}
        <nav className="absolute top-8 right-8 z-50 flex gap-8 text-white mix-blend-difference">
           {['Projects', 'About', 'Contact'].map(link => (
             <span key={link} className="cursor-pointer hover:opacity-50 transition-opacity uppercase text-xl font-medium tracking-widest">
                {link}
             </span>
           ))}
        </nav>

        {/* LAYER 1: Text After Scroll Down */}
        <motion.div 
            style={{ opacity: lockedOpacity, scale, y }}
            className="absolute z-10 w-full flex justify-center top-[65%] -translate-y-1/2"
        >
             <h1 className="text-[15vw] font-black text-white leading-none tracking-tighter whitespace-nowrap">
               THEO PHAN
             </h1>
        </motion.div>

        {/* LAYER 2: Main Component */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <img 
            src="/images/me.png" 
            alt="Subject" 
            className="h-[100dvh] w-auto max-w-full object-contain drop-shadow-2xl"
          />
        </div>
           
        {/* LAYER 3: Front Text*/}
        <motion.div 
            style={{ opacity: tickerOpacity, scale, y }}
            className="absolute z-30 inset-x-0 top-[65%] -translate-y-1/2"
        >
             <InfiniteLoopText speed={0.2} />
        </motion.div>

        {/* Background (maybe modify later to a more unique design) */}
        <div className="absolute inset-0 z-0 bg-neutral-900" />

      </div>
    </div>
  );
}