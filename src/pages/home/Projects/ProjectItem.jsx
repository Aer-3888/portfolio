import { memo } from "react";

function ProjectItem({ project, isCoarsePointer, onSelect }) {
  const { title, year, services, category, metric } = project;

  if (isCoarsePointer) {
    return (
      <div
        onClick={() => onSelect(project)}
        className="relative w-full border-t border-stone flex items-start justify-between py-6 cursor-pointer active:bg-stone/20 transition-colors"
      >
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-medium tracking-tight text-ink leading-snug">{title}</h3>
          <span className="text-[12px] text-ash">
            {category} · {year}
          </span>
          {metric && <span className="text-[12px] text-ash">{metric}</span>}
        </div>
        <span className="text-pebble text-lg shrink-0 ml-4">→</span>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative w-full border-t border-stone flex flex-col justify-center cursor-pointer py-7"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-0">
        <div className="flex items-baseline gap-5">
          <span className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 mix-blend-difference w-20 shrink-0">
            {category}
          </span>
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mix-blend-difference leading-snug">
            {title}
          </h3>
        </div>

        <div className="flex flex-col md:items-end gap-1 shrink-0">
          <span className="text-[12px] text-neutral-500 mix-blend-difference">{year}</span>
          {metric && (
            <span className="text-[12px] text-neutral-500 mix-blend-difference md:text-right max-w-[18rem]">
              {metric}
            </span>
          )}
        </div>
      </div>

      {/* Reveal via grid-template-rows 0fr -> 1fr: a native CSS transition to
          auto height. No JS height measuring per frame (the old framer
          height:"auto" tween), so the expand stays smooth under the section's
          mix-blend repaints. */}
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr] md:pl-[6.25rem]">
        <div className="overflow-hidden min-h-0 transform-gpu will-change-transform">
          <div className="flex items-center justify-between pt-3 opacity-0 translate-y-1 transition-[transform,opacity] duration-[450ms] delay-[40ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-[13px] text-neutral-500 mix-blend-difference leading-relaxed">
              {services}
            </p>

            <span className="text-white mix-blend-difference text-lg shrink-0 ml-4 -translate-x-2 opacity-0 transition-[transform,opacity] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectItem);
