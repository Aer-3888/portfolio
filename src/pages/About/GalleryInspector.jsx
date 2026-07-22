import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { galleryFiles } from "./galleryData";

const GalleryModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation("home");
  const [activeFile, setActiveFile] = useState(galleryFiles[0]);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const modalRef = useRef(null);

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

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen) return;
    const currentIndex = galleryFiles.findIndex((f) => f.name === activeFile.name);
    const nextIndex = (currentIndex + 1) % galleryFiles.length;
    const prevIndex = (currentIndex - 1 + galleryFiles.length) % galleryFiles.length;

    [galleryFiles[nextIndex], galleryFiles[prevIndex]].forEach((file) => {
      const img = new Image();
      img.src = file.url;
    });
  }, [activeFile, isOpen]);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setActiveFile((prev) => {
      const currentIndex = galleryFiles.findIndex((f) => f.name === prev.name);
      const nextIndex = (currentIndex + 1) % galleryFiles.length;
      setIsImageLoading(true);
      return galleryFiles[nextIndex];
    });
  }, []);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setActiveFile((prev) => {
      const currentIndex = galleryFiles.findIndex((f) => f.name === prev.name);
      const prevIndex = (currentIndex - 1 + galleryFiles.length) % galleryFiles.length;
      setIsImageLoading(true);
      return galleryFiles[prevIndex];
    });
  }, []);

  // Keyboard navigation and Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();

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
    window.addEventListener("keydown", handleKeyDown);

    // Initial focus
    setTimeout(() => {
      const firstFocusable = modalRef.current?.querySelector("button");
      firstFocusable?.focus();
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-12"
        onClick={onClose}
      >
        {/* Header Metadata */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-slate-400 font-mono text-[10px] tracking-[0.3em]">
            {t("gallery.counter", {
              index: galleryFiles.indexOf(activeFile) + 1,
              total: galleryFiles.length,
            })}
          </span>
          <div className="flex gap-4 items-center bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <span className="text-white font-mono text-[9px] font-bold uppercase tracking-widest">
              {activeFile.meta.loc}
            </span>
            <span className="text-white/20">|</span>
            <span className="text-white/60 font-mono text-[9px] uppercase">
              {activeFile.meta.aperture} {activeFile.meta.shutter} ISO{activeFile.meta.iso}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-50 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all cursor-pointer border border-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Main Image Container */}
        <motion.div
          key={activeFile.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-full max-h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute -left-20 hidden lg:flex p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <img
            src={activeFile.url}
            alt={activeFile.name}
            onLoad={() => setIsImageLoading(false)}
            className={`max-w-[90vw] max-h-[75vh] object-contain shadow-2xl border border-white/10 bg-black transition-opacity duration-500 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
          />

          <button
            onClick={handleNext}
            className="absolute -right-20 hidden lg:flex p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </motion.div>

        {/* Mobile Swipe / Tap Area */}
        <div className="lg:hidden fixed inset-0 flex">
          <div className="w-1/2 h-full" onClick={handlePrev} />
          <div className="w-1/2 h-full" onClick={handleNext} />
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default memo(GalleryModal);
