import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const CV_URL = `${import.meta.env.BASE_URL}cv.pdf`;

export default function CvModal({ isOpen, onClose }) {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-testid="cv-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl h-[85vh] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-12 bg-neutral-950/80 border-b border-white/5 shrink-0">
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                cv.pdf
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={CV_URL}
                  download
                  className="px-4 py-1.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-neutral-800 text-white hover:bg-orange-500 transition-colors"
                >
                  Download
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close CV preview"
                  className="p-1.5 rounded-md text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Preview */}
            <iframe
              src={CV_URL}
              title="CV Preview"
              className="flex-1 w-full bg-white"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
