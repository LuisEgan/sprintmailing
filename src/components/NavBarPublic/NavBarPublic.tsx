import { Login } from "components/_Pages/Login/Forms/Login";
import { Register } from "components/_Pages/Login/Forms/Register";
import ToggleLang from "components/ToggleLang/ToggleLang";
import ToggleTheme from "components/ToggleTheme/ToggleTheme";
import { useAuth } from "context/auth";
import { useModal } from "context/modal/modal.provider";
import { useProfile } from "context/profile/profile.context";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { ReactSVG } from "react-svg";
import { Button, ButtonToolbar, Dropdown, Icon, Nav } from "rsuite";
import { LOGO_DARK, LOGO_LIGHT } from "settings/constants";

import {
  AvatarContainer,
  AvatarImage,
  UserInfoContainer,
} from "./NavBar.style";

interface NavbarProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}

const NavBarPublic = (props: NavbarProps) => {
  const { signout } = useAuth();
  const { user } = useProfile();
  const { showSideBar, setShowSideBar } = props;
  const { t } = useTranslation("common");

  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const { openModal } = useModal();

  const handleLogin = () => {
    openModal({
      modalComponent: <Login />,
      size: "sm",
    });
  };

  const handleRegister = () => {
    openModal({
      modalComponent: <Register />,
      size: "sm",
    });
  };

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap  p-3 bg-gray-50 dark:bg-gray-900 shadow-sm">
        <div className="flex">
          <button
            className="inline-flex p-3 mr-2 rounded sm:hidden text-black dark:text-white  hover:text-white outline-none"
            onClick={handleShowSideBar}
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
          <div>
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
        <ButtonToolbar className="flex">
          <Nav>
            <Nav.Item eventKey="1" icon={<Icon icon="home" />}>
              {t("publicHome.navbarLinksTitle.home")}
            </Nav.Item>
            <Dropdown title={t("publicHome.navbarLinksTitle.aboutus")}>
              <Dropdown.Item eventKey="4">
                {t("publicHome.navbarLinksTitle.company")}
              </Dropdown.Item>
              <Dropdown.Item eventKey="5">
                {t("publicHome.navbarLinksTitle.team")}
              </Dropdown.Item>
              <Dropdown.Item eventKey="6">
                {t("publicHome.navbarLinksTitle.contact")}
              </Dropdown.Item>
            </Dropdown>
          </Nav>

          {user && (
            <AvatarContainer className="mr-2">
              <UserInfoContainer>
                <Dropdown
                  title={user?.name || user?.lastname}
                  placement="bottomEnd"
                  renderTitle={(children) => (
                    <div className="flex items-center">
                      <AvatarImage
                        className="bg-gray-900 dark:bg-white border-2 border-current-500"
                        style={{
                          backgroundImage: `url(${user?.profileImage})`,
                        }}
                      />
                      <div className="text-base ml-2">{children}</div>
                    </div>
                  )}
                >
                  <Dropdown.Item onClick={signout}>
                    <Icon icon="sign-out" className="text-red-500" />
                    <span className="text-red-500">Cerrar sesión</span>
                  </Dropdown.Item>
                </Dropdown>
              </UserInfoContainer>
            </AvatarContainer>
          )}
          {!user && (
            <>
              {" "}
              <Button onClick={handleLogin}>{t("login.loginBtn")}</Button>
              <Button onClick={handleRegister}>{t("login.registerBtn")}</Button>
              <ToggleLang {...{ placement: "bottomStart" }} />
              <ToggleTheme />
            </>
          )}
        </ButtonToolbar>
      </nav>
    </>
  );
};

export default NavBarPublic;
