import { memo } from "react";
import CipherText from "./CipherText";
import { SOCIALS } from "../../../config/siteData";
import ArcadeMachine from "../../Contact/ArcadeMachine";

function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-neutral-950 py-16 md:py-24 border-t border-white/5 text-white">
      {/* Desktop & Tablet View */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left: Communication & Details */}
        <div className="flex-1 space-y-12">
          <div className="space-y-4">
            <span className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.4em] block font-bold">
              Inquiries
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8]">
              Get In
              <br />
              <span className="text-neutral-700">Touch.</span>
            </h1>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest font-bold">
                Email
              </span>
              <a
                href="mailto:theo.phan.quoc.huy@gmail.com"
                className="text-xl md:text-2xl font-bold hover:text-orange-500 transition-colors tracking-tight"
              >
                theo.phan.quoc.huy@gmail.com
              </a>
            </div>

            <div className="flex gap-12 pt-4">
              <div className="space-y-2">
                <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest font-bold">
                  Location
                </span>
                <div className="text-xs font-bold uppercase tracking-wide">Rennes, France</div>
              </div>
              <div className="space-y-2">
                <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest font-bold">
                  © 2026
                </span>
                <div className="text-xs font-bold uppercase tracking-wide">Portfolio V2</div>
              </div>
            </div>
          </div>

          {/* Socials & Barcode */}
          <div className="pt-12 flex justify-between items-end">
            <div className="space-y-4">
              <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest block font-bold">
                Social Channels
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
            
            <a
              href="https://github.com/Aer-3888"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block opacity-30 hover:opacity-100 transition-opacity"
            >
              <img
                src="https://barcode.tec-it.com/barcode.ashx?data=https://github.com/Aer-3888&code=Code128&translate-esc=on&forecolor=ffffff&backcolor=00000000"
                alt="Barcode"
                className="h-8"
              />
            </a>
          </div>
        </div>

        {/* Right: Arcade Game — hidden on small screens */}
        <div className="hidden lg:flex flex-1 bg-neutral-900/30 rounded-2xl border border-white/5 min-h-[400px]">
          <ArcadeMachine />
        </div>
      </div>

      {/* Cipher Text Background Reveal (Full Width) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5 flex items-center justify-center z-0">
        <div className="w-full mix-blend-overlay">
          <CipherText />
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
