import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localizePath } from "./localizePath";

export default function useLocalizedNavigate() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  return useCallback(
    (path, options) => navigate(localizePath(path, i18n.language), options),
    [navigate, i18n.language]
  );
}
