import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import vi from "./locales/vi";

export const defaultNS = "translation";
export const resources = {
  vi: { translation: vi },
  en: { translation: en },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
