import { useTranslation } from "react-i18next";
import useLocalizedNavigate from "../i18n/useLocalizedNavigate";

export default function HomeButton({ className = "", label = null, onClick }) {
  const navigate = useLocalizedNavigate();
  const { t } = useTranslation();
  const handle = onClick ?? (() => navigate("/"));

  const defaultClass =
    "flex items-center gap-2 rounded-full border border-black/15 bg-[#f1eee7] px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#171717] shadow-[0_4px_18px_rgba(0,0,0,0.18)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60 focus-visible:ring-offset-2 cursor-pointer";

  return (
    <button type="button" onClick={handle} className={`${defaultClass} ${className}`}>
      {label ? (
        label
      ) : (
        <>
          <span className="text-lg">←</span>
          <span className="hidden sm:inline">{t("nav.home")}</span>
        </>
      )}
    </button>
  );
}
