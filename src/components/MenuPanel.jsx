import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./layout/LanguageSwitcher";

export default function MenuPanel({ isOpen, onClose, navItems = [] }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1190]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed top-0 right-0 z-[1200] flex h-screen w-full flex-col justify-between overflow-y-auto border-l border-white/5 bg-neutral-950/95 px-6 pb-[calc(var(--safe-bottom)+1.5rem)] pt-[calc(var(--safe-top)+1.5rem)] shadow-2xl sm:w-[380px] sm:max-w-[90vw] sm:p-12"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col gap-10 sm:gap-12">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-mono">
                  Navigation
                </span>
                <button
                  type="button"
                  className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors cursor-pointer"
                  onClick={onClose}
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Close</span>
                  <span className="text-lg group-hover:rotate-90 transition-transform duration-300">
                    ×
                  </span>
                </button>
              </div>

              <nav className="flex flex-col gap-4 sm:gap-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    custom={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.1 + index * 0.08, duration: 0.4, ease: "easeOut" },
                    }}
                    exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                    className="group relative text-left py-2 cursor-pointer"
                    onClick={() => {
                      if (typeof item.onClick === "function") item.onClick();
                      if (typeof onClose === "function") onClose();
                    }}
                    aria-current={item.isActive ? "page" : undefined}
                  >
                    <span
                      className={`relative z-10 text-2xl font-bold uppercase tracking-[0.15em] transition-colors sm:text-3xl ${item.isActive ? "text-white" : "text-white/80 group-hover:text-white"}`}
                    >
                      {item.label}
                    </span>
                    <motion.div className="absolute left-0 bottom-0 h-[1px] bg-white/20 w-0 group-hover:w-full transition-all duration-500" />
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/5 pt-8">
              <LanguageSwitcher className="text-white/70" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-mono">
                Get in touch
              </p>
              <a
                href="mailto:theo.phan.quoc.huy@gmail.com"
                className="break-all text-sm tracking-widest text-white/60 transition-colors hover:text-white"
              >
                theo.phan.quoc.huy@gmail.com
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
