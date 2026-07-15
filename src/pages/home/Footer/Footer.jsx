import { memo } from "react";
import { EMAIL, SOCIALS } from "../../../config/siteData";

function Footer() {
  return (
    <footer id="contact" className="bg-[#f1eee7] text-[#121212]">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 md:px-12 md:py-24">
        <div className="grid gap-14 md:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.5fr)] md:items-end md:gap-24">
          <a
            href={"mailto:" + EMAIL}
            className="group inline-flex w-fit max-w-full cursor-pointer items-center gap-3 font-serif text-[clamp(2rem,5vw,5.5rem)] leading-[0.9] tracking-[-0.045em] transition-colors hover:text-[#2356d8]"
          >
            <span className="break-all">{EMAIL}</span>
            <span className="shrink-0 text-[0.55em] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>

          <div className="space-y-8 text-sm leading-relaxed">
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#121212]/55">
              <p>Rennes, France</p>
              <p>Summer 2027 internship</p>
            </div>
            <p>CS engineering @ INSA Rennes</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer underline decoration-[#121212]/30 underline-offset-4 transition-colors hover:decoration-[#121212]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
