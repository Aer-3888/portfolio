import { forwardRef, useCallback, useImperativeHandle } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useAnimation,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingCard from "./FloatingCard";
import { PROJECTS } from "../../config/siteData";

const TunnelView = forwardRef(function TunnelView(
  { setSelectedProject, showIntro, containerRef, isModalOpen },
  ref
) {
  const navigate = useNavigate();

  const handleSelect = useCallback(
    (project) => {
      setSelectedProject(project);
    },
    [setSelectedProject]
  );

  const tunnelControls = useAnimation();
  const entryControls = useAnimation();

  useImperativeHandle(ref, () => ({
    playEntry: async () => {
      await new Promise((r) => requestAnimationFrame(r));
      tunnelControls.start({
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" },
      });
      await entryControls.start({
        x: 0,
        transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
      });
      document.body.style.overflow = "";
    },
  }));

  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Freeze scroll progress when a project modal is open so the tunnel
  // never moves regardless of wheel events or overflow-lock timing gaps.
  const frozenProgress = useMotionValue(rawScrollYProgress.get());
  useMotionValueEvent(rawScrollYProgress, "change", (v) => {
    if (!isModalOpen) frozenProgress.set(v);
  });

  const smoothScroll = useSpring(frozenProgress, {
    damping: 35,
    mass: 0.5,
    stiffness: 100,
  });

  const tunnelX = useTransform(smoothScroll, [0, 1], ["0%", "-90%"]);
  const tunnelTextX = useTransform(smoothScroll, [0, 1], ["0%", "40%"]);

  return (
    <>
      {/* Tunnel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showIntro ? tunnelControls : { opacity: 1 }}
        className="absolute inset-0 z-10 w-full h-full"
      >
        <motion.div
          initial={{ x: showIntro ? "60vw" : "0vw" }}
          animate={showIntro ? entryControls : { x: 0 }}
          className="h-full"
          style={{ willChange: "transform" }}
        >
          <motion.div
            style={{ x: tunnelX }}
            className="flex items-center pl-[40vw] gap-[20vw] w-max h-full"
          >
            {/* Tunnel header text */}
            <div className="w-[35vw] shrink-0 text-left pl-12 relative">
              <motion.div style={{ x: tunnelTextX }} className="relative z-10">
                <h2
                  className="font-black uppercase tracking-tighter mb-4 leading-[0.8]"
                  style={{ fontSize: "clamp(3rem, 6vw, 6.5rem)" }}
                >
                  Selected <br /> <span className="text-neutral-500">Projects</span>
                </h2>
                <p className="text-xs text-neutral-500 uppercase tracking-wide mt-6">2024 — 2026</p>
              </motion.div>
            </div>

            {/* Project Cards */}
            {PROJECTS.map((project) => (
              <FloatingCard
                key={project.id}
                project={project}
                x={tunnelX}
                onSelect={handleSelect}
              />
            ))}

            {/* Contact link */}
            <div className="w-[45vw] h-full flex items-center justify-center shrink-0">
              <button
                onClick={() => navigate("/contact")}
                className="group flex flex-col items-center gap-6 relative cursor-pointer"
              >
                <div className="w-28 h-28 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:text-black transition-all z-10 duration-500">
                  <span className="text-3xl group-hover:translate-x-2 transition-transform duration-500">
                    →
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] z-10 text-neutral-500 group-hover:text-white transition-colors duration-500">
                    Let's build
                  </span>
                  <span className="font-black text-lg uppercase tracking-tighter z-10 text-white/40 group-hover:text-white transition-colors duration-500">
                    Something Together
                  </span>
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      {!showIntro && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[30vw] h-[2px] bg-white/10 z-[1200] overflow-hidden">
          <motion.div
            style={{ scaleX: smoothScroll, transformOrigin: "left" }}
            className="w-full h-full bg-white"
          />
        </div>
      )}
    </>
  );
});

export default TunnelView;
