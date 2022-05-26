import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "components/_Custom/Icon/Icon";
import { useProfile } from "context/profile/profile.context";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import React from "react";
import {
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import { MAIN_MENU_LISTS } from "routes/manager.routes";
import { PRIVATE_ROUTES } from "routes/routes";
import { Button, Tooltip, Whisper } from "rsuite";
import { ICON, LOGO_DARK, LOGO_LIGHT, WIDTH_MD } from "settings/constants";
import { EPrivateRouteType, IRoute } from "types/Routes/Routes";
import { guardCheckUserRole } from "utils/guards";
import useWindowSize from "utils/hooks/useWindowSize";

interface ISideBar {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
  forceShowToggleButton?: boolean;
  isCollapsed?: boolean;
  setIsCollapsed?: (isCollapsed: boolean) => void;
  isMd?: boolean;
}
const ManagerLayoutContent = (props: ISideBar) => {
  const { user } = useProfile();

  const router = useRouter();
  const {
    showSideBar,
    setShowSideBar,
    forceShowToggleButton,
    isCollapsed,
    setIsCollapsed,
    isMd,
  } = props;
  const { theme } = useTheme();
  const wwidth = useWindowSize()?.width;

  const handleRedirect = (url: string) => {
    router.push({ pathname: url });
    if (setShowSideBar) {
      setShowSideBar(false);
    }
  };

  const checkSubRoutesRoleGuard = (routes?: IRoute[]) => {
    let isValid = true;

    if (!user?.vendorRoles) {
      return false;
    }

    // eslint-disable-next-line
    for (const route of routes) {
      if (guardCheckUserRole(route.roleGuards || [], user?.vendorRoles)) {
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  return (
    <>
      <SidebarHeader
        className={`py-6 px-3 flex  items-center ${
          isCollapsed && isMd
            ? "flex-col justify-center gap-2"
            : "justify-between"
        }`}
      >
        {(!isCollapsed || !isMd) && (
          <Image
            className="cursor-pointer"
            src={theme === "dark" ? LOGO_DARK : LOGO_LIGHT}
            width={155}
            height={30}
            onClick={() => handleRedirect(PRIVATE_ROUTES.profile.path)}
          />
        )}
        {isCollapsed && isMd && (
          <Image
            className="cursor-pointer"
            src={ICON}
            width={40}
            height={40}
            onClick={() => handleRedirect(PRIVATE_ROUTES.profile.path)}
          />
        )}
        {isMd && !forceShowToggleButton && (
          <Icon
            icon={isCollapsed ? "chevron-right" : "chevron-left"}
            className="cursor-pointer hover:text-current-500"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}
        {(wwidth <= WIDTH_MD || forceShowToggleButton) && (
          <Button
            className={!forceShowToggleButton ? "block md:hidden" : ""}
            appearance="subtle"
            onClick={() => setShowSideBar(!showSideBar)}
          >
            <FontAwesomeIcon icon="bars" style={{ fontSize: 22 }} />
          </Button>
        )}
      </SidebarHeader>
      <Menu iconShape="circle" className="flex-1">
        {MAIN_MENU_LISTS.map((item) => {
          if (item.type === EPrivateRouteType.ITEM) {
            return !checkSubRoutesRoleGuard([item.route]) ? (
              <Whisper
                trigger="hover"
                placement="right"
                key={item.name}
                speaker={
                  isCollapsed && isMd ? <Tooltip>{item.name}</Tooltip> : <div />
                }
              >
                <MenuItem
                  key={`item ${item.name}`}
                  active={router.pathname === item.route.path}
                  icon={
                    <Image
                      src={`/images/svg/menu/${item.icon}.svg`}
                      width={25}
                      height={25}
                    />
                  }
                  onClick={() => {
                    handleRedirect(item.route.path);
                  }}
                >
                  {item.name}
                </MenuItem>
              </Whisper>
            ) : null;
          }
          if (item.type === EPrivateRouteType.DROPDOWN) {
            return !checkSubRoutesRoleGuard(
              item.children.map((route) => route.route),
            ) ? (
              <SubMenu
                key={`dropdown ${item.name}`}
                icon={
                  <Image
                    src={`/images/svg/menu/${item.icon}.svg`}
                    width={item.iconSize || 25}
                    height={item.iconSize || 25}
                  />
                }
                title={item.name}
              >
                {item.children.map((route) =>
                  !checkSubRoutesRoleGuard([route.route]) ? (
                    <MenuItem
                      key={route.route.path}
                      active={router.pathname === route.route.path}
                      icon={
                        <Image
                          src={`/images/svg/menu/${route.icon}.svg`}
                          width={25}
                          height={25}
                        />
                      }
                      onClick={() => {
                        handleRedirect(route.route.path);
                      }}
                    >
                      {route.name}
                    </MenuItem>
                  ) : null,
                )}
              </SubMenu>
            ) : null;
          }
          return false;
        })}
      </Menu>
      {isMd && !isCollapsed && (
        <SidebarFooter>
          <div className="flex p-6 items-center justify-center">
            Clever Labs ® {moment().format("YYYY")}
          </div>
        </SidebarFooter>
      )}
    </>
  );
};

export default ManagerLayoutContent;
