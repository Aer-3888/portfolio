import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

export const hobbies = [
  {
    id: "climb",
    index: 0, 
    label: "BOULDERING",
    description: "Solving gravity puzzles.",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "photo",
    index: 1,
    label: "PHOTOGRAPHY",
    description: "Capturing light & shapes.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "escape",
    index: 2,
    label: "ESCAPE GAMES", 
    description: "Pattern recognition & logic under pressure.",
    image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop", 
  },
];

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
                  x: isActive ? 60 : 0,
                  color: isActive ? "#ffffff" : "#333333",
                }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="text-6xl md:text-8xl font-black uppercase tracking-tighter"
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
                      opacity: { duration: 0.5, delay: 0.2 },
                      height: {
                        duration: 1.0,
                        type: "spring",
                        stiffness: 60,
                        damping: 15,
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-neutral-400 font-mono text-base mt-6 ml-16 mb-8 max-w-lg leading-relaxed border-l-2 border-orange-500 pl-6">
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
