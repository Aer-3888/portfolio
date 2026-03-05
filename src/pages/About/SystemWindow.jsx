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
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl mt-12 md:mt-20 relative z-10"
      >
        <motion.div
          drag
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          dragConstraints={{ left: -500, right: 500, top: -100, bottom: 500 }} // Safety bounds
          animate={windowControls}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.01, boxShadow: "0px 20px 50px rgba(0,0,0,0.5)" }}
          className="w-full h-auto bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl flex flex-col relative"
        >
          <div
            onPointerDown={(e) => dragControls.start(e)}
            className="h-10 bg-black border-b border-neutral-800 flex items-end px-3 gap-2 rounded-t-xl shrink-0 cursor-grab active:cursor-grabbing touch-none"
          >
            <div className="flex gap-2 self-center mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>

            <div className="flex h-8">
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setActiveTab("git")}
                className={`
                  relative px-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest rounded-t-md transition-all
                  ${
                    activeTab === "git"
                      ? "bg-neutral-900 text-white border-t-2 border-orange-500 z-10"
                      : "bg-neutral-950 text-neutral-500 border-t-2 border-transparent hover:bg-neutral-900/50 hover:text-neutral-300"
                  }
                `}
              >
                <span
                  className={
                    "cursor-pointer " + (activeTab === "git" ? "text-orange-500" : "opacity-50")
                  }
                >
                  ./git_log
                </span>
              </button>

              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setActiveTab("gallery")}
                className={`
                  relative px-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest rounded-t-md transition-all ml-1
                  ${
                    activeTab === "gallery"
                      ? "bg-neutral-900 text-white border-t-2 border-blue-500 z-10"
                      : "bg-neutral-950 text-neutral-500 border-t-2 border-transparent hover:bg-neutral-900/50 hover:text-neutral-300"
                  }
                `}
              >
                <span
                  className={
                    "cursor-pointer " + (activeTab === "gallery" ? "text-blue-500" : "opacity-50")
                  }
                >
                  ./gallery
                </span>
              </button>
            </div>

            <div className="hidden md:flex flex-1 h-8 border-b border-neutral-800 items-center justify-end px-4 select-none">
              <span className="font-mono text-[10px] text-neutral-600">
                root@system:~/{activeTab === "git" ? "career/history" : "assets/photos"}
              </span>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-b-xl min-h-[500px]">
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
