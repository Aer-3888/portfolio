import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const PROJECT_ACCENTS = {
  "01": "#ffca45",
  "09": "#f04d2f",
  "03": "#b9d878",
  "10": "#2356d8",
  "04": "#9fc5d1",
  "05": "#c4b6d9",
  "02": "#ef9478",
  "06": "#79aa98",
  "07": "#dbb266",
  "08": "#c9c1b5",
};

function RichText({ text, className }) {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);

  return (
    <p className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-current">
              {part.slice(2, -2)}
            </strong>
          );
        }

        if (part.startsWith("__") && part.endsWith("__")) {
          return <u key={index}>{part.slice(2, -2)}</u>;
        }

        return part;
      })}
    </p>
  );
}

function DetailList({ label, items }) {
  if (!items?.length) return null;

  return (
    <div className="border-t border-white/20 pt-4">
      <p className="mb-3 text-xs text-white/40">{label}</p>
      <p className="max-w-xl text-sm leading-relaxed text-[#f1eee7] md:text-base">
        {items.map((item, index) => (
          <span key={item}>
            <span>{item}</span>
            {index < items.length - 1 && <span aria-hidden="true">, </span>}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function ProjectDetails({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const scrollRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    };

    const previousFocus = document.activeElement;
    const focusTimer = window.setTimeout(() => {
      modalRef.current?.querySelector("button")?.focus();
    }, 100);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
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

  const accent = PROJECT_ACCENTS[project.id] ?? "#c9c1b5";
  const hasExternalLink = project.url && project.url !== "#" && !project.isClosedSource;
  const storySections = [
    { label: "Problem", text: project.problem },
    { label: "Approach", text: project.approach },
    { label: "Result", text: project.result },
  ].filter(({ text }) => text);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: prefersReduced ? 0.1 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[2000] overflow-hidden bg-[#f1eee7] text-[#171717]"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="group fixed right-4 top-[calc(var(--safe-top)+1rem)] z-50 grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-[#f1eee7] text-2xl text-black shadow-[0_4px_24px_rgba(0,0,0,0.16)] transition-transform duration-300 hover:rotate-[-8deg] hover:scale-105 md:right-8 md:top-8"
          >
            <span className="transition-transform duration-300 group-hover:rotate-90">×</span>
          </button>

          <div
            ref={scrollRef}
            data-lenis-prevent
            className="h-full overflow-y-auto overscroll-contain"
          >
            <article>
              <header className="grid min-h-[100svh] md:grid-cols-12">
                <div className="order-2 flex flex-col border-black/20 px-5 py-12 sm:px-8 md:order-1 md:col-span-5 md:border-r md:px-12 md:pb-14 md:pt-32 lg:px-16">
                  <div className="mb-12 flex items-center justify-between gap-4 text-xs text-black/45">
                    <span>{project.type}</span>
                    <span>{project.year}</span>
                  </div>

                  <h2
                    id="project-detail-title"
                    className="font-serif text-[clamp(4.5rem,8vw,8.5rem)] leading-[0.74] tracking-[-0.045em]"
                  >
                    {project.title}
                  </h2>

                  <RichText
                    text={project.description}
                    className="mt-10 max-w-xl text-base leading-relaxed text-black/65 md:text-lg"
                  />

                  {project.role && (
                    <div className="mt-10 border-t border-black/20 pt-4">
                      <p className="text-xs text-black/40">Role</p>
                      <p className="mt-2 text-sm text-black/75">{project.role}</p>
                    </div>
                  )}

                  <div className="mt-12 md:mt-auto md:pt-12">
                    {hasExternalLink ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex cursor-pointer items-center gap-4 border-b border-black pb-1 text-sm text-black"
                      >
                        {project.linkText || "Open project"}
                        <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <p className="text-sm text-black/45">
                        {project.linkText || "Personal project"}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="relative order-1 min-h-[58svh] p-4 pt-[calc(var(--safe-top)+5rem)] sm:p-6 sm:pt-[calc(var(--safe-top)+5.5rem)] md:order-2 md:col-span-7 md:min-h-screen md:p-10"
                  style={{ backgroundColor: accent }}
                >
                  <div className="relative h-full min-h-[50svh] overflow-hidden bg-[#171717] md:min-h-0">
                    <img
                      src={project.img}
                      alt={project.title}
                      loading="eager"
                      fetchPriority="high"
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/[0.04]" />
                    {project.imageCredit && (
                      <span className="absolute bottom-3 left-4 text-[10px] text-white/75 [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]">
                        {project.imageCredit}
                      </span>
                    )}
                  </div>
                </div>
              </header>

              {storySections.length > 0 && (
                <section className="border-y border-black/20 px-5 py-20 sm:px-8 md:px-12 md:py-28 lg:px-16">
                  <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-3 md:gap-10">
                    {storySections.map(({ label, text }) => (
                      <div key={label} className="border-t border-black/20 pt-5">
                        <h3 className="mb-8 font-serif text-3xl leading-none md:text-4xl">
                          {label}
                        </h3>
                        <RichText
                          text={text}
                          className="text-sm leading-relaxed text-black/60 md:text-base"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="bg-[#171717] px-5 py-20 text-[#f1eee7] sm:px-8 md:px-12 md:py-28 lg:px-16">
                <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-12 md:gap-10">
                  <h3 className="font-serif text-5xl leading-[0.86] tracking-[-0.025em] md:col-span-4 md:text-7xl">
                    The technical bits.
                  </h3>
                  <div className="grid gap-10 md:col-span-8 md:grid-cols-2">
                    <DetailList label="Built with" items={project.tags} />
                    <DetailList label="Tools" items={project.tools} />
                    <DetailList label="Architecture" items={project.architecture} />
                  </div>
                </div>
              </section>
            </article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
