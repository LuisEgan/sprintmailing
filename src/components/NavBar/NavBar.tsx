/*  ./components/Navbar.jsx     */
import { AuthContext } from "context/auth";
import { Button, ButtonToolbar, Dropdown, Icon } from "rsuite";
import LogoDark from "assets/images/logo/dark/HorizontalLogo.svg";
import LogoLight from "assets/images/logo/light/HorizontalLogo.svg";

import { ProfileContext } from "context/profile/profile.context";
import React, { useContext } from "react";
import { useTheme } from "next-themes";
import { loadStyleSheet } from "components/Theme/Theme";
import { ReactSVG } from "react-svg";
import { LOGO_DARK, LOGO_LIGHT } from "settings/constants";

interface NavbarProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}
const Navbar = (props: NavbarProps) => {
  const { signout } = useContext(AuthContext);
  const { data: userData } = useContext(ProfileContext);
  const { theme, setTheme } = useTheme();
  const { showSideBar, setShowSideBar } = props;

  const handleClick = () => {
    setShowSideBar(!showSideBar);
  };

  const toggleTheme = () => {
    const newTheme = theme == "dark" ? "light" : "dark";

    loadStyleSheet(newTheme, setTheme);
  };

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap  p-3 ">
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
          <Button appearance="link" className="mr-2" onClick={toggleTheme}>
            <>
              {theme === "dark" && (
                <Icon
                  icon="sun-o"
                  className={`text-white animate__animated animate__zoomIn`}
                  componentClass="span"
                  size="lg"
                  onClick={toggleTheme}
                />
              )}
              {theme === "light" && (
                <Icon
                  icon="moon-o"
                  className={`text-black animate__animated animate__zoomIn`}
                  componentClass="span"
                  size="lg"
                  onClick={toggleTheme}
                />
              )}
            </>
          </Button>
          <Dropdown
            appearance="primary"
            title={userData?.user?.name}
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
