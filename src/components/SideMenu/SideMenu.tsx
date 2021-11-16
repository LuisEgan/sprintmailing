import { Gear } from "@rsuite/icons";
import ToggleLang from "components/ToggleLang/ToggleLang";
import ToggleTheme from "components/ToggleTheme/ToggleTheme";
import { useProfile } from "context/profile/profile.context";
import { useRouter } from "next/router";
import React from "react";
import { ReactSVG } from "react-svg";
import { Divider, Dropdown, Footer, Nav, Sidenav } from "rsuite";
import { LOGO_DARK, LOGO_LIGHT, SIDEBAR_WIDTH } from "settings/constants";
import { guardCheckUserRole } from "utils/guards";

import { EPrivateRouteType, SIDE_MENU_ROUTES } from "./side-menu-routes";
import {
  AvatarContainer,
  AvatarImage,
  SidebarWrapper,
  UserInfo,
  UserInfoContainer,
} from "./SideMenu.style";

interface SideMenuProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}

const SideMenu = (props: SideMenuProps) => {
  const router = useRouter();
  const { showSideBar, setShowSideBar } = props;
  const { user } = useProfile();

  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleRedirect = (url: string) => {
    router.push({ pathname: url });
    setShowSideBar(false);
  };

  return (
    <SidebarWrapper
      style={{ width: SIDEBAR_WIDTH }}
      className="bg-gray-50 dark:bg-gray-900 flex flex-col"
    >
      <Sidenav
        style={{ width: SIDEBAR_WIDTH }}
        className="bg-gray-50 dark:bg-gray-900 flex-1"
      >
        <Sidenav.Header
          className="bg-gray-50 dark:bg-gray-900"
          style={{
            height: 60,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ReactSVG
            className="p-3 hidden dark:block"
            src={LOGO_DARK}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 180px; height: 70px");
            }}
          />
          <ReactSVG
            className="p-3 block dark:hidden"
            src={LOGO_LIGHT}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 180px; height: 70px");
            }}
          />
          <button
            className=" inline-flex p-3 rounded lg:hidden dark:text-white text-black ml-auto hover:text-white outline-none"
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
        </Sidenav.Header>
        <Sidenav.Body className="pt-4">
          <AvatarContainer className="pl-4 pb-5 mt-3">
            <AvatarImage
              className="bg-gray-900 dark:bg-white border-2 border-current-500"
              style={{
                backgroundImage: `url(${user?.profileImage})`,
              }}
            />
            <UserInfoContainer>
              <UserInfo>
                {user?.name} {user?.lastname}
              </UserInfo>
            </UserInfoContainer>
          </AvatarContainer>
          <Nav>
            {SIDE_MENU_ROUTES.map((item) => {
              if (
                item.type === EPrivateRouteType.ITEM &&
                !guardCheckUserRole(
                  item.path.roleGuards || [],
                  user?.systemRole,
                )
              ) {
                return (
                  <Dropdown.Item
                    eventKey={item.name}
                    key={`item ${item.name}`}
                    active={router.pathname === item.path.path}
                    icon={<Gear />}
                    onClick={() => {
                      handleRedirect(item.path.path);
                    }}
                  >
                    {item.name}
                  </Dropdown.Item>
                );
              }

              if (
                item.type === EPrivateRouteType.DROPDOWN &&
                item.children.some((item) =>
                  guardCheckUserRole(
                    item.path.roleGuards || [],
                    user?.systemRole,
                  ),
                )
              ) {
                return (
                  <Dropdown
                    key={`dropdown ${item.name}`}
                    icon={<Gear />}
                    title={item.name}
                  >
                    {item.children.map((route) =>
                      guardCheckUserRole(
                        route.path.roleGuards || [],
                        user?.systemRole,
                      ) ? (
                        <Dropdown.Item
                          eventKey={item.name}
                          className="ml-8"
                          key={route.path.path}
                          active={router.pathname === route.path.path}
                          icon={<Gear />}
                          onClick={() => {
                            handleRedirect(route.path.path);
                          }}
                        >
                          {route.name}
                        </Dropdown.Item>
                      ) : (
                        false
                      ),
                    )}
                  </Dropdown>
                );
              }
              return false;
            })}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <Divider />
      <Footer className="flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <ToggleLang />
        <ToggleTheme />
      </Footer>
    </SidebarWrapper>
  );
};

export default SideMenu;
