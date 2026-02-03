import { motion, AnimatePresence } from "framer-motion";

export default function MenuPanel({ isOpen, onClose, navItems = [] }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1190]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed top-0 right-0 h-screen w-[320px] max-w-[85vw] bg-neutral-950/95 border-l border-white/10 shadow-2xl z-[1200] p-8 flex flex-col gap-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.3em] text-white/60">Menu</span>
              <button
                type="button"
                className="text-white/70 hover:text-white text-sm tracking-widest uppercase cursor-pointer"
                onClick={onClose}
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  type="button"
                  custom={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05, duration: 0.25 } }}
                  exit={{ opacity: 0, x: 10, transition: { duration: 0.15 } }}
                  className="text-left text-2xl font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors cursor-pointer"
                  onClick={() => {
                    if (typeof item.onClick === "function") item.onClick();
                    if (typeof onClose === "function") onClose();
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
