import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { hobbies } from "./hobbiesData";

export function HobbyList({ activeId, onHover }) {
  return (
    <div className="flex flex-col gap-2 mb-16 w-full">
      <LayoutGroup>
        {hobbies.map((hobby) => {
          const isActive = activeId === hobby.id;
          return (
            <motion.div
              layout
              key={hobby.id}
              className="group cursor-pointer relative border-b border-neutral-800 pb-2"
              onMouseEnter={() => onHover(hobby.id, hobby.index)}
              initial={false}
              transition={{
                layout: {
                  duration: 1.0,
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                },
              }}
            >
              <motion.h3
                layout
                animate={{
                  x: isActive ? 20 : 0,
                  color: isActive ? "#ffffff" : "#404040",
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
              >
                {hobby.label}
              </motion.h3>

              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      opacity: { duration: 0.4, delay: 0.1 },
                      height: {
                        duration: 0.8,
                        type: "spring",
                        stiffness: 70,
                        damping: 18,
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-neutral-400 text-sm md:text-base mt-4 ml-6 mb-8 max-w-lg leading-relaxed">
                      {hobby.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </LayoutGroup>
    </div>
  );
}
