import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "../../../config/motion";
import { SCREEN, WAIKI_SCREEN, screenBox } from "./screenGeometry";

export default function PhoneScreen() {
  const reduced = useReducedMotion();

  return (
    <motion.img
      src={WAIKI_SCREEN}
      alt=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduced ? DURATION.state : DURATION.enter,
        delay: reduced ? 0 : DURATION.enter,
        ease: EASE,
      }}
      style={{ ...screenBox, rotate: SCREEN.rotate }}
      className="absolute object-cover"
    />
  );
}
