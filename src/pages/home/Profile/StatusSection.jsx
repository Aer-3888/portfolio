import { memo } from "react";
import { motion } from "framer-motion";
import { STATUS_ITEMS } from "../../../config/siteData";

function StatusSection() {
  return (
    <section className="relative w-full bg-neutral-950 pt-0 pb-24 px-6 md:px-12 border-b border-neutral-900 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-neutral-800/60 relative z-10">
        {STATUS_ITEMS.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 md:px-10 first:md:pl-0 last:md:pr-0"
          >
            <span className="text-[10px] font-mono text-neutral-500 tracking-widest">
              {item.label}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
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

export default memo(StatusSection);
