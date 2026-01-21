import { useState } from "react";
import { motion } from "framer-motion";
import useMagneticEffect from "../../hooks/useMagneticEffect";
import BurgerLines from "../BurgerLines";
import LiquidBackground from "../LiquidBackground";

export default function LiquidMenu({ isOpen, toggle }) {
  const [isHovered, setIsHovered] = useState(false);
  const { sensorRef, xSpring, ySpring, handleMouseMove, handleMouseLeave } = useMagneticEffect();

  return (
    // 1. Anchor Container
    <div className="relative h-20 w-20 flex items-center justify-center z-50">
        
        {/* 2. Sensor */}
        <div 
            ref={sensorRef}
            onClick={toggle}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              setIsHovered(false);
              handleMouseLeave();
            }}
            onMouseEnter={() => setIsHovered(true)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] cursor-pointer rounded-full outline-none tap-highlight-transparent"
        />

        {/* 3. Visual Button */}
        <motion.div
            style={{ x: xSpring, y: ySpring }}
            className="relative z-10 pointer-events-none"
        >
            <LiquidBackground isHovered={isHovered} />
            <BurgerLines isOpen={isOpen} />
        </motion.div>
    </div>
  );
}