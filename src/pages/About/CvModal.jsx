import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const CV_URLS = {
  fr: `${import.meta.env.BASE_URL}cv.pdf#toolbar=0&navpanes=0`,
  en: `${import.meta.env.BASE_URL}cv_en.pdf#toolbar=0&navpanes=0`,
};

export default function CvModal({ isOpen, onClose }) {
  const { t, i18n } = useTranslation("home");
  const [lang, setLang] = useState(i18n.language === "fr" ? "fr" : "en");
  const modalRef = useRef(null);

  // Default the CV to the site language, still overridable via the toggle.
  useEffect(() => {
    setLang(i18n.language === "fr" ? "fr" : "en");
  }, [i18n.language]);

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

  // Focus trap and Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab") {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    const previousFocus = document.activeElement;
    window.addEventListener("keydown", handleKey);

    // Initial focus
    setTimeout(() => {
      const firstFocusable = modalRef.current?.querySelector("button");
      firstFocusable?.focus();
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-2 md:p-8"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl h-[90vh] md:h-[85vh] bg-neutral-900 border border-white/10 rounded-xl md:rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-12 bg-neutral-950/80 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                  cv.pdf
                </span>
                <div className="flex gap-1 bg-black/40 p-0.5 rounded-md">
                  {["en", "fr"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider transition-all ${
                        lang === l
                          ? "bg-neutral-800 text-white"
                          : "text-neutral-500 hover:text-neutral-300"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`${import.meta.env.BASE_URL}cv${lang === "fr" ? "" : "_en"}.pdf`}
                  download
                  className="px-4 py-1.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-neutral-800 text-white hover:bg-slate-600 transition-colors"
                >
                  {t("cv.download")}
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
              src={CV_URLS[lang]}
              title="CV Preview"
              className="flex-1 w-full bg-neutral-800"
              style={{ border: "none" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
