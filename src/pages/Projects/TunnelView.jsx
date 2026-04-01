import { forwardRef, useImperativeHandle } from "react";
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

  const tunnelX = useTransform(smoothScroll, [0, 1], ["0%", "-80%"]);
  const tunnelTextX = useTransform(smoothScroll, [0, 1], ["0%", "30%"]);

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
            className="flex items-center pl-[35vw] gap-[10vw] w-max h-full will-change-transform"
          >
            {/* Tunnel header text */}
            <div className="w-[30vw] shrink-0 text-left pl-12 relative mr-[-10vw]">
              <motion.div style={{ x: tunnelTextX }} className="relative z-10">
                <div className="w-16 h-1 bg-orange-500 mb-6" />
                <h2 className="text-7xl font-black uppercase tracking-tighter mb-2 leading-[0.85]">
                  Selected <br /> Projects
                </h2>
                <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.2em] mt-4">
                  [ INDEX.2024_2026 ]
                </p>
              </motion.div>
            </div>

            {/* Project Cards */}
            {PROJECTS.map((project) => (
              <FloatingCard
                key={project.id}
                project={project}
                x={tunnelX}
                onClick={() => setSelectedProject(project)}
              />
            ))}

            {/* Contact link */}
            <div className="w-[40vw] h-full flex items-center justify-center shrink-0 -m-[10vw]">
              <button
                onClick={() => navigate("/contact")}
                className="group flex flex-col items-center gap-4 relative cursor-pointer"
              >
                <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all z-10 duration-300">
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest z-10 text-neutral-500 group-hover:text-white transition-colors">
                  Let's build <br /> something together
                </span>
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
            className="w-full h-full bg-orange-500"
          />
        </div>
      )}
    </>
  );
});

export default TunnelView;
