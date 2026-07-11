import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

function RichText({ text, className }) {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  return (
    <p className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**"))
          return (
            <b key={i} className="text-white font-semibold">
              {part.slice(2, -2)}
            </b>
          );
        if (part.startsWith("__") && part.endsWith("__")) return <u key={i}>{part.slice(2, -2)}</u>;
        return part;
      })}
    </p>
  );
}

export default function ProjectDetails({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const scrollRef = useRef(null);
  const prefersReduced = useReducedMotion();

  // Focus trap logic
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const previousFocus = document.activeElement;
    window.addEventListener("keydown", handleKeyDown);

    // Set initial focus to the close button or first element
    setTimeout(() => {
      const firstFocusable = modalRef.current?.querySelector("button");
      firstFocusable?.focus();
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen]);

  // Reset panel scroll position each time the modal opens
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Optional: add lenis-stopped class if manual management is needed
      document.documentElement.classList.add("lenis-stopped");
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("lenis-stopped");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [isOpen]);

  if (!project) return null;

  // Render in a portal on document.body so the fixed overlay always covers the
  // full viewport, never trapped by a transformed or clipped ancestor section.
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-0 md:p-12 overflow-hidden pointer-events-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            transition={
              prefersReduced ? { duration: 0.1 } : { type: "spring", damping: 25, stiffness: 300 }
            }
            className="relative flex h-full w-full flex-col overflow-hidden bg-neutral-900 shadow-[0_0_80px_rgba(0,0,0,0.7)] md:h-auto md:max-h-[85vh] md:max-w-[1300px] md:flex-row md:border md:border-white/10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-[calc(var(--safe-top)+1rem)] z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all group cursor-pointer hover:bg-white/10 md:right-6 md:top-6"
            >
              <span className="text-xl text-white group-hover:rotate-90 transition-transform duration-300">
                ✕
              </span>
            </button>

            {/* Left side: Image/Media (Desktop) */}
            <div className="hidden md:block w-full md:w-[60%] h-64 md:h-auto overflow-hidden relative group/img">
              <img
                src={project.img}
                alt={project.title}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-r" />
              {project.imageCredit && (
                <span className="absolute bottom-4 left-4 z-10 font-mono text-[10px] tracking-wide text-white/70 [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                  {project.imageCredit}
                </span>
              )}
            </div>

            {/* Right side: Content (Scrollable on mobile) */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex min-h-0 w-full flex-1 flex-col gap-6 overflow-y-auto overscroll-contain p-6 pb-[calc(var(--safe-bottom)+1.5rem)] pt-5 custom-scrollbar md:w-[40%] md:gap-8 md:p-12"
            >
              {/* Mobile Image (Visible only on mobile, inside scrollable area) */}
              <div className="relative -mx-6 -mt-5 h-[38svh] min-h-[16rem] max-h-[22rem] shrink-0 overflow-hidden group/img md:hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                {project.imageCredit && (
                  <span className="absolute bottom-3 left-4 z-10 font-mono text-[10px] tracking-wide text-white/70 [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                    {project.imageCredit}
                  </span>
                )}
              </div>

              <div>
                <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.2em]">
                    {project.type}
                  </span>
                  <span className="font-mono text-xs text-neutral-600">·</span>
                  <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.2em]">
                    {project.year}
                  </span>
                </div>
                <h2 className="mb-4 text-3xl font-medium tracking-tight text-white md:text-4xl">
                  {project.title}
                </h2>
                <RichText
                  text={project.description}
                  className="text-base text-neutral-300 leading-relaxed md:text-lg"
                />
              </div>

              <div className="flex flex-col gap-4">
                {project.problem && (
                  <div className="bg-white/[0.03] rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-neutral-500 font-mono text-[10px] font-bold">01</span>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                        Problem
                      </h4>
                    </div>
                    <RichText
                      text={project.problem}
                      className="text-[14px] text-neutral-400 leading-relaxed"
                    />
                  </div>
                )}
                {project.approach && (
                  <div className="bg-white/[0.03] rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-neutral-500 font-mono text-[10px] font-bold">02</span>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                        Approach
                      </h4>
                    </div>
                    <RichText
                      text={project.approach}
                      className="text-[14px] text-neutral-300 leading-relaxed"
                    />
                  </div>
                )}
                {project.result && (
                  <div className="bg-white/[0.03] rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-neutral-500 font-mono text-[10px] font-bold">03</span>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                        Result
                      </h4>
                    </div>
                    <RichText
                      text={project.result}
                      className="text-[14px] text-neutral-300 leading-relaxed"
                    />
                  </div>
                )}
              </div>

              {project.role && (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-neutral-500 font-mono text-[9px] tracking-widest">
                    Role
                  </span>
                  <span className="text-sm font-bold text-white">{project.role}</span>
                </div>
              )}

              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-xs font-medium text-neutral-400 tracking-wide mb-3">Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-900/40 border border-slate-700/30 rounded-full text-xs text-slate-300/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-neutral-400 tracking-wide mb-3">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tools?.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 bg-white/5 rounded-full text-xs text-neutral-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-neutral-400 tracking-wide mb-3">
                    Architecture
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.architecture?.map((arch) => (
                      <span
                        key={arch}
                        className="px-3 py-1 border border-white/10 rounded-full text-xs text-neutral-500"
                      >
                        {arch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-2 flex flex-col gap-3 pt-6 sm:flex-row md:mt-auto md:gap-4 md:pt-8">
                {project.isClosedSource ? (
                  <div className="flex min-h-14 flex-1 items-center justify-center gap-3 border border-white/5 bg-neutral-800 py-4 text-center font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 cursor-not-allowed">
                    <ProjectLogo type={project.logoType} />
                    {project.linkText || "Closed Source"}
                  </div>
                ) : (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-14 flex-1 items-center justify-center gap-3 bg-white py-4 text-center font-mono text-xs font-bold uppercase tracking-widest text-black transition-colors cursor-pointer hover:bg-slate-200"
                  >
                    <ProjectLogo type={project.logoType} />
                    {project.linkText || "View Project Website"}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function ProjectLogo({ type }) {
  switch (type) {
    case "github":
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "codeberg":
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.983 0a12.206 12.206 0 00-12.205 12.205 12.206 12.206 0 0012.205 12.206 12.206 12.206 0 0012.206-12.206A12.206 12.206 0 0011.983 0zM10.37 18.528c-2.454-.257-4.526-2.14-5.26-4.54l5.26 1.151zm6.27-2.645l-4.226-4.226 5.86-1.282c-.114 2.262-.757 4.314-1.634 5.508zm-5.06-9.157l1.353 1.353-5.86 1.282c1.178-1.543 2.802-2.33 4.507-2.635z" />
        </svg>
      );
    case "website":
      return (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    default:
      return null;
  }
}
