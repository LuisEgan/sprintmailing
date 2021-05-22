/*  ./components/Navbar.jsx     */
import { useAuth } from "context/auth";
import { Button, ButtonToolbar, Dropdown, Icon, SelectPicker } from "rsuite";
import { useProfile } from "context/profile/profile.context";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { loadStyleSheet } from "components/Theme/Theme";
import { ReactSVG } from "react-svg";
import { LOGO_DARK, LOGO_LIGHT } from "settings/constants";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";

interface NavbarProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}

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

const Navbar = (props: NavbarProps) => {
  const [isToggleThemeEnable, setIsToggleThemeEnable] = useState<boolean>(true);
  const { lang } = useTranslation("common");

  const { signout } = useAuth();
  const { user } = useProfile();
  const { theme, setTheme } = useTheme();
  const { showSideBar, setShowSideBar } = props;

  const handleClick = () => {
    setShowSideBar(!showSideBar);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setIsToggleThemeEnable(false);
    loadStyleSheet(newTheme, setTheme);
  };

  const changeLanguage = (lang: EAvailableLanguages) => {
    setLanguage(lang);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsToggleThemeEnable(true);
    }, 1000);
  }, [theme]);

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap  p-3 bg-gray-50 dark:bg-gray-900 shadow-sm">
        <div className="flex">
          <button
            className="inline-flex p-3 mr-2 rounded lg:hidden text-black dark:text-white  hover:text-white outline-none "
            onClick={handleClick}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="lg:hidden">
            <ReactSVG
              className="hidden dark:block"
              src={LOGO_DARK}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 120px; height: 50px");
              }}
            />
            <ReactSVG
              className="block dark:hidden"
              src={LOGO_LIGHT}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 120px; height: 50px");
              }}
            />
          </div>
        </div>
        <ButtonToolbar>
          <Button
            appearance="link"
            className="mr-2"
            disabled={!isToggleThemeEnable}
            onClick={toggleTheme}
          >
            <>
              {theme === "dark" && (
                <Icon
                  icon="sun-o"
                  className="text-white animate__animated animate__slow animate__zoomIn"
                  componentClass="span"
                  size="lg"
                />
              )}
              {theme === "light" && (
                <Icon
                  icon="moon-o"
                  className="text-black animate__animated animate__slow animate__zoomIn"
                  componentClass="span"
                  size="lg"
                />
              )}
            </>
          </Button>
          {process.env.NEXT_PUBLIC_ENABLE_MULTI_LANGUAGE && lang && (
            <SelectPicker
              className="mr-2"
              data={availableLanguages}
              style={{ width: 120 }}
              defaultValue={lang}
              onChange={changeLanguage}
              cleanable={false}
              searchable={false}
              placement="bottomEnd"
            />
          )}
          <Dropdown
            appearance="primary"
            title={user?.name}
            icon={<Icon icon="user-circle-o" />}
            placement="bottomEnd"
            className="text-black"
          >
            {/* <Dropdown.Item>Active Item</Dropdown.Item> */}

            <Dropdown.Item onClick={signout}>
              <span className="text-red-500">Cerrar sesión</span>
            </Dropdown.Item>
          </Dropdown>
        </ButtonToolbar>
      </nav>
    </>
  );
};

export default Navbar;
