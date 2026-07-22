import { useTranslation } from "react-i18next";
import { PROJECTS } from "../config/siteData";

// Merge language-neutral project structure (siteData) with the translated
// prose for the active language (projects namespace), preserving order.
export default function useProjects() {
  const { t } = useTranslation("projects");
  return PROJECTS.map((p) => ({
    ...p,
    ...t(`items.${p.id}`, { returnObjects: true }),
  }));
}
