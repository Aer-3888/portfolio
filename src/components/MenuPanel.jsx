import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./layout/LanguageSwitcher";

export default function MenuPanel({ isOpen, onClose, navItems = [] }) {
  const { t, i18n } = useTranslation();
  const cvUrl = `${import.meta.env.BASE_URL}cv${i18n.language === "fr" ? "" : "_en"}.pdf`;
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-ink/60 backdrop-blur-md z-[1190]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed top-0 right-0 z-[1200] flex h-screen w-full flex-col justify-between overflow-y-auto border-l border-ground/5 bg-band/95 px-6 pb-[calc(var(--safe-bottom)+1.5rem)] pt-[calc(var(--safe-top)+1.5rem)] shadow-2xl sm:w-[380px] sm:max-w-[90vw] sm:p-12"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col gap-10 sm:gap-12">
              <div className="flex items-center justify-between">
                <span className="text-sm tracking-tight text-ground/65">Théo Phan</span>
                <button
                  type="button"
                  className="group flex items-center gap-2 text-ground/40 hover:text-ground transition-colors cursor-pointer"
                  onClick={onClose}
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] font-mono">{t("menu.close")}</span>
                  <span className="text-lg group-hover:rotate-90 transition-transform duration-150">
                    ×
                  </span>
                </button>
              </div>

              <nav className="flex flex-col gap-3 sm:gap-5">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    custom={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.1 + index * 0.08, duration: 0.4, ease: "easeOut" },
                    }}
                    exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                    className="group relative text-left py-2 cursor-pointer"
                    onClick={() => {
                      if (typeof item.onClick === "function") item.onClick();
                      if (typeof onClose === "function") onClose();
                    }}
                    aria-current={item.isActive ? "page" : undefined}
                  >
                    <span
                      className={`relative z-10 font-display text-4xl leading-none tracking-[-0.02em] transition-colors sm:text-5xl ${item.isActive ? "text-ground" : "text-ground/75 group-hover:text-ground"}`}
                    >
                      {item.label}
                    </span>
                    <motion.div className="absolute left-0 bottom-0 h-[1px] bg-ground/20 w-0 group-hover:w-full transition-all duration-500" />
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 border-t border-ground/5 pt-8">
              <LanguageSwitcher className="text-ground/70" />
              <a
                href={cvUrl}
                download
                className="w-fit text-sm text-ground/70 underline decoration-ground/30 underline-offset-8 transition-colors hover:text-ground hover:decoration-ground"
              >
                {t("menu.downloadCv")}
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
