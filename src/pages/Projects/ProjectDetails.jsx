import { motion, AnimatePresence } from "framer-motion";

export default function ProjectDetails({ project, isOpen, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-0 md:p-12 overflow-hidden">
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full md:max-w-[1300px] md:max-h-[85vh] md:h-auto bg-neutral-900 border-0 md:border md:border-white/10 overflow-hidden flex flex-col md:flex-row shadow-[0_0_80px_rgba(0,0,0,0.7)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group cursor-pointer"
            >
              <span className="text-xl text-white group-hover:rotate-90 transition-transform duration-300">
                ✕
              </span>
            </button>

            {/* Left side: Image/Media */}
            <div className="w-full md:w-[60%] h-64 md:h-auto overflow-hidden relative group/img">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Right side: Content */}
            <div className="w-full md:w-[40%] p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] px-2.5 py-1 border border-orange-500/40 bg-orange-500/10 text-orange-400">
                    {project.type}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-[0.3em]">
                    {project.category} / {project.year}
                  </span>
                </div>
                <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-4">
                  {project.title}
                </h2>
                <p className="text-neutral-300 leading-relaxed text-lg">{project.description}</p>
              </div>

              {/* Technical Profile Section */}
              <div className="flex flex-col gap-6 bg-white/[0.02] border-l-2 border-orange-500/50 p-6">
                <div>
                  <h4 className="font-mono text-[10px] text-orange-500 uppercase tracking-[0.25em] mb-2">
                    Core Insight
                  </h4>
                  <p className="text-[14px] text-neutral-100 leading-relaxed font-medium">
                    {project.insight}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-orange-500 uppercase tracking-[0.25em] mb-2">
                    Main Challenge
                  </h4>
                  <p className="text-[14px] text-neutral-400 leading-relaxed italic">
                    "{project.challenge}"
                  </p>
                </div>
              </div>

              {/* Tags Section */}
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <h4 className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-white/5 border border-white/[0.15] rounded-sm text-[11px] font-mono text-white/80 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                      Tools
                    </h4>
                    <div className="flex flex-col gap-1">
                      {project.tools?.map((tool) => (
                        <span key={tool} className="text-sm font-mono text-neutral-200">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                      Architecture
                    </h4>
                    <div className="flex flex-col gap-1">
                      {project.architecture?.map((arch) => (
                        <span key={arch} className="text-sm font-mono text-neutral-200">
                          {arch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-8 flex gap-4">
                {project.isClosedSource ? (
                  <div className="flex-1 bg-neutral-800 text-neutral-500 font-mono text-xs font-bold uppercase py-4 tracking-widest text-center flex items-center justify-center gap-3 border border-white/5 cursor-not-allowed">
                    <ProjectLogo type={project.logoType} />
                    {project.linkText || "Closed Source"}
                  </div>
                ) : (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white text-black font-mono text-xs font-bold uppercase py-4 tracking-widest hover:bg-orange-500 hover:text-white transition-colors cursor-pointer text-center flex items-center justify-center gap-3"
                  >
                    <ProjectLogo type={project.logoType} />
                    {project.linkText || "View Project Website"}
                  </a>
                )}

                {!project.isClosedSource && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 border border-white/20 hover:border-white transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <span className="text-xl">↗</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
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
    case "casestudy":
      return (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    default:
      return null;
  }
}
