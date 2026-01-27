import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import SmoothScroll from "../../layout/SmoothScroll";
import SystemWindow from "./SystemWindow";

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const menuOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);
  const navPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.05 ? "none" : "auto"));
  const menuPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.05 ? "auto" : "none"));

  return (
    <SmoothScroll>
      <main
        ref={containerRef}
        className="relative min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-32 pb-24 px-6 md:px-12 flex flex-col items-center"
      >
        {/* 1. Top Section */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div>
            <span className="text-orange-600 font-mono text-xs uppercase tracking-widest mb-4 block">
              01 // Identity
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              About
              <br />
              The
              <br />
              Human.
            </h1>
          </div>

          <p className="w-full md:w-auto max-w-md text-neutral-500 text-sm md:text-base leading-relaxed font-mono">
            I am Théo. Currently mastering Computer Science at INSA Rennes, but always exploring.
            Whether I’m training a neural network or framing a photograph, I am obsessed with how
            complex systems, wheter digital or physical, fit together.
          </p>
        </div>

        {/* 2. The System Window */}
        <SystemWindow
          navOpacity={navOpacity}
          navPointerEvents={navPointerEvents}
          menuOpacity={menuOpacity}
          menuPointerEvents={menuPointerEvents}
        />
      </main>
    </SmoothScroll>
  );
}
