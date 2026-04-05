import { motion } from "framer-motion";

const topLineVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 8 },
};

const middleLineVariants = {
  closed: { opacity: 1, x: 0 },
  open: { opacity: 0, x: 10 },
};

const bottomLineVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -8 },
};

export default function BurgerLines({ isOpen, lineColor = "#000000" }) {
  return (
    <div className="relative z-20 flex flex-col gap-[6px] p-4 items-center justify-center">
      <motion.span
        variants={topLineVariants}
        animate={{ ...topLineVariants[isOpen ? "open" : "closed"], backgroundColor: lineColor }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1.5px] w-7 block origin-center"
      />
      <motion.span
        variants={middleLineVariants}
        animate={{ ...middleLineVariants[isOpen ? "open" : "closed"], backgroundColor: lineColor }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1.5px] w-7 block"
      />
      <motion.span
        variants={bottomLineVariants}
        animate={{ ...bottomLineVariants[isOpen ? "open" : "closed"], backgroundColor: lineColor }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1.5px] w-7 block origin-center"
      />
    </div>
  );
}
