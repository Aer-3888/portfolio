import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../locales/en/common.json";
import enHome from "../locales/en/home.json";
import enContact from "../locales/en/contact.json";
import enProjects from "../locales/en/projects.json";
import enAbout from "../locales/en/about.json";
import enSeo from "../locales/en/seo.json";

import frCommon from "../locales/fr/common.json";
import frHome from "../locales/fr/home.json";
import frContact from "../locales/fr/contact.json";
import frProjects from "../locales/fr/projects.json";
import frAbout from "../locales/fr/about.json";
import frSeo from "../locales/fr/seo.json";

export const SUPPORTED_LANGS = ["en", "fr"];
export const DEFAULT_LANG = "en";

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    contact: enContact,
    projects: enProjects,
    about: enAbout,
    seo: enSeo,
  },
  fr: {
    common: frCommon,
    home: frHome,
    contact: frContact,
    projects: frProjects,
    about: frAbout,
    seo: frSeo,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  defaultNS: "common",
  ns: ["common", "home", "contact", "projects", "about", "seo"],
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
