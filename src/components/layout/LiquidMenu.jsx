import { useState } from "react";
import { motion } from "framer-motion";
import useMagneticEffect from "../../hooks/useMagneticEffect";
import BurgerLines from "../BurgerLines";
import LiquidBackground from "../LiquidBackground";

export default function LiquidMenu({ isOpen, toggle, blobColor = "white", lineColor = "#000000" }) {
  const [isHovered, setIsHovered] = useState(false);
  const { sensorRef, xSpring, ySpring, handleMouseMove, handleMouseLeave } = useMagneticEffect();

  return (
    <div className="relative h-20 w-20 flex items-center justify-center z-50">
      <div
        ref={sensorRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        onMouseEnter={() => setIsHovered(true)}
        className="absolute w-[300px] h-[300px] flex items-center justify-center outline-none tap-highlight-transparent cursor-default"
      >
        <motion.div
          style={{ x: xSpring, y: ySpring }}
          className="relative pointer-events-auto cursor-pointer"
        >
          <button
            onClick={toggle}
            type="button"
            className="relative h-20 w-20 flex items-center justify-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 pointer-events-none">
              <LiquidBackground isHovered={isHovered} blobColor={blobColor} />
            </div>

            <div className="relative z-10 pointer-events-none">
              <BurgerLines isOpen={isOpen} lineColor={lineColor} />
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
