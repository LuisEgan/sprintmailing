import { useTheme } from "next-themes";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { IntlProvider } from "rsuite";
import esEs from "rsuite/lib/IntlProvider/locales/es_ES";
import enUS from "rsuite/lib/IntlProvider/locales/en_US";
import useTranslation from "next-translate/useTranslation";
import { EAvailableLanguages } from "components/NavBar/NavBar";

const defaultStylesheet = "dark";
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
        setTheme(defaultStylesheet);
        loadStyleSheet(defaultStylesheet, setTheme);
      } else {
        loadStyleSheet(theme, setTheme);
      }
    }
  }, [mounted]);

  return (
    <IntlProvider locale={lang === EAvailableLanguages.es ? esEs : enUS}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      {children}
    </IntlProvider>
  );
};

export default Theme;
