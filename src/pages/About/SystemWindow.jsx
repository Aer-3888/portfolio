import { useState, useCallback, useEffect } from "react";
import { motion, useDragControls, useAnimation } from "framer-motion";
import GitGraph from "./GitGraph";
import GalleryInspector from "./GalleryInspector";

export default function SystemWindow({ onFullscreenChange, defaultTab = "git" }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Sync tab if defaultTab changes (e.g., on navigation)
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Drag Controls and Animation Controls
  const dragControls = useDragControls();
  const windowControls = useAnimation();

  const handleDragEnd = (event, info) => {
    // Calculate distance from origin (0,0)
    const distance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);
    const THRESHOLD = 150; // px

    // Magnetic Snap Back to Center
    if (distance < THRESHOLD) {
      windowControls.start({
        x: 0,
        y: 0,
        transition: { type: "spring", stiffness: 200, damping: 25 },
      });
    }
  };

  const handleGalleryFullscreenChange = useCallback(
    (isFull) => {
      if (typeof onFullscreenChange === "function") onFullscreenChange(isFull);
    },
    [onFullscreenChange]
  );

  return (
    <>
      {/* Animated wrapper for the draggable window only */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl mt-12 md:mt-20 relative z-10"
      >
        <motion.div
          drag
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          dragConstraints={{ left: -500, right: 500, top: -100, bottom: 500 }}
          animate={windowControls}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.005, boxShadow: "0px 30px 60px rgba(0,0,0,0.6)" }}
          className="w-full h-auto bg-neutral-900 border border-white/5 rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] flex flex-col relative overflow-hidden"
        >
          {/* Title Bar */}
          <div
            onPointerDown={(e) => dragControls.start(e)}
            className="h-12 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 gap-6 rounded-t-2xl shrink-0 cursor-grab active:cursor-grabbing touch-none"
          >
            {/* Window Controls */}
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 bg-black/40 p-1 rounded-lg">
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setActiveTab("git")}
                className={`
                  px-4 py-1.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider transition-all
                  ${
                    activeTab === "git"
                      ? "bg-neutral-800 text-white shadow-sm"
                      : "text-neutral-500 hover:text-neutral-300"
                  }
                `}
              >
                git.log
              </button>

              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setActiveTab("gallery")}
                className={`
                  px-4 py-1.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider transition-all
                  ${
                    activeTab === "gallery"
                      ? "bg-neutral-800 text-white shadow-sm"
                      : "text-neutral-500 hover:text-neutral-300"
                  }
                `}
              >
                assets.view
              </button>
            </div>

            {/* Path Breadcrumb */}
            <div className="hidden md:flex flex-1 items-center justify-end select-none">
              <span className="font-mono text-[9px] text-neutral-600 tracking-widest uppercase">
                session:{" "}{activeTab === "git" ? "active_history" : "media_gallery"}
              </span>
            </div>
          </div>

          <div className="bg-neutral-900 min-h-[500px] relative">
            {activeTab === "git" ? (
              <GitGraph />
            ) : (
              <GalleryInspector onFullscreenChange={handleGalleryFullscreenChange} />
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
