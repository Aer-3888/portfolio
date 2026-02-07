import { motion } from "framer-motion";

export default function NavButtons({
  items = [],
  navOpacity,
  navPointerEvents,
  currentPath,
  className = "fixed top-8 right-10 z-[999] flex gap-8 text-white mix-blend-difference",
  buttonClass = "cursor-pointer hover:opacity-50 transition-opacity uppercase text-xl font-medium tracking-widest",
  activeButtonClass = "relative cursor-pointer uppercase text-xl font-medium tracking-widest text-orange-500",
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
            className="relative"
            whileHover={{ opacity: 0.7 }}
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
                className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                layoutId="navUnderline"
                initial={false}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 400,
                  damping: 40,
                  mass: 0.8,
                }}
              />
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
}
