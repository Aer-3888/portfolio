import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLangFromPath } from "../../i18n/localizePath";

export default function LangLayout() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const lang = getLangFromPath(location.pathname);

  useEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang, i18n]);

  return <Outlet />;
}
