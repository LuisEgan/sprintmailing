import { EAvailableLanguages } from "components/ToggleLang/ToggleLang";
import { useTheme } from "next-themes";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { IntlProvider } from "rsuite";
import enUS from "rsuite/lib/IntlProvider/locales/en_US";
import esEs from "rsuite/lib/IntlProvider/locales/es_ES";
import { DEFAULT_THEME } from "settings/constants";
import resolveConfig from "tailwindcss/resolveConfig";
import { TailwindConfig } from "tailwindcss/tailwind-config";

import tailwindConfig from "../../../tailwind.config.js";
// @ts-ignore
const fullConfig = resolveConfig({ ...tailwindConfig });
export const { theme: tailwindTheme }: TailwindConfig = fullConfig;

const InAnimation = "animate__fadeIn";
const OutAnimation = "animate__fadeOut";
let initialLoad = true;

const onLoad = (theme: string, setTheme: any) => {
  const deleteTheme = theme === "dark" ? "light" : "dark";
  const sheet = document.getElementById(`${deleteTheme}-theme`);

  if (sheet) {
    sheet.parentNode.removeChild(sheet);
  }
  if (!initialLoad) {
    const layout = document.getElementById("layoutMainContent");
    setTheme(theme);
    if (layout) {
      setTimeout(() => {
        layout.classList.remove("animate__faster");
        layout.classList.add(`${InAnimation}`);
        layout.classList.remove(`${OutAnimation}`);
      }, 500);
    }
  } else {
    initialLoad = false;
  }
};

export const loadStyleSheet = (theme: string, setTheme: any) => {
  if (!initialLoad) {
    const layout = document.getElementById("layoutMainContent");
    if (layout) {
      layout.classList.add("animate__faster");
      layout.classList.add(`${OutAnimation}`);
    }
  }
  const sheet = document.createElement("link");
  sheet.rel = "stylesheet";
  sheet.addEventListener("load", () => onLoad(theme, setTheme));
  sheet.href = `/themes/theme-${theme}.css`;
  sheet.id = `${theme}-theme`;
  document.head.prepend(sheet);
};

const Theme = ({ children }) => {
  const { lang } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>();
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!theme || theme === "system") {
        setTheme(DEFAULT_THEME);
        loadStyleSheet(DEFAULT_THEME, setTheme);
      } else {
        loadStyleSheet(theme, setTheme);
      }
    }
  }, [mounted]);

  return (
    <IntlProvider locale={lang === EAvailableLanguages.es ? esEs : enUS}>
      {children}
    </IntlProvider>
  );
};

export default Theme;
