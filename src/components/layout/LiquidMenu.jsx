import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useMagneticEffect from "../../hooks/useMagneticEffect";
import BurgerLines from "../BurgerLines";
import LiquidBackground from "../LiquidBackground";

export default function LiquidMenu({ isOpen, toggle, blobColor = "white", lineColor = "#000000" }) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();
  const { sensorRef, xSpring, ySpring, handleMouseMove, handleMouseLeave } = useMagneticEffect();

  // Roughly half the former amplitude on every channel. The blob still reads as
  // alive, but it no longer wanders far enough to feel unmoored from its corner.
  const floatAnimation = prefersReduced
    ? undefined
    : {
        y: [0, -8, 3, 6, 0],
        x: [0, 5, -3, -6, 0],
        rotate: [0, 3.5, -1.5, -2.5, 0],
        scale: [1, 1.07, 0.97, 1.05, 1],
      };

  return (
    <div className="relative h-12 w-12 md:h-16 md:w-16 flex items-center justify-center z-50">
      <div
        ref={sensorRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        onMouseEnter={() => setIsHovered(true)}
        className="absolute w-[280px] h-[280px] flex items-center justify-center outline-none tap-highlight-transparent cursor-default"
      >
        <motion.div style={{ x: xSpring, y: ySpring }} className="relative cursor-pointer">
          <motion.div
            animate={floatAnimation}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <button
              onClick={toggle}
              type="button"
              className="relative h-12 w-12 md:h-16 md:w-16 flex items-center justify-center cursor-pointer"
              aria-label={t("menu.toggle")}
            >
              <div className="absolute inset-0 pointer-events-none">
                <LiquidBackground isHovered={isHovered} speed={0.0045} blobColor={blobColor} />
              </div>

              <div className="relative z-10 pointer-events-none scale-75 md:scale-90">
                <BurgerLines isOpen={isOpen} lineColor={lineColor} />
              </div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
