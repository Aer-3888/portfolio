import { motion } from "framer-motion";

export default function NavButtons({
  items = [],
  navOpacity,
  navPointerEvents,
  currentPath,
  className = "fixed top-8 right-10 z-[1200] flex gap-8 text-white mix-blend-difference items-center",
  buttonClass = "cursor-pointer hover:opacity-60 transition-all uppercase text-sm font-medium tracking-[0.3em] py-2",
  activeButtonClass = "relative cursor-pointer uppercase text-sm font-semibold tracking-[0.3em] text-white py-2",
}) {
  const style = {};
  if (navOpacity) style.opacity = navOpacity;
  if (navPointerEvents) style.pointerEvents = navPointerEvents;

  return (
    <motion.nav style={style} className={className} layout>
      {items.map((item) => {
        const isActive = currentPath && item.path === currentPath;
        return (
          <motion.div
            key={item.label}
            className="relative flex items-center justify-center"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            layout
          >
            <button
              type="button"
              onClick={item.onClick}
              className={isActive ? activeButtonClass : buttonClass}
            >
              {item.label}
            </button>
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full origin-left"
                layoutId="navUnderline"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
}
