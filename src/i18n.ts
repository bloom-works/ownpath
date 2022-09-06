import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// TODO: consolidate translation imports
import en_translations from "./translations/en_translations.json";
import es_translations from "./translations/es_translations.json";

const domainLanguageDetector = {
  name: "domainLanguageDetector",

  lookup() {
    const host = window.location.host;
    if (
      host.includes("mipropiasenda") ||
      host.includes("directoriocuidadoscolorado")
    ) {
      return "es";
    }
    return undefined;
  },
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector(domainLanguageDetector);

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    detection: {
      order: ["querystring", "localStorage", "domainLanguageDetector"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "lng",
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false }, // React already does escaping
    resources: {
      en: {
        translation: en_translations,
      },
      es: {
        translation: es_translations,
      },
    },
  });

export default i18n;
