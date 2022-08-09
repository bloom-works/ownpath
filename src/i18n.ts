import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// TODO: consolidate translation imports
import en_translations from "./translations/en/translations.json";
import es_translations from "./translations/es/translations.json";
import en_pages from "./translations/en/pages.json";
import en_components from "./translations/en/components.json";
import en_common from "./translations/en/common.json";
import es_pages from "./translations/es/pages.json";
import es_components from "./translations/es/components.json";
import es_common from "./translations/es/common.json";

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
      order: ["querystring", "domainLanguageDetector"],
      lookupQuerystring: "lng",
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false }, // React already does escaping
    resources: {
      en: {
        translation: {
          ...en_translations,
          pages: en_pages,
          components: en_components,
          common: en_common,
        },
      },
      es: {
        translation: {
          ...es_translations,
          pages: es_pages,
          components: es_components,
          common: es_common,
        },
      },
    },
  });

export default i18n;
