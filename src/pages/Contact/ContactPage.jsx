import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavButtons from "../../components/NavButtons";
import ContactTerminal from "./ContactTerminal"; 

const SOCIALS = [
  { label: "GitHub", url: "https://github.com/Aer-3888", id: "GH-REP" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/theophanquochuy/", id: "LN-PRO" },
  { label: "Instagram", url: "https://www.instagram.com/phan.theo.huy/", id: "IG-VIS" },
];

export default function ContactPage() {
  const navigate = useNavigate();
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "Home", onClick: () => navigate("/") },
    { label: "Projects", onClick: () => navigate("/", { state: { scrollTo: "projects" } }) },
    { label: "About", onClick: () => navigate("/about") },
  ];

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText("theo.phan.quoc.huy@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Ignore clipboard failures silently
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 relative overflow-y-auto overflow-x-hidden font-sans selection:bg-orange-500/30 text-white">
      
      {/* Background (With Grid) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* Noise */}
         <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
         
         {/* Grid Pattern */}
         <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }} 
         />
         
         {/* Vignette */}
         <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/50 to-neutral-950" />
      </div>

      {/* Home Button */}
      <div className="fixed top-8 left-6 md:left-10 z-[1200]">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/80 text-xs font-mono uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-colors cursor-pointer mix-blend-difference"
          >
            <span className="text-lg">←</span>
            <span className="hidden sm:inline ">Home</span>
          </button>
      </div>

      {/* Other Navigation Buttons */}
      <NavButtons items={navItems} className="fixed top-8 right-10 z-[1200] flex gap-8 text-white mix-blend-difference" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-24 md:p-8 md:pt-20">
        
        {/* System Grid Container */}
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-6xl bg-black/40 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-white/10 grid grid-cols-1 md:grid-cols-12 min-h-[700px]"
        >
             
             {/* Left Panel */}
             <div className="md:col-span-4 bg-black/20 border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col justify-between relative">
                
                {/* Decoration Lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-transparent opacity-50" />
                
                {/* Top Section */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">
                            My<br/>Details
                        </h1>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-mono text-[10px] text-green-500 tracking-widest uppercase">
                                Studying // Looking for internships
                            </span>
                        </div>
                    </div>

                    {/* Email Block */}
                    <div className="group cursor-pointer relative" onClick={handleCopyEmail}>
                        <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-1 flex justify-between">
                            <span>01 // Direct_Line</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500">COPY</span>
                        </div>
                      {copied && (
                        <div className="absolute top-0 right-0 -translate-y-6 bg-white/10 text-white text-xs px-3 py-1 rounded-md shadow-md backdrop-blur-sm">
                          Copied!
                        </div>
                      )}
                        <div className="text-white text-sm md:text-base font-bold break-all border-l-2 border-white/20 pl-3 group-hover:border-orange-500 group-hover:bg-white/5 transition-all py-2">
                            theo.phan.quoc.huy<br/>@gmail.com
                        </div>
                    </div>

                    {/* Location Block */}
                    <div>
                        <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-1">
                            02 // Coordinates
                        </div>
                        <div className="text-white text-sm font-medium border-l-2 border-white/20 pl-3 py-1">
                            Brittany, France<br/>
                            <span className="text-neutral-400 font-mono text-xs">{time} (CET)</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Socials */}
                <div className="mt-12 md:mt-0">
                     <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
                        03 // Ext_Uplinks
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {SOCIALS.map((social) => (
                            <a 
                                key={social.label} 
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-3 bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all"
                            >
                                <span className="font-bold text-sm uppercase tracking-wider">{social.label}</span>
                                <span className="font-mono text-[9px] opacity-50 group-hover:opacity-100">{social.id} ↗</span>
                            </a>
                        ))}
                    </div>
                </div>
             </div>

             {/* Right Panel */}
             <div className="md:col-span-8 bg-transparent relative">
                <ContactTerminal />
             </div>

        </motion.div>
      </div>
    </div>
  );
}