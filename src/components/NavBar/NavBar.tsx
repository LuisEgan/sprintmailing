/*  ./components/Navbar.jsx     */
import { useAuth } from "context/auth";
import { ButtonToolbar, Dropdown, Icon } from "rsuite";
import { useProfile } from "context/profile/profile.context";
import React from "react";
import { ReactSVG } from "react-svg";
import { LOGO_DARK, LOGO_LIGHT } from "settings/constants";
import ToggleVendor from "components/ToggleVendor/ToggleVendor";
import {
  AvatarContainer,
  AvatarImage,
  UserInfoContainer,
} from "./NavBar.style";

interface NavbarProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}

const Navbar = (props: NavbarProps) => {
  const { signout } = useAuth();
  const { user } = useProfile();
  const { showSideBar, setShowSideBar } = props;

  const handleClick = () => {
    setShowSideBar(!showSideBar);
  };

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
          <ToggleVendor />
          <AvatarContainer className="mr-2">
            <UserInfoContainer>
              <Dropdown
                title={user?.name || user?.lastname}
                placement="bottomEnd"
                renderTitle={(children) => (
                  <div className="flex items-center">
                    <AvatarImage
                      className="bg-gray-900 dark:bg-white"
                      style={{
                        backgroundImage: `url(${user?.profileImage})`,
                      }}
                    />
                    <div className="text-base ml-2">{children}</div>
                  </div>
                )}
              >
                <Dropdown.Item onClick={signout}>
                  <Icon icon="sign-out" />
                  <span className="text-red-500">Cerrar sesión</span>
                </Dropdown.Item>
              </Dropdown>
            </UserInfoContainer>
          </AvatarContainer>
        </ButtonToolbar>
      </nav>
    </>
  );
};

export default Navbar;
