import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendContactEmail } from "./sendEmail";

export default function ContactTerminal() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, success
  const [errorMsg, setErrorMsg] = useState("");
  const [ticketID, setTicketID] = useState("");

  // Generate random Ticket ID
  useEffect(() => {
    setTicketID(Math.random().toString(36).slice(2, 11).toUpperCase());
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const now = new Date();
      const timeString = now.toLocaleString();
      await sendContactEmail({
        name: formState.name,
        email: formState.email,
        message: formState.message,
        time: timeString,
      });
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setFormState({ name: "", email: "", message: "" });
        setTicketID(Math.random().toString(36).slice(2, 11).toUpperCase());
      }, 3000);
    } catch (err) {
      // Show error message
      console.error("Email send failed:", err);
      const msg =
        err && err.message
          ? err.message
          : "Email service is currently unavailable. Please try again later.";
      setErrorMsg(msg);
      setStatus("error");
    }
  }

  return (
    <div className="w-full h-full bg-neutral-900/50 p-6 md:p-12 flex flex-col font-mono text-sm relative overflow-hidden text-neutral-200">
      {/* Corner graphic */}
      <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
        <div className="w-32 h-32 border-r-2 border-t-2 border-white/20 rounded-tr-3xl" />
      </div>

      {/* Header: Title & Ticket ID */}
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4 shrink-0 z-10 relative">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase">
            New Transmission
          </h2>
          <span className="text-neutral-500 text-[10px] tracking-widest uppercase">
            Protocol V.2026 // Secure Uplink
          </span>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-orange-500 text-[10px] font-bold">TICKET_ID</div>
          <div className="text-white text-xl tracking-widest">#{ticketID}</div>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 relative z-10">
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Input */}
          <div className="group relative">
            <label className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-2 group-focus-within:text-orange-500 transition-colors">
              01 // Sender_Identity
            </label>
            <input
              required
              type="text"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              placeholder="ENTER FULL NAME..."
              className="w-full bg-black/40 border border-white/10 p-4 text-white focus:outline-none focus:border-orange-500 transition-colors rounded-sm placeholder:text-neutral-700"
            />
            {/* Corner Decoration */}
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-focus-within:border-orange-500 transition-colors pointer-events-none" />
          </div>

          {/* Email Input */}
          <div className="group relative">
            <label className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-2 group-focus-within:text-orange-500 transition-colors">
              02 // Return_Frequency
            </label>
            <input
              required
              type="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              placeholder="ENTER EMAIL ADDRESS..."
              className="w-full bg-black/40 border border-white/10 p-4 text-white focus:outline-none focus:border-orange-500 transition-colors rounded-sm placeholder:text-neutral-700"
            />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-focus-within:border-orange-500 transition-colors pointer-events-none" />
          </div>
        </div>

        {/* Row 2: Message Area */}
        <div className="flex-1 flex flex-col group relative min-h-[200px]">
          <label className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-2 group-focus-within:text-orange-500 transition-colors">
            03 // Data_Payload
          </label>
          <div className="flex-1 relative">
            {/* Decoration: Line Numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-8 border-r border-white/5 flex flex-col items-center py-4 text-[10px] text-neutral-800 font-mono select-none">
              <span>01</span>
              <span>02</span>
              <span>03</span>
              <span>04</span>
              <span>05</span>
            </div>
            <textarea
              required
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              placeholder="INITIATE MESSAGE SEQUENCE..."
              className="w-full h-full bg-black/40 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500 transition-colors rounded-sm resize-none placeholder:text-neutral-700"
            />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="h-16 shrink-0 flex items-center justify-end border-t border-white/5 mt-2 pt-6">
          <button
            disabled={status !== "idle"}
            type="submit"
            className="relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden clip-path-slant cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              {status === "idle" && (
                <>
                  Transmit Data <span className="text-lg">→</span>
                </>
              )}
              {status === "sending" && "Uploading..."}
              {status === "success" && "Sent!"}
            </span>

            {/* Loading Bar Animation */}
            {status === "sending" && (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
                className="absolute inset-0 bg-neutral-300 z-0 opacity-50"
              />
            )}
          </button>
        </div>
      </form>

      {/* Sent Confirmation Stamp */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ rotate: -10, opacity: 0, scale: 2 }}
              animate={{ rotate: -5, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="border-4 border-green-500 p-8 text-center"
            >
              <div className="text-5xl font-black text-green-500 uppercase tracking-tighter">
                SENT
              </div>
              <div className="text-xs text-green-500 uppercase tracking-widest mt-2">
                Ticket #{ticketID} Filed
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Error Overlay */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="bg-red-900/90 border border-red-500 p-6 rounded-md max-w-xl text-center">
              <div className="text-2xl font-bold text-red-400 mb-2">Service Unavailable</div>
              <div className="text-sm text-red-200 mb-4">
                {errorMsg || "The email service is currently unavailable. Please try again later."}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setStatus("idle");
                    setErrorMsg("");
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
