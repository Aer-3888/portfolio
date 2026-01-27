import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HobbyList, hobbies } from "./HobbyList";
import VerticalFilmStrip from "./VerticalFilmStrip";
import { motion } from "framer-motion";

export default function HobbySection() {
  const navigate = useNavigate();
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
    <section className="relative w-full bg-neutral-900 py-12 min-[1400px]:py-24 z-10 overflow-hidden">
      {/* 1. Mobile and Tablet View (< 1400px) */}
      <div className="min-[1400px]:hidden w-full flex flex-col gap-8">
        <div className="px-6 mb-4">
          <h2 className="text-xs font-mono text-orange-500 tracking-widest uppercase mb-2">
            Personal Modules // 02
          </h2>
          <h3 className="text-3xl font-bold text-white tracking-tighter uppercase leading-none">
            Active Pursuits
          </h3>
          <p className="text-[10px] text-neutral-400 font-mono mt-2">
            // Activities outside the digital workspace.
          </p>
        </div>

        {/* Scroll Container */}
        <div className="w-full overflow-x-auto flex gap-6 px-6 snap-x snap-mandatory pb-8 no-scrollbar">
          {hobbies.map((hobby) => (
            <div
              key={hobby.id}
              className="relative min-w-[80vw] w-[80vw] md:w-[80vw] shrink-0 h-[60vh] bg-neutral-950 rounded-[2rem] overflow-hidden snap-center border border-white/10 shadow-2xl group"
            >
              <img
                src={hobby.src || hobby.img || hobby.image}
                alt={hobby.title}
                className="absolute inset-0 w-full h-full object-cover opacity-70 z-0 transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />

              <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

              {/* Tags */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg ml-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="font-mono text-xs text-white font-bold uppercase tracking-[0.15em]">
                    {hobby.id}
                  </span>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col gap-3">
                {/* Title */}
                <h4 className="text-5xl font-black text-white uppercase tracking-tighter leading-[0.85] drop-shadow-2xl relative z-20">
                  {hobby.title}
                </h4>

                {/* Description Box */}
                {hobby.description && (
                  <div className="relative pl-4 border-l border-orange-500/80 z-20 mt-1">
                    <p className="text-lg font-bold text-neutral-200 font-mono leading-relaxed line-clamp-5 drop-shadow-md">
                      {hobby.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="px-6 mt-2">
          <button
            type="button"
            onClick={() => navigate("/about")}
            className="w-full relative py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md overflow-hidden group shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-700" />

            <span className="relative z-10 font-mono text-xs font-bold text-white uppercase tracking-[0.2em] group-active:tracking-[0.3em] transition-all duration-300">
              More About Me
            </span>
          </button>
        </div>
      </div>

      {/* 2. Large Desktop View (>= 1400px) */}
      <div className="hidden min-[1400px]:flex w-full max-w-[90vw] mx-auto px-4 md:px-8 items-start justify-between gap-24 min-h-[90vh]">
        {/* Left: List */}
        <div className="w-[50%] flex flex-col items-start z-10 sticky top-24 max-w-full">
          <div className="mb-16 pl-1 w-full">
            <h2 className="text-xs font-mono text-orange-500 tracking-widest uppercase mb-4">
              Personal Modules // 02
            </h2>
            <h3 className="text-6xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
              Executing Life
              <br />
              Protocols <span className="text-neutral-600">//</span>
              <br />
              <span className="text-neutral-500">Beyond the Terminal.</span>
            </h3>
          </div>

          <div className="w-full relative">
            <HobbyList activeId={activeId} onHover={handleHover} />
          </div>

          <motion.button
            type="button"
            whileHover="hover"
            initial="initial"
            onClick={() => navigate("/about")}
            className="group relative mt-8 ml-1 px-10 py-5 border border-white/20 overflow-hidden bg-transparent cursor-pointer"
          >
            {/* 1. Fill Animation: Slides up from bottom */}
            <motion.div
              variants={{
                initial: { y: "100%" },
                hover: { y: "0%" },
              }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0 bg-white"
            />

            {/* 2. Text Content (Mix Blend Mode for color inversion) */}
            <div className="relative z-10 flex items-center gap-4 mix-blend-difference">
              <span className="text-white font-mono text-sm font-bold uppercase tracking-[0.2em]">
                More About Me
              </span>
            </div>
          </motion.button>
        </div>

        {/* Right: Film Strip */}
        <div className="w-[45%] z-20 flex justify-end">
          <VerticalFilmStrip
            activeHobby={activeHobby}
            direction={tuple[1]}
            onClick={() => console.log("Open Modal")}
          />
        </div>
      </div>
    </section>
  );
}
