import { memo } from "react";
import { motion } from "framer-motion";
import { STATUS_ITEMS } from "../../../config/siteData";

function StatusSection() {
  return (
    <section className="relative w-full bg-paper pt-24 pb-24 px-6 md:px-12 border-t border-stone overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-stone relative z-10">
        {STATUS_ITEMS.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 md:px-10 first:md:pl-0 last:md:pr-0"
          >
            <span className="text-[11px] uppercase tracking-[0.18em] text-pebble">
              {item.label}
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base md:text-lg font-medium text-ink tracking-tight">
                {item.value}
              </h3>
              <p className="text-[13px] text-ash leading-relaxed">{item.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default memo(StatusSection);
