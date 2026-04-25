import { motion } from "framer-motion";

export default function NavButtons({
  items = [],
  navOpacity,
  navPointerEvents,
  currentPath,
  className = "fixed top-8 right-10 z-[1200] flex gap-8 text-white mix-blend-difference items-center",
  buttonClass = "cursor-pointer hover:opacity-60 transition-all uppercase text-sm font-normal tracking-[0.3em] py-2",
  activeButtonClass = "cursor-pointer uppercase text-sm font-medium tracking-[0.3em] text-white py-2",
}) {
  const style = {};
  if (navOpacity) style.opacity = navOpacity;
  if (navPointerEvents) style.pointerEvents = navPointerEvents;

  return (
    <motion.nav style={style} className={className}>
      {items.map((item) => {
        const isActive = currentPath && item.path === currentPath;
        return (
          <motion.button
            key={item.label}
            type="button"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            onClick={item.onClick}
            className={isActive ? activeButtonClass : buttonClass}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
