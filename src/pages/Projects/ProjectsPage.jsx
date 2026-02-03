import { useRef, useEffect, useState } from "react";
import { 
  motion, 
  useScroll, 
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavButtons from "../../components/NavButtons"; 
import HomeButton from "../../components/HomeButton";
import FloatingCard from "./FloatingCard";
import ScrollVideo from "./ScrollVideo";
import { NAV_ITEMS, PROJECTS } from "../../config/siteData";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  // Track scroll velocity for momentum effects
  const scrollVelocity = useMotionValue(0);
  
  // Refs for custom scroll physics
  let velocityTimeout = useRef(null);
  let lastScrollTime = useRef(Date.now());

  // Reset scroll position on component mount for consistent entry
  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
    };
    
    resetScroll();
    requestAnimationFrame(resetScroll);
    
    return () => clearTimeout(velocityTimeout.current);
  }, []);

  // Scroll Progress Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply spring physics to scroll
  const smoothScroll = useSpring(scrollYProgress, {
    damping: 35,
    mass: 0.5,
    stiffness: 100,
  });

  // Horizontal Scroll 
  useEffect(() => {
    let touchStartX = null;
    let touchStartY = null;
    let touchStartTime = null;
    let isHorizontalScroll = false;

    // Handle Mouse Wheel events
    const handleWheel = (e) => {
      // user scroll horizontally ?
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.7;
      
      if (isHorizontal && e.deltaX !== 0) {
        // Prevent default browser history navigation
        e.preventDefault();
        
        const now = Date.now();
        const deltaTime = now - lastScrollTime.current;
        const velocity = e.deltaX / Math.max(deltaTime, 16);
        
        scrollVelocity.set(velocity);
        lastScrollTime.current = now;

        // Apply eased scroll
        const easeMultiplier = 0.95 + Math.min(Math.abs(velocity) * 0.002, 0.05);
        window.scrollBy({
          top: e.deltaX * easeMultiplier,
          behavior: "smooth"
        });
        
        clearTimeout(velocityTimeout.current);
        velocityTimeout.current = setTimeout(() => {
          scrollVelocity.set(0);
        }, 150);
      }
    };

    // Touch Event Handlers for Mobile
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      isHorizontalScroll = false;
    };

    const handleTouchMove = (e) => {
      if (touchStartX === null || touchStartY === null) return;

      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;

      const diffX = touchStartX - touchCurrentX;
      const diffY = touchStartY - touchCurrentY;

      // Detect if the swipe is horizontal
      if (!isHorizontalScroll && Math.abs(diffX) > Math.abs(diffY) * 1.5 && Math.abs(diffX) > 10) {
        isHorizontalScroll = true;
      }

      // Horizontal scrolling
      if (isHorizontalScroll && e.cancelable) {
        e.preventDefault();
        
        window.scrollBy({
          top: diffX * 0.8,
          left: 0,
          behavior: "auto"
        });

        const now = Date.now();
        const velocity = diffX / Math.max(now - touchStartTime, 16);
        scrollVelocity.set(velocity);
      }
    };

    const handleTouchEnd = () => {
      if (isHorizontalScroll) {
        // Clear velocity after touch release
        velocityTimeout.current = setTimeout(() => {
          scrollVelocity.set(0);
        }, 300);
      }
      touchStartX = null;
      touchStartY = null;
      touchStartTime = null;
      isHorizontalScroll = false;
    };

    // Passive: false is required to preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(velocityTimeout.current);
    };
  }, []);

  // Scroll-Based Animations
  const introOpacity = useTransform(smoothScroll, [0, 0.1], [1, 0]);
  const introScale = useTransform(smoothScroll, [0, 0.1], [1, 0.92]);
  const introY = useTransform(smoothScroll, [0, 0.1], ["0%", "-20%"]);
  const overlayOpacity = useTransform(smoothScroll, [0, 0.1], [0.5, 0]);

  // Video Background Animations
  const videoOpacity = useTransform(smoothScroll, [0.38, 0.52], [1, 0]);
  const videoScale = useTransform(smoothScroll, [0.38, 0.52], [1, 1.05]);

  // Tunnel Animations
  const tunnelX = useTransform(smoothScroll, [0.48, 0.92], ["12%", "-68%"]);
  const tunnelOpacity = useTransform(smoothScroll, [0.43, 0.58], [0, 1]);
  const tunnelY = useTransform(smoothScroll, [0.48, 0.65], ["30px", "0px"]);

  return (
    <div className="bg-neutral-950 text-white font-sans selection:bg-orange-500/30">
        
      {/* Navigation */}
      <div className="fixed top-8 left-6 md:left-10 z-[1200] mix-blend-difference">
          <HomeButton />
      </div>
      <NavButtons 
        items={NAV_ITEMS.map(item => ({ ...item, onClick: () => navigate(item.path) }))}
        currentPath="/projects"
        className="fixed top-8 right-10 z-[1200] flex gap-8 text-white mix-blend-difference"
      />

      {/* Scroll Container */}
      <div ref={containerRef} className="relative h-[500vh]">
        
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

            {/* Video Background */}
            <motion.div style={{ opacity: videoOpacity, scale: videoScale }} className="absolute inset-0 z-0">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <ScrollVideo scrollProgress={scrollYProgress} />
                </motion.div>
            </motion.div>

            {/* Dark Overlay */}
            <motion.div 
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 z-5 bg-black pointer-events-none"
            />

            {/* Intro Text */}
            <motion.div 
                style={{ opacity: introOpacity, scale: introScale, y: introY }}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
            >
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 0.8, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[12vw] font-black uppercase tracking-tighter leading-[0.8] text-center mix-blend-overlay"
                >
                    My<br/>Creations
                </motion.h1>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-12 flex flex-col items-center gap-2 animate-bounce"
                >
                    <span className="font-mono text-xs uppercase tracking-widest text-orange-500">
                        Scroll to Enter
                    </span>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Projects Tunnel */}
            <motion.div 
                style={{ x: tunnelX, opacity: tunnelOpacity, y: tunnelY }}
                className="absolute inset-0 z-20 flex items-center pl-[20vw] gap-[10vw] w-max will-change-transform"
            >
                <div className="w-[30vw] shrink-0 text-left">
                    <div className="w-16 h-1 bg-orange-500 mb-6" />
                    <h2 className="text-6xl font-black uppercase tracking-tighter mb-4">
                        Welcome<br/>to My<br/>Projects
                    </h2>
                    <p className="font-mono text-neutral-400 text-sm max-w-sm">
                        /MNT/ASSETS/PROJECTS
                    </p>
                </div>

                {PROJECTS.map((project) => (
                    <FloatingCard key={project.id} project={project} x={tunnelX} />
                ))}

                <div className="w-[30vw] h-full flex items-center justify-center shrink-0">
                    <button onClick={() => navigate("/contact")} className="group flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all cursor-pointer">
                            <span className="text-2xl">→</span>
                        </div>
                        <span className="font-mono text-xs uppercase tracking-widest">Start New Quest</span>
                    </button>
                </div>
            </motion.div>

            {/* Grain & Gradient Overlays */}
            <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute inset-0 z-30 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/80" />
            
        </div>
      </div>
    </div>
  );
}