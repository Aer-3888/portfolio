import CipherText from "./CipherText";
import { motion } from "framer-motion";

const socialUrls = {
  Instagram: "https://www.instagram.com/phan.theo.huy/",
  GitHub: "https://github.com/Aer-3888",
  LinkedIn: "https://www.linkedin.com/in/theophanquochuy/",
};

function TechButton() {
  return (
    <a href="mailto:theo.phan.quoc.huy@gmail.com" className="block w-full h-full max-h-[50vh]">
      <motion.div
        className="relative w-full h-full bg-neutral-900 flex flex-col items-center justify-center overflow-hidden group"
        initial={{ clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)" }}
        whileTap={{
          clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)",
          scale: 0.98,
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Background Noise Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

        {/* Central Icon */}
        <span className="text-8xl text-white mb-2 relative z-10 group-active:scale-110 transition-transform duration-200">
          ✉
        </span>

        {/* Infinite Marquee Text */}
        <div className="w-full overflow-hidden relative z-10 border-y border-white/20 py-5 bg-white/5 backdrop-blur-sm mt-18">
          <motion.div
            className="whitespace-nowrap flex gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
          >
            {/* Duplicated text for seamless loop */}
            <span className="text-xl font-mono font-bold text-[#FFE400] tracking-[0.2em] uppercase">
              Start New Quest /// Send Mail /// Start New Quest /// Send Mail ///
            </span>
            <span className="text-xl font-mono font-bold text-[#FFE400] tracking-[0.2em] uppercase">
              Start New Quest /// Send Mail /// Start New Quest /// Send Mail ///
            </span>
          </motion.div>
        </div>

        {/* Static Bottom Label */}
        <span className="absolute bottom-12 font-mono text-[10px] text-neutral-500 uppercase tracking-widest z-10">
          Click to Contact Me
        </span>
      </motion.div>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-[50vh] bg-white z-0 flex flex-col justify-between">
      {/* Mobile View */}
      <div className="flex md:hidden w-full h-full flex-col px-6 py-8 bg-white">
        {/* Top: version */}
        <div className="border-b border-neutral-200 pb-4">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
            V. 2026 © Edition
          </span>
        </div>

        {/* Centre: name */}
        <div className="flex-1 flex items-center">
          <h2 className="text-5xl font-black text-neutral-900 tracking-tighter uppercase leading-none">
            Théo
            <br />
            <span className="text-neutral-300">Phan.</span>
          </h2>
        </div>

        {/* Bottom: email + socials */}
        <div className="flex flex-col gap-3">
          <a
            href="mailto:theo.phan.quoc.huy@gmail.com"
            className="text-sm font-bold text-neutral-900 hover:text-orange-600 transition-colors tracking-tight"
          >
            theo.phan.quoc.huy@gmail.com
          </a>
          <div className="flex gap-6">
            {Object.keys(socialUrls).map((platform) => (
              <a
                key={platform}
                href={socialUrls[platform]}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex w-full h-full flex-col justify-between px-6 md:px-12 py-8">
        <div className="w-full flex items-start border-b border-neutral-200 pb-4">
          <span className="font-mono text-sm text-neutral-400 tracking-widest uppercase">
            Version 2026 © Edition
          </span>
        </div>

        <div className="flex-1 flex items-center w-full overflow-hidden py-4">
          <div className="w-full z-10 mix-blend-hard-light">
            <CipherText />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-end pt-4 z-10 bg-white">
          <div className="flex flex-col gap-1">
            <span className="text-neutral-400 font-mono text-[10px] uppercase tracking-widest">
              Get in Touch @
            </span>
            <a
              href="mailto:theo.phan.quoc.huy@gmail.com"
              className="text-xl lg:text-3xl font-bold text-neutral-900 hover:text-orange-600 transition-colors tracking-tight"
            >
              theo.phan.quoc.huy@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-end gap-4">
            <a
              href="https://github.com/Aer-3888"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block opacity-50 hover:opacity-100 transition-opacity cursor-pointer group"
              title="Scan or click to visit GitHub"
            >
              <img
                src="https://barcode.tec-it.com/barcode.ashx?data=https://github.com/Aer-3888&code=Code128&translate-esc=on"
                alt="Scan barcode to visit GitHub"
                className="h-10 group-hover:scale-105 transition-transform"
              />
            </a>

            <div className="flex gap-6">
              {Object.keys(socialUrls).map((link) => (
                <a key={link} href={socialUrls[link]} className="relative group overflow-hidden">
                  <span className="block font-mono text-xs text-neutral-900 group-hover:-translate-y-full transition-transform duration-300">
                    {link}
                  </span>
                  <span className="absolute top-0 left-0 block font-mono text-xs text-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {link}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
