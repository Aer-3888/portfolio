import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SOCIALS } from "../../config/siteData";
import ArcadeMachine from "./ArcadeMachine";
import PageNav from "../../components/layout/PageNav";

export default function ContactPage() {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText("theo.phan.quoc.huy@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_e) {
      // clipboard write failed silently
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 relative overflow-y-auto font-sans text-white flex flex-col items-center py-12 md:py-24 px-6 md:px-12">
      <PageNav currentPath="/contact" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-7xl h-auto lg:min-h-[75vh] grid grid-cols-1 lg:grid-cols-12 bg-neutral-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden rounded-sm border border-white/5"
      >
        {/* Left: Communication & Details */}
        <div className="lg:col-span-5 flex flex-col justify-between p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-white/5 bg-neutral-900">
          <div className="space-y-16">
            <div className="space-y-4">
              <span className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.4em] block font-bold">
                Inquiries
              </span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
                Get In
                <br />
                <span className="text-neutral-600">Touch.</span>
              </h1>
            </div>

            <div className="space-y-10">
              {/* Email Link */}
              <div className="group cursor-pointer block" onClick={handleCopyEmail}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest font-bold">
                    Email
                  </span>
                  <span
                    className={`text-[9px] font-bold text-orange-500 transition-opacity duration-300 ${copied ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  >
                    {copied ? "Copied" : "Copy"}
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-orange-500 transition-colors">
                  theo.phan.quoc.huy@gmail.com
                </div>
              </div>

              {/* Location & Time */}
              <div className="grid grid-cols-2 gap-12 pt-4">
                <div className="space-y-2">
                  <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest font-bold">
                    Location
                  </span>
                  <div className="text-sm font-bold uppercase tracking-wide">Rennes, France</div>
                </div>
                <div className="space-y-2">
                  <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest font-bold">
                    Local Time
                  </span>
                  <div className="text-sm font-bold font-mono tracking-tight text-orange-500">
                    {time}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="pt-12">
            <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest block font-bold mb-4">
              Social Channels
            </span>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-orange-500 transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Arcade Game — desktop only */}
        <div className="hidden lg:flex lg:col-span-7 bg-neutral-950 flex-col">
          <div className="flex-1">
            <ArcadeMachine />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
