import { useState } from "react";
import { HobbyList } from "./HobbyList";
import { hobbies } from "./hobbiesData";
import VerticalFilmStrip from "./VerticalFilmStrip";
import { motion } from "framer-motion";

export default function HobbySection({ onGalleryOpen }) {
  const [activeId, setActiveId] = useState(hobbies[0].id);
  const [tuple, setTuple] = useState([0, 0]);

  const activeHobby = hobbies.find((h) => h.id === activeId);

  const handleHover = (newId, newIndex) => {
    if (newId === activeId) return;
    const currentDirection = newIndex > tuple[0] ? 1 : -1;
    setTuple([newIndex, currentDirection]);
    setActiveId(newId);
  };

  return (
    <section className="relative w-full py-12 min-[1025px]:py-20 z-10 overflow-hidden bg-transparent">
      {/* 1. Mobile and Tablet View (<= 1024px) */}
      <div className="min-[1025px]:hidden w-full flex flex-col gap-8">
        <div className="px-6 mb-4">
          <h3 className="text-4xl font-bold text-white tracking-tighter uppercase leading-none">
            Personal <span className="text-neutral-600">Interests.</span>
          </h3>
        </div>

        {/* Scroll Container */}
        <div className="w-full overflow-x-auto flex gap-4 px-6 snap-x snap-mandatory pb-6 no-scrollbar">
          {hobbies.map((hobby) => (
            <div
              key={hobby.id}
              className="relative min-w-[78vw] w-[78vw] shrink-0 h-[55vh] bg-neutral-950 rounded-2xl overflow-hidden snap-center border border-white/10 shadow-2xl group"
              onClick={onGalleryOpen}
            >
              <img
                src={hobby.src || hobby.img || hobby.image}
                alt={hobby.title}
                className="absolute inset-0 w-full h-full object-cover opacity-70 z-0 transition-transform duration-700 group-hover:scale-105"
              />

              <div
                className="absolute inset-0 opacity-20 pointer-events-none z-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "256px 256px",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

              <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 w-full p-5 z-20 flex flex-col gap-2">
                <h4 className="text-3xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
                  {hobby.title}
                </h4>

                {hobby.description && (
                  <p className="relative z-20 text-xs text-neutral-300 leading-relaxed line-clamp-2">
                    {hobby.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="px-6 mt-2">
          <button
            type="button"
            onClick={onGalleryOpen}
            className="w-full py-4 border border-white/20 active:bg-white/10 transition-colors flex items-center justify-center gap-3"
          >
            <span className="font-mono text-xs font-bold text-white uppercase tracking-[0.2em]">
              View Visual Diary
            </span>
            <span className="text-white text-sm">→</span>
          </button>
        </div>
      </div>

      {/* 2. Desktop View (>= 1025px) */}
      <div className="hidden min-[1025px]:flex w-full max-w-[1400px] mx-auto px-12 items-start justify-between gap-24 min-h-[80vh]">
        {/* Left: List */}
        <div className="w-[50%] flex flex-col items-start z-10 sticky top-24 max-w-full">
          <div className="mb-16 pl-1 w-full">
            <h3 className="text-7xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
              Personal
              <br />
              <span className="text-neutral-500">Interests.</span>
            </h3>
          </div>

          <div className="w-full relative">
            <HobbyList activeId={activeId} onHover={handleHover} />
          </div>

          <motion.button
            type="button"
            whileHover="hover"
            initial="initial"
            onClick={onGalleryOpen}
            className="group relative mt-8 ml-1 px-10 py-5 border border-white/20 overflow-hidden bg-transparent cursor-pointer flex items-center gap-4"
          >
            {/* 1. Fill Animation */}
            <motion.div
              variants={{
                initial: { y: "100%" },
                hover: { y: "0%" },
              }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0 bg-white"
            />

            {/* 2. Text Content */}
            <div className="relative z-10 flex items-center gap-4 mix-blend-difference">
              <span className="text-white font-mono text-sm font-bold uppercase tracking-[0.2em]">
                View Visual Diary
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
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

        {/* Right: Film Strip */}
        <div className="w-[45%] z-20 flex justify-end">
          <VerticalFilmStrip
            activeHobby={activeHobby}
            direction={tuple[1]}
            onClick={onGalleryOpen}
          />
        </div>
      </div>
    </section>
  );
}
