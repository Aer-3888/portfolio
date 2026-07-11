import { memo } from "react";
import { SOCIALS, EMAIL } from "../../../config/siteData";

function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full bg-paper py-24 md:py-32 border-t border-stone text-ink"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-16 md:gap-20">
          {/* Get in touch */}
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-pebble">Get in touch</span>
            <a
              href={`mailto:${EMAIL}`}
              className="text-xl md:text-3xl font-medium tracking-tight text-ink hover:text-sumi transition-colors break-all w-fit border-b border-transparent hover:border-stone pb-1"
            >
              {EMAIL}
            </a>
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 border-t border-stone pt-12">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-pebble">Location</span>
              <span className="text-[13px] text-ash">Rennes, France</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-pebble">
                Availability
              </span>
              <span className="text-[13px] text-ash">Summer 2026 internship</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-pebble">Elsewhere</span>
              <div className="flex flex-col gap-1.5">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-ash hover:text-ink transition-colors w-fit"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-pebble">© 2026</span>
              <span className="text-[13px] text-ash">Théo Phan · Portfolio</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
