import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localizePath, stripLang, getLangFromPath } from "../../i18n/localizePath";

const LANGS = ["en", "fr"];

export default function LanguageSwitcher({ className = "" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const active = getLangFromPath(location.pathname);
  const base = stripLang(location.pathname);

  const select = (lang) => {
    if (lang === active) return;
    i18n.changeLanguage(lang);
    navigate(localizePath(base, lang));
  };

  return (
    <div
      className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] ${className}`}
    >
      {LANGS.map((lang, i) => (
        <span key={lang} className="flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden="true" className="opacity-40">
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => select(lang)}
            aria-current={lang === active ? "true" : undefined}
            aria-label={t("language.switchTo", { lng: lang })}
            className={`cursor-pointer transition-opacity ${
              lang === active ? "opacity-100" : "opacity-45 hover:opacity-80"
            }`}
          >
            {t(`language.${lang}`)}
          </button>
        </span>
      ))}
    </div>
  );
}
