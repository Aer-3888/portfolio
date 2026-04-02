import { motion } from "framer-motion";
import { STATUS_ITEMS } from "../../../config/siteData";

export default function StatusSection() {
  return (
    <section className="relative w-full bg-neutral-950 py-32 px-6 md:px-12 border-b border-neutral-900 overflow-hidden">
      {/* Subtle blend gradient from the Hero section above */}
      <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-neutral-900 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 relative z-10">
        {STATUS_ITEMS.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              {item.label}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase">
                {item.value}
              </h3>
              <p className="text-xs font-mono text-neutral-400">{item.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
