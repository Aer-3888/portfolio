import { useState } from "react";
import { motion } from "framer-motion";
import { hobbies } from "./hobbiesData";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function HobbyCard({ hobby, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative w-full h-full overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      <motion.img
        src={hobby.image}
        alt={hobby.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Deeper gradient on hover for description legibility */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: GRAIN, backgroundSize: "256px 256px" }}
      />

      <span className="absolute top-5 left-5 font-mono text-[10px] text-white/30 tracking-widest z-10">
        0{index + 1}
      </span>

      {/* Description — anchored independently above the title, never shifts the title */}
      <motion.p
        className="absolute bottom-14 left-0 right-0 px-5 md:px-6 text-xs text-neutral-300 leading-relaxed z-10"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {hobby.description}
      </motion.p>

      {/* Title — always at bottom, never moves */}
      <div className="absolute bottom-0 left-0 right-0 px-5 md:px-6 pb-5 z-10">
        <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
          {hobby.title}
        </h3>
      </div>
    </motion.button>
  );
}

export default function HobbySection({ onGalleryOpen }) {
  return (
    <section className="relative w-full py-16 md:py-24 z-10">
      <div className="px-6 md:px-12 mb-10">
        <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-[0.4em] block mb-4">
          Outside the Code
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
          Personal <span className="text-neutral-600">Interests.</span>
        </h2>
      </div>

      <div className="px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-3">
          <div className="h-[420px] md:h-[540px]">
            <HobbyCard hobby={hobbies[0]} index={0} onClick={onGalleryOpen} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            <div className="h-[200px] md:h-[265px]">
              <HobbyCard hobby={hobbies[1]} index={1} onClick={onGalleryOpen} />
            </div>
            <div className="h-[200px] md:h-[265px]">
              <HobbyCard hobby={hobbies[2]} index={2} onClick={onGalleryOpen} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 mt-8">
        <motion.button
          type="button"
          whileHover="hover"
          initial="initial"
          onClick={onGalleryOpen}
          className="group relative px-10 py-5 border border-white/20 overflow-hidden bg-transparent cursor-pointer flex items-center gap-4"
        >
          <motion.div
            variants={{ initial: { y: "100%" }, hover: { y: "0%" } }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0 bg-white"
          />
          <div className="relative z-10 flex items-center gap-4 mix-blend-difference">
            <span className="text-white font-mono text-sm font-bold uppercase tracking-[0.2em]">
              View Visual Diary
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </motion.button>
      </div>
    </section>
  );
}
