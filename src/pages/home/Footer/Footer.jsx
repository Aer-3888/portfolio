import CipherText from "./CipherText";
import Barcode from "./Barcode";

// Footer Component
export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-[100vh] bg-white z-0 flex flex-col justify-between px-6 md:px-12 py-12">
      {/* Top: version */}
      <div className="w-full flex  items-start border-b border-neutral-200 pb-6">
        <span className="font-mono text-sm text-neutral-400 tracking-widest uppercase">
          Version 2026 © Edition
        </span>
      </div>

      {/* Center: The Decryption */}
      <div className="flex-1 flex items-center w-full overflow-hidden">
        <div className="w-full z-10 mix-blend-hard-light">
          <CipherText />
        </div>
      </div>

      {/* Bottom: Contact & Socials */}
      <div className="w-full flex flex-col md:flex-row justify-between items-end pt-8 z-10 bg-white">
        {/* Left: Contact Block */}
        <div className="flex flex-col gap-2">
          <span className="text-neutral-400 font-mono text-xs uppercase tracking-widest">
            Get in Touch @
          </span>
          <a
            href="mailto:theo.phan.quoc.huy@gmail.com"
            className="text-4xl font-bold text-neutral-900 hover:text-orange-600 transition-colors tracking-tight"
          >
            theo.phan.quoc.huy@gmail.com
          </a>
        </div>

        {/* Right: Barcode & Socials */}
        <div className="flex flex-col items-end gap-6">
          {/* The Barcode Visual */}
          <div className="hidden md:block">
            <Barcode />
          </div>

          <div className="flex gap-6">
            {["Instagram", "GitHub", "LinkedIn"].map((link) => {
              const urls = {
                Instagram: "https://www.instagram.com/phan.theo.huy/",
                GitHub: "https://github.com/Aer-3888",
                LinkedIn: "https://www.linkedin.com/in/theophanquochuy/",
              };
              return (
                <a
                  key={link}
                  href={urls[link]}
                  className="relative group overflow-hidden"
                >
                  <span className="block font-mono text-sm text-neutral-900 group-hover:-translate-y-full transition-transform duration-300">
                    {link}
                  </span>
                  <span className="absolute top-0 left-0 block font-mono text-sm text-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {link}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
