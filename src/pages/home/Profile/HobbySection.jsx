import { useState } from "react";
import { motion } from "framer-motion";
import { hobbies } from "./hobbiesData";

function HobbyCard({ hobby, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative w-full h-full overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
    >
      <motion.img
        src={hobby.image}
        alt={hobby.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.04 : 1, opacity: hovered ? 1 : 0.95 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* A soft footer wash, only enough to keep the small label legible */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />

      <span className="absolute top-4 left-4 text-[11px] text-white/60 tracking-[0.18em] z-10">
        0{index + 1}
      </span>

      {/* Description, fades in on hover */}
      <motion.p
        className="absolute bottom-12 left-0 right-0 px-5 text-[12px] text-white/85 leading-relaxed z-10"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {hobby.description}
      </motion.p>

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 z-10">
        <h3 className="text-sm font-medium text-white tracking-tight">{hobby.title}</h3>
      </div>
    </motion.button>
  );
}

export default function HobbySection({ onGalleryOpen }) {
  return (
    <section className="relative w-full bg-paper py-24 md:py-32 border-t border-stone z-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-10">
        <span className="text-[11px] uppercase tracking-[0.18em] text-pebble block mb-3">
          Outside the code
        </span>
        <h2 className="text-3xl md:text-5xl font-normal text-ink tracking-[-0.02em] leading-[0.95]">
          Things I spend time on
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
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

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-10">
        <button
          type="button"
          onClick={onGalleryOpen}
          className="group inline-flex items-center gap-2 text-[13px] text-ink cursor-pointer"
        >
          <span className="border-b border-transparent group-hover:border-ink transition-colors duration-300 pb-0.5">
            View visual diary
          </span>
          <span className="text-ash transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    </section>
  );
}
