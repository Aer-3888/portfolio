import { motion } from "framer-motion";

const topLineVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 10 },
};

const middleLineVariants = {
  closed: { opacity: 1, x: 0 },
  open: { opacity: 0, x: 20 },
};

const bottomLineVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -10 },
};

export default function BurgerLines({ isOpen, lineColor = "#000000" }) {
  return (
    <div className="relative z-20 flex flex-col gap-2 p-4 items-center justify-center">
      <motion.span
        variants={topLineVariants}
        animate={{ ...topLineVariants[isOpen ? "open" : "closed"], backgroundColor: lineColor }}
        initial="closed"
        className="h-[2px] w-8 block origin-center"
      />
      <motion.span
        variants={middleLineVariants}
        animate={{ ...middleLineVariants[isOpen ? "open" : "closed"], backgroundColor: lineColor }}
        initial="closed"
        className="h-[2px] w-8 block"
      />
      <motion.span
        variants={bottomLineVariants}
        animate={{ ...bottomLineVariants[isOpen ? "open" : "closed"], backgroundColor: lineColor }}
        initial="closed"
        className="h-[2px] w-8 block origin-center"
      />
    </div>
  );
}
