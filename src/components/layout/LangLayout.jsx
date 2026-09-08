import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { getLangFromPath } from "../../i18n/localizePath";

export default function LangLayout() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const lang = getLangFromPath(location.pathname);

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang, i18n]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-none focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:text-ground"
      >
        {t("skipToContent")}
      </a>
      <div id="main-content" tabIndex={-1}>
        <Outlet />
      </div>
    </>
  );
}
