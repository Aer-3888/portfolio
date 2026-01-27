import React from "react";
import { motion } from "framer-motion";

export default function NavButtons({
  items = [],
  navOpacity,
  navPointerEvents,
  className = "fixed top-8 right-10 z-[999] flex gap-8 text-white mix-blend-difference",
  buttonClass = "cursor-pointer hover:opacity-50 transition-opacity uppercase text-xl font-medium tracking-widest",
}) {
  const style = {};
  if (navOpacity) style.opacity = navOpacity;
  if (navPointerEvents) style.pointerEvents = navPointerEvents;

  return (
    <motion.nav style={style} className={className}>
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={item.onClick}
          className={buttonClass}
        >
          {item.label}
        </button>
      ))}
    </motion.nav>
  );
}
