import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ArcadeMachine() {
  const [gameState, setGameState] = useState("idle"); // idle, waiting, playing, result
  const [score, setScore] = useState(null);
  const [bestScore, setBestScore] = useState(null);
  const startTimeRef = useRef(0);
  const timerRef = useRef(null);

  const startGame = (e) => {
    e.stopPropagation();
    setGameState("waiting");
    setScore(null);
    
    const wait = Math.random() * 2000 + 1000;
    timerRef.current = setTimeout(() => {
      setGameState("playing");
      startTimeRef.current = Date.now();
    }, wait);
  };

  const handleTrigger = (e) => {
    e.stopPropagation();
    if (gameState === "waiting") {
      clearTimeout(timerRef.current);
      setGameState("result");
      setScore("EARLY");
      return;
    }

    if (gameState === "playing") {
      const reaction = Date.now() - startTimeRef.current;
      setScore(reaction);
      if (!bestScore || reaction < bestScore) setBestScore(reaction);
      setGameState("result");
    }
  };

  return (
    <div className="w-full h-full bg-neutral-900/50 flex flex-col font-sans relative overflow-hidden">
      {/* Subtle Header */}
      <div className="p-6 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
          <h2 className="text-white text-[10px] font-bold tracking-widest uppercase font-mono">System.Reaction_Test</h2>
        </div>
        {bestScore && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Personal Best:</span>
            <span className="text-orange-500 text-xs font-bold font-mono">{bestScore}ms</span>
          </div>
        )}
      </div>

      <div 
        className={`flex-1 flex flex-col items-center justify-center p-8 transition-all duration-300 cursor-pointer select-none
          ${gameState === "playing" ? "bg-orange-500/10" : "bg-transparent"}
        `}
        onClick={gameState === "playing" ? handleTrigger : (gameState === "waiting" ? handleTrigger : startGame)}
      >
        <AnimatePresence mode="wait">
          {gameState === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <div className="w-16 h-16 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-1 h-1 bg-orange-500 rounded-full animate-ping" />
              </div>
              <span className="text-neutral-400 text-[10px] uppercase tracking-[0.4em] font-mono">Initialize Test</span>
            </motion.div>
          )}

          {gameState === "waiting" && (
            <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <span className="text-neutral-500 text-[10px] uppercase tracking-[0.5em] font-mono animate-pulse">Scanning...</span>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div key="playing" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <span className="text-orange-500 text-4xl font-black uppercase tracking-[0.3em]">TRIGGER</span>
            </motion.div>
          )}

          {gameState === "result" && (
            <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className={`text-7xl md:text-9xl font-black tracking-tighter mb-8 ${typeof score === 'number' ? 'text-white' : 'text-red-500'}`}>
                {typeof score === 'number' ? `${score}ms` : score}
              </div>
              <div className="inline-block px-10 py-4 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all">
                Restart Sequence
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
