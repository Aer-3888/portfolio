import { useState } from "react";
import { HobbyList, hobbies } from "./HobbyList";
import VerticalFilmStrip from "./VerticalFilmStrip";


export default function HobbySection() {
  const [activeId, setActiveId] = useState(hobbies[0].id);
  const [tuple, setTuple] = useState([0, 0]); 
  
  const activeHobby = hobbies.find(h => h.id === activeId);
  
  const handleHover = (newId, newIndex) => {
    if (newId === activeId) return;
    const currentDirection = newIndex > tuple[0] ? 1 : -1;
    setTuple([newIndex, currentDirection]);
    setActiveId(newId);
  };

  return (
    <section className="relative w-full min-h-[90vh] bg-neutral-900 flex items-center py-24 z-10 overflow-hidden">
      
      <div className="w-full max-w-[90vw] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start justify-between gap-12 md:gap-24">
        
        {/* Hobby List */}
        <div className="w-full md:w-[55%] flex flex-col items-start z-10 sticky top-24">
            
            <div className="mb-16 pl-1 w-full">
                <h2 className="text-xs font-mono text-orange-500 tracking-widest uppercase mb-4">
                    System Data // 02
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
                    Executing Life<br/>
                    Protocols <span className="text-neutral-600">//</span><br/>
                    <span className="text-neutral-500">Beyond the Terminal.</span>
                </h3>
            </div>
            
            <HobbyList activeId={activeId} onHover={handleHover} />

            <button className="ml-1 px-10 py-5 border border-white/20 text-white font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                More About Me
            </button>
        </div>
        
        {/* Vertical Film Strip */}
        <div className="w-full md:w-[40%] z-20 mt-12 md:mt-0">
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