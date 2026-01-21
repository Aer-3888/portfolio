import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import InfiniteLoopText from "./InfiniteLoopText";
import LiquidMenu from "./layout/LiquidMenu";

export default function Hero() {
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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

  // Navigation Switch Logic
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const menuOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);

  // Pointer Events Logic
  const navPointerEvents = useTransform(scrollYProgress, (v) => v > 0.05 ? "none" : "auto");
  const menuPointerEvents = useTransform(scrollYProgress, (v) => v > 0.05 ? "auto" : "none");

  return (
    <div ref={containerRef} className="relative h-[125vh] w-full bg-neutral-900 overflow-x-hidden">
      
      {/* 1. Text Navigation (Visible at Top) */}
      <motion.nav 
          style={{ opacity: navOpacity, pointerEvents: navPointerEvents }}
          className="fixed top-8 right-10 z-[999] flex gap-8 text-white mix-blend-difference"
      >
          {['Projects', 'About', 'Contact'].map(link => (
              <span key={link} className="cursor-pointer hover:opacity-50 transition-opacity uppercase text-xl font-medium tracking-widest">
                  {link}
              </span>
          ))}
      </motion.nav>

      {/* 2. Liquid Menu (Visible on Scroll) */}
      <motion.div 
          style={{ opacity: menuOpacity, pointerEvents: menuPointerEvents }}
          className="fixed top-8 right-10 z-[999]"
      >
          <LiquidMenu 
              isOpen={isMenuOpen} 
              toggle={() => setIsMenuOpen(!isMenuOpen)} 
          />
      </motion.div>


      {/* Hero Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

        {/* Layer 1: Text After Scroll Down */}
        <motion.div 
            style={{ opacity: lockedOpacity, scale, y }}
            className="absolute z-10 w-full flex justify-center top-[65%] -translate-y-1/2"
        >
             <h1 className="text-[15vw] font-black text-white leading-none tracking-tighter whitespace-nowrap">
               THEO PHAN
             </h1>
        </motion.div>

        {/* Layer 2: Main Component */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <img 
            src="/images/me.png" 
            alt="Subject" 
            className="h-[100dvh] w-auto max-w-full object-contain drop-shadow-2xl"
          />
        </div>
           
        {/* Layer 3: Front Text*/}
        <motion.div 
            style={{ opacity: tickerOpacity, scale, y }}
            className="absolute z-30 inset-x-0 top-[65%] -translate-y-1/2"
        >
             <InfiniteLoopText speed={0.2} />
        </motion.div>

        {/* Background */}
        <div className="absolute inset-0 z-0 bg-neutral-900" />

      </div>
    </div>
  );
}