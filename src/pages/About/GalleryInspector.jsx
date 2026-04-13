import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { galleryFiles } from "./galleryData";

export default function GalleryInspector({ onFullscreenChange }) {
  const [activeFile, setActiveFile] = useState(galleryFiles[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const listRef = useRef(null);
  const sidebarLenisRef = useRef(null);
  const wheelStateRef = useRef({ acc: 0, lastTs: 0 });
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  // Initialize sidebar Lenis (desktop only — sidebar is hidden on mobile)
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;
    if (!listRef.current) return;

    const lenis = new Lenis({
      wrapper: listRef.current,
      content: listRef.current,
      duration: 1.2,
      smoothWheel: true,
    });

    sidebarLenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      sidebarLenisRef.current = null;
    };
  }, []);

  // Preload adjacent images
  useEffect(() => {
    const currentIndex = galleryFiles.findIndex((f) => f.name === activeFile.name);
    const nextIndex = (currentIndex + 1) % galleryFiles.length;
    const prevIndex = (currentIndex - 1 + galleryFiles.length) % galleryFiles.length;

    [galleryFiles[nextIndex], galleryFiles[prevIndex]].forEach((file) => {
      const img = new Image();
      img.src = file.url;
    });
  }, [activeFile]);

  // Handle active file change
  const handleSetFile = (file) => {
    if (file.name === activeFile.name) return;
    setIsImageLoading(true);
    setActiveFile(file);
  };

  // Consolidated Scroll Lock Logic
  useEffect(() => {
    if (onFullscreenChange) onFullscreenChange(isFullscreen);

    if (isFullscreen || isSidebarHovered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen, isSidebarHovered, onFullscreenChange]);

  // Ensure we always signal exit on unmount.
  useEffect(() => {
    return () => {
      onFullscreenChange?.(false);
    };
  }, [onFullscreenChange]);

  // Navigation Handlers
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

  // Mouse wheel navigation (Fullscreen Only)
  const handleWheelNav = useCallback(
    (e) => {
      if (!isFullscreen) return;

      e.preventDefault();
      e.stopPropagation();

      const now = performance.now();
      const threshold = 60;
      const minInterval = 100;
      const nextAcc = wheelStateRef.current.acc + e.deltaY;

      if (Math.abs(nextAcc) < threshold || now - wheelStateRef.current.lastTs < minInterval) {
        wheelStateRef.current.acc = nextAcc;
        return;
      }

      if (nextAcc > 0) {
        handleNext();
      } else {
        handlePrev();
      }

      wheelStateRef.current = { acc: 0, lastTs: now };
  }, [isFullscreen, handleNext, handlePrev]);

  // Keyboard navigation in fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, handleNext, handlePrev]);

  // Touch swipe navigation (Fullscreen Only)
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      // Only act on horizontal swipes (not vertical scroll attempts)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    },
    [handleNext, handlePrev]
  );

  // Scroll in sidebar to active file
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const activeElement = document.getElementById(`file-${activeFile.name}`);

    if (activeElement && sidebarLenisRef.current) {
      sidebarLenisRef.current.scrollTo(activeElement, {
        offset: -container.clientHeight / 2 + activeElement.clientHeight / 2,
        duration: 1.2,
      });
    }
  }, [activeFile]);

  return (
    <>
      <div className="w-full flex flex-col md:flex-row h-[75vh] min-h-[500px] md:h-[600px] border border-neutral-800 bg-neutral-900/50 rounded-lg overflow-hidden font-sans">
        {/* Left: Side Bar (Not visible on mobile) */}
        <div
          className="hidden md:flex w-full md:w-64 bg-neutral-900/80 border-r border-neutral-800 flex-col h-full backdrop-blur-sm"
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
        >
          <div className="p-4 pb-2 shrink-0 z-10 bg-neutral-900/90 border-b border-white/5">
            <span className="text-[10px] uppercase text-neutral-500 tracking-widest pl-2 font-mono block">
              /mnt/assets/
            </span>
            <span className="text-[9px] text-neutral-600 pl-2 font-mono block mt-1">
              {galleryFiles.length} files detected
            </span>
          </div>

          <div
            ref={listRef}
            data-lenis-prevent
            className="
                  flex-1 p-2 flex flex-col gap-1 relative overflow-y-auto overscroll-contain
                  scrollbar-width-thin scrollbar-color-neutral-800
                  [&::-webkit-scrollbar]:w-1.5
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:bg-neutral-800
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  hover:[&::-webkit-scrollbar-thumb]:bg-orange-500/50
                  [&::-webkit-scrollbar-thumb]:transition-colors
              "
          >
            {galleryFiles.map((file) => (
              <button
                key={file.name}
                id={`file-${file.name}`}
                onClick={() => handleSetFile(file)}
                className={`w-full text-left px-3 py-2 text-xs font-mono truncate transition-all duration-200 rounded-sm shrink-0 cursor-pointer
                              ${
                                activeFile.name === file.name
                                  ? "bg-neutral-800 text-orange-500 border-l-2 border-orange-500 pl-3"
                                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50 border-l-2 border-transparent"
                              }`}
              >
                {file.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Preview Monitor */}
        <div className="flex-1 relative bg-neutral-950 p-4 md:p-8 flex items-center justify-center overflow-hidden h-full group">
          {/* Fullscreen Button*/}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 z-40 p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Maximize View"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          </button>

          {/* Navigation Arrows */}
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-between px-2 md:hidden">
            <button
              onClick={handlePrev}
              className="pointer-events-auto p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-orange-500 active:scale-95 transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-orange-500 active:scale-95 transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Mobile Counter */}
          <div className="absolute top-4 right-14 md:hidden z-30 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="text-[10px] font-mono text-white/70">
              {galleryFiles.indexOf(activeFile) + 1} / {galleryFiles.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFile.name}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-center justify-center p-2"
            >
              <div
                className="relative inline-block max-w-full max-h-full cursor-zoom-in group/img"
                onClick={() => setIsFullscreen(true)}
              >
                {/* Loading State Indicator */}
                <AnimatePresence>
                  {isImageLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md z-10"
                    >
                      <div className="w-8 h-8 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                      <span className="text-[8px] font-mono text-white/40 mt-3 uppercase tracking-widest">
                        Decrypting Image...
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <img
                  src={activeFile.url}
                  alt={activeFile.name}
                  onLoad={() => setIsImageLoading(false)}
                  className={`max-h-[70vh] md:max-h-[500px] max-w-full w-auto h-auto object-contain shadow-2xl border border-neutral-800 bg-black block transition-all duration-500 ${
                    isImageLoading ? "opacity-0" : "opacity-100 group-hover/img:border-orange-500/50"
                  }`}
                />

                {/* Tag */}
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-2 rounded-md font-mono text-[9px] text-neutral-300 shadow-lg z-20 pointer-events-none max-w-[calc(100%-24px)]">
                  <div className="flex items-center gap-3 text-xs font-bold text-white mb-0.5 whitespace-nowrap overflow-hidden">
                    <span>ISO{activeFile.meta.iso}</span>
                    <span className="text-neutral-600 font-thin">|</span>
                    <span>{activeFile.meta.aperture}</span>
                    <span className="text-neutral-600 font-thin">|</span>
                    <span>{activeFile.meta.shutter}</span>
                  </div>
                  <div className="text-neutral-500 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3 h-3 opacity-70 shrink-0"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.493 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="uppercase tracking-wider truncate">{activeFile.meta.loc}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "256px 256px",
            }}
          />
        </div>
      </div>

      {/* Image Fullscreen Overview */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
            style={{ touchAction: "none" }}
            onClick={() => setIsFullscreen(false)}
            onWheel={handleWheelNav}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            data-lenis-prevent
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Fullscreen Nav Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-50 p-4 bg-black/50 hover:bg-orange-500 rounded-full border border-white/10 text-white transition-all shadow-lg cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 p-4 bg-black/50 hover:bg-orange-500 rounded-full border border-white/10 text-white transition-all shadow-lg cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Fullscreen Image */}
            <motion.div
              key={activeFile.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.5, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-full max-h-full p-4 md:p-12 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeFile.url}
                alt={activeFile.name}
                className="max-w-full max-h-full object-contain shadow-2xl drop-shadow-2xl"
              />

              {/* Floating Metadata in Fullscreen */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full font-mono text-xs text-neutral-300 shadow-xl flex gap-6">
                <span className="text-white font-bold">ISO {activeFile.meta.iso}</span>
                <span className="text-white font-bold">{activeFile.meta.aperture}</span>
                <span className="text-white font-bold">{activeFile.meta.shutter}</span>
                <span className="uppercase text-orange-500">{activeFile.meta.loc}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
