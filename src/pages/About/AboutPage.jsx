import { useRef, useState } from "react";
import { useScroll } from "framer-motion";
import { useLocation } from "react-router-dom";
import PageNav from "../../components/layout/PageNav";
import SystemWindow from "./SystemWindow";
import CvModal from "./CvModal";

export default function AboutPage() {
  const containerRef = useRef(null);
  const location = useLocation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const [isGalleryFullscreen, setIsGalleryFullscreen] = useState(false);
  const [showCv, setShowCv] = useState(false);
  const initialTab = location.state?.openGallery ? "gallery" : "git";

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-neutral-950 text-white pt-32 pb-24 px-6 md:px-12 flex flex-col items-center overflow-hidden"
    >
      {/* Top Section */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20 relative z-10">
        <div className="flex flex-col gap-4">
          <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-[0.4em] block mb-2">
            01 // Profile
          </span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
            Théo
            <br />
            <span className="text-neutral-600">Phan.</span>
          </h1>
        </div>

        <div className="flex flex-col gap-6 max-w-lg">
          <p className="text-neutral-300 text-xl md:text-2xl font-bold tracking-tight leading-tight">
            Engineering systems where technical precision meets creative exploration.
          </p>
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-mono">
            Currently studying Computer Science at INSA Rennes, specializing in AI Engineering and
            Full-Stack development.
          </p>
          <button
            onClick={() => setShowCv(true)}
            className="self-start px-5 py-2 border border-white/10 rounded-md font-mono text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all cursor-pointer"
          >
            View CV
          </button>
        </div>
      </div>

      <PageNav
        currentPath="/about"
        scrollYProgress={scrollYProgress}
        isHidden={isGalleryFullscreen || showCv}
      />

      <SystemWindow defaultTab={initialTab} onFullscreenChange={setIsGalleryFullscreen} />

      <CvModal isOpen={showCv} onClose={() => setShowCv(false)} />
    </main>
  );
}
