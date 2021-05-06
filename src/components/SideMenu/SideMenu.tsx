import { Dropdown, Icon, Nav, Sidenav } from "rsuite";
import { LOGO_DARK, LOGO_LIGHT, SIDEBAR_WIDTH } from "settings/constants";
import {
  AvatarContainer,
  AvatarImage,
  SidebarWrapper,
  UserInfo,
  UserInfoContainer,
} from "./SideMenu.style";

import { ProfileContext } from "context/profile/profile.context";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import { PRIVATE_ROUTE } from "./private-routes";
import { useTheme } from "next-themes";

interface SideMenuProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}

const SideMenu = (props: SideMenuProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const { showSideBar, setShowSideBar } = props;
  const { data: userData } = useContext(ProfileContext);
  const panelStyles = {
    padding: "15px 20px",
    color: "#aaa",
  };

  const handleShowSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleRedirect = (url: string) => {
    router.push(url);
  };
  return (
    <SidebarWrapper style={{ width: SIDEBAR_WIDTH }}>
      <Sidenav
        defaultOpenKeys={["3", "4"]}
        style={{ width: SIDEBAR_WIDTH, height: "100%" }}
      >
        <Sidenav.Header
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
        <Sidenav.Body className="pt-5">
          <AvatarContainer>
            <AvatarImage className="bg-gray-900 dark:bg-white"></AvatarImage>
            <UserInfoContainer>
              <UserInfo>
                {userData?.user?.name} {userData?.user?.lastname}
              </UserInfo>
            </UserInfoContainer>
          </AvatarContainer>
          <Nav>
            {PRIVATE_ROUTE.map((item, index) => (
              <Nav.Item
                key={item.url}
                active={router.pathname === item.url}
                icon={<Icon icon={item.icon} />}
                onClick={() => {
                  handleRedirect(item.url);
                }}
              >
                {item.name}
              </Nav.Item>
            ))}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </SidebarWrapper>
  );
};

export default SideMenu;
