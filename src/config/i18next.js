import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = require("../resources").default;

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});
