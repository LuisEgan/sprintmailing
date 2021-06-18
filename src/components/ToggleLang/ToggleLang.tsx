import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { SelectPicker } from "rsuite";

export enum EAvailableLanguages {
  es = "es",
  en = "en",
}
interface IAvailableLenguages {
  value: EAvailableLanguages;
  label: string;
}
export const availableLanguages: IAvailableLenguages[] = [
  { value: EAvailableLanguages.es, label: "Español" },
  { value: EAvailableLanguages.en, label: "English" },
];
const ToggleLang = () => {
  const { lang } = useTranslation("common");

  const changeLanguage = (lang: EAvailableLanguages) => {
    setLanguage(lang);
  };
  return (
    <>
      {lang && (
        <SelectPicker
          data={availableLanguages}
          style={{ width: 120 }}
          defaultValue={lang}
          onChange={changeLanguage}
          cleanable={false}
          searchable={false}
          placement="topEnd"
        />
      )}
    </>
  );
};

export default ToggleLang;
