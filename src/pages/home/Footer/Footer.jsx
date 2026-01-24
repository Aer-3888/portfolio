import CipherText from "./CipherText";
import Barcode from "./Barcode";
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
            scale: 0.98
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
    <footer className="fixed bottom-0 left-0 w-full h-[100vh] bg-white z-0 flex flex-col justify-between">
      
      {/* Mobile View*/}
      <div className="flex md:hidden w-full h-full flex-col bg-white overflow-hidden justify-between">
        
        {/* 1. Top Section: Headline */}
        <div className="w-full p-8 pt-28 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-black text-neutral-900 tracking-tight uppercase mb-2">
                PORTFOLIO VERSION
            </h3>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                V. 2026 © EDITION
            </span>
        </div>

        {/* 2. Middle Section */}
        <div className="flex-1 w-full flex flex-col justify-center px-4 pb-8">
          <TechButton />
        </div>

        {/* 3. Bottom Section: Socials and Barcode */}
        <div className="w-full border-t border-neutral-100 bg-neutral-50/50">
            {/* Social Grid */}
            <div className="grid grid-cols-3 divide-x divide-neutral-100 border-b border-neutral-100">
                {Object.keys(socialUrls).map((platform) => (
                    <a key={platform} href={socialUrls[platform]} className="py-6 flex items-center justify-center hover:bg-neutral-100 transition-colors">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-800">
                            {platform}
                        </span>
                    </a>
                ))}
            </div>
            
            {/* Barcode Footer */}
            <div className="w-full py-6 flex flex-col items-center justify-center gap-2 opacity-30">
                <Barcode className="h-8" />
                <span className="font-mono text-[8px] text-neutral-400">ID: Aer-3888</span>
            </div>
        </div>
      </div>
      
      {/* Desktop View */}
      <div className="hidden md:flex w-full h-full flex-col justify-between px-6 md:px-12 py-12">
        <div className="w-full flex items-start border-b border-neutral-200 pb-6">
          <span className="font-mono text-sm text-neutral-400 tracking-widest uppercase">
            Version 2026 © Edition
          </span>
        </div>

        <div className="flex-1 flex items-center w-full overflow-hidden">
          <div className="w-full z-10 mix-blend-hard-light">
            <CipherText />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-end pt-8 z-10 bg-white">
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400 font-mono text-xs uppercase tracking-widest">
              Get in Touch @
            </span>
            <a
              href="mailto:theo.phan.quoc.huy@gmail.com"
              className="text-2xl lg:text-4xl font-bold text-neutral-900 hover:text-orange-600 transition-colors tracking-tight"
            >
              theo.phan.quoc.huy@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-end gap-6">
            <div className="hidden md:block">
              <Barcode />
            </div>

            <div className="flex gap-6">
              {Object.keys(socialUrls).map((link) => (
                <a
                  key={link}
                  href={socialUrls[link]}
                  className="relative group overflow-hidden"
                >
                  <span className="block font-mono text-sm text-neutral-900 group-hover:-translate-y-full transition-transform duration-300">
                    {link}
                  </span>
                  <span className="absolute top-0 left-0 block font-mono text-sm text-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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