import { Login } from "components/_Pages/Login/Forms/Login";
import { Register } from "components/_Pages/Login/Forms/Register";
import { useModal } from "context/modal/modal.provider";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { ReactSVG } from "react-svg";
import { ButtonToolbar, Dropdown, Nav } from "rsuite";
import { LOGO_LIGHT } from "settings/constants";

interface NavbarProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}

const NavBarPublic = (props: NavbarProps) => {
  const { showSideBar, setShowSideBar } = props;
  const { t } = useTranslation("common");

  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const { openModal } = useModal();

  const handleLogin = () => {
    openModal({
      modalComponent: <Login />,
      size: "xs",
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
      <nav className="flex items-center justify-between flex-wrap p-3  bg-gradient-to-br from-gray-300 to-white shadow-sm">
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
            <ReactSVG className="block" src={LOGO_LIGHT} />
          </div>
        </div>
        <ButtonToolbar className="flex mr-4">
          <Nav>
            <Nav.Item eventKey="1">Item 1</Nav.Item>
            <Nav.Item eventKey="1">Item 2</Nav.Item>
            <Nav.Item eventKey="1">Item 3</Nav.Item>
            <Nav.Item eventKey="1">Item 4</Nav.Item>
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
              <Dropdown.Item eventKey="7" onClick={handleLogin}>
                {t("login.loginBtn")}
              </Dropdown.Item>
              <Dropdown.Item eventKey="8" onClick={handleRegister}>
                {t("login.registerBtn")}
              </Dropdown.Item>
            </Dropdown>
          </Nav>
        </ButtonToolbar>
      </nav>
    </>
  );
};

export default NavBarPublic;
