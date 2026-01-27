import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useDragControls, useAnimation } from "framer-motion";
import LiquidMenu from "../../components/layout/LiquidMenu";
import NavButtons from "../../components/NavButtons";
import GitGraph from "./GitGraph";
import GalleryInspector from "./GalleryInspector";

export default function SystemWindow({
  navOpacity,
  navPointerEvents,
  menuOpacity,
  menuPointerEvents,
  menuInteractive = true,
}) {
  const [activeTab, setActiveTab] = useState("git");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuTemporarilyHidden, setIsMenuTemporarilyHidden] = useState(false);
  const [isNavTemporarilyHidden, setIsNavTemporarilyHidden] = useState(false);
  const navigate = useNavigate();

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

  const navItems = [
    { label: "Home", onClick: () => navigate("/"), className: "md:hidden" },
    { label: "Projects", onClick: () => navigate("/", { state: { scrollTo: "projects" } }) },
    { label: "Contact", onClick: () => navigate("/contact") },
  ];

  const handleGalleryFullscreenChange = useCallback((isFull) => {
    if (isFull) setIsMenuOpen(false);
    setIsMenuTemporarilyHidden(isFull);
    setIsNavTemporarilyHidden(isFull);
  }, []);

  return (
    <>
      {!isNavTemporarilyHidden && (
        <div className="hidden md:block fixed top-8 left-6 md:left-10 z-[1200]">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-white/20 transition-colors mix-blend-difference cursor-pointer"
          >
            <span className="text-lg">←</span>
            <span className="hidden sm:inline">Home</span>
          </button>
        </div>
      )}

      {!isNavTemporarilyHidden && (
        <NavButtons
          items={navItems}
          navOpacity={navOpacity}
          navPointerEvents={navPointerEvents}
          className="fixed top-8 right-10 z-[1200] flex gap-8 text-white mix-blend-difference"
        />
      )}

      <motion.div
        style={{
          opacity: menuOpacity,
          pointerEvents: isMenuTemporarilyHidden || !menuInteractive ? "none" : menuPointerEvents,
        }}
        className="fixed top-8 right-10 z-[1200]"
        aria-hidden={isMenuTemporarilyHidden || !menuInteractive}
      >
        {!isMenuTemporarilyHidden && menuInteractive && (
          <LiquidMenu
            isOpen={isMenuOpen}
            toggle={() => setIsMenuOpen((v) => !v)}
            blobColor="#ffffff"
            lineColor="#000000"
          />
        )}
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1190]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 h-screen w-[320px] max-w-[85vw] bg-neutral-950/95 border-l border-white/10 shadow-2xl z-[1200] p-8 flex flex-col gap-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.3em] text-white/60">Menu</span>
                <button
                  type="button"
                  className="text-white/70 hover:text-white text-sm tracking-widest uppercase"
                  onClick={() => setIsMenuOpen(false)}
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
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.05, duration: 0.25 },
                    }}
                    exit={{ opacity: 0, x: 10, transition: { duration: 0.15 } }}
                    className="text-left text-2xl font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors"
                    onClick={() => {
                      item.onClick();
                      setIsMenuOpen(false);
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
                <span className={activeTab === "git" ? "text-orange-500" : "opacity-50"}>
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
                <span className={activeTab === "gallery" ? "text-blue-500" : "opacity-50"}>
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
