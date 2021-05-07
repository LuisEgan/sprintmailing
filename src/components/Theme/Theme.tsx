import { useTheme } from "next-themes";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const defaultStylesheet = "dark";
const InAnimation = "animate__fadeIn";
const OutAnimation = "animate__fadeOut";
let initialLoad = true;
export const loadStyleSheet = (theme: string, setTheme: any) => {
  if (!initialLoad) {
    const layout = document.getElementById("layoutMainContent");
    if (layout) {
      layout.classList.add("animate__fast");
      layout.classList.add(`${OutAnimation}`);
    }
  }
  const sheet = document.createElement("link");
  sheet.rel = "stylesheet";
  sheet.addEventListener("load", () => onLoad(theme, setTheme));
  sheet.href = `/themes/theme-${theme}.css`;
  sheet.id = `${theme}-theme`;
  document.head.appendChild(sheet);
};

const onLoad = (theme: string, setTheme: any) => {
  const deleteTheme = theme === "dark" ? "light" : "dark";
  var sheet = document.getElementById(`${deleteTheme}-theme`);

  if (sheet) {
    sheet.parentNode.removeChild(sheet);
  }
  if (!initialLoad) {
    const layout = document.getElementById("layoutMainContent");
    setTheme(theme);
    if (layout) {
      layout.classList.remove(`animate__fast`);
      layout.classList.add(`${InAnimation}`);
      layout.classList.remove(`${OutAnimation}`);
    }
  } else {
    initialLoad = false;
  }
};

const Theme = () => {
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
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700"
        rel="stylesheet"
      />
    </Head>
  );
};

export default Theme;
