import { motion, AnimatePresence } from "framer-motion";

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
            className="fixed top-0 right-0 h-screen w-[380px] max-w-[90vw] bg-neutral-950/95 border-l border-white/5 shadow-2xl z-[1200] p-12 flex flex-col justify-between"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col gap-12">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-mono">Navigation</span>
                <button
                  type="button"
                  className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors cursor-pointer"
                  onClick={onClose}
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Close</span>
                  <span className="text-lg group-hover:rotate-90 transition-transform duration-300">×</span>
                </button>
              </div>

              <nav className="flex flex-col gap-6">
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
                    <span className={`relative z-10 text-3xl font-bold uppercase tracking-[0.15em] transition-colors ${item.isActive ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                      {item.label}
                    </span>
                    <motion.div 
                      className="absolute left-0 bottom-0 h-[1px] bg-white/20 w-0 group-hover:w-full transition-all duration-500"
                    />
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/5 pt-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-mono">Get in touch</p>
              <a href="mailto:theo.phan.quoc.huy@gmail.com" className="text-sm text-white/60 hover:text-white transition-colors tracking-widest">
                theo.phan.quoc.huy@gmail.com
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
