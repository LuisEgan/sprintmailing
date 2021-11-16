import SignOutIcon from "@rsuite/icons/legacy/SignOut";
import ToggleVendor from "components/ToggleVendor/ToggleVendor";
import UserAvatar from "components/User/UserAvatar";
import { useAuth } from "context/auth";
import { useProfile } from "context/profile/profile.context";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { ReactSVG } from "react-svg";
import { ButtonToolbar, Dropdown } from "rsuite";
import { LOGO_DARK, LOGO_LIGHT } from "settings/constants";

import { AvatarContainer, UserInfoContainer } from "./NavBar.style";

interface NavbarProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}

const Navbar = (props: NavbarProps) => {
  const { signout } = useAuth();
  const { user } = useProfile();
  const { showSideBar, setShowSideBar } = props;
  const { t } = useTranslation("common");

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
        <ButtonToolbar className="flex">
          <ToggleVendor />
          <AvatarContainer className="mr-2">
            <UserInfoContainer>
              <Dropdown
                title={user?.name || user?.lastname}
                placement="bottomEnd"
                renderTitle={(children) => (
                  <div className="flex items-center">
                    <UserAvatar {...{ user, showName: true }} />
                    <div className="text-base ml-2">{children}</div>
                  </div>
                )}
              >
                <Dropdown.Item onClick={() => signout()}>
                  <SignOutIcon className="text-red-500" />
                  <span className="text-red-500">
                    {t("publicHome.navbarLinksTitle.signOut")}
                  </span>
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
