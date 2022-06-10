import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icon from "components/_Custom/Icon/Icon";
import moment from "moment";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { MouseEvent, useRef, useState } from "react";
import { Menu, SidebarFooter, SidebarHeader } from "react-pro-sidebar";
import { PRIVATE_ROUTES } from "routes/routes";
import { Button } from "rsuite";
import { ICON, LOGO_DARK, LOGO_LIGHT, WIDTH_MD } from "settings/constants";
import { ITemplate, TTemplatesCategories } from "types/Template.types";
import { mouseClosestEdge } from "utils/helpers";
import useWindowSize from "utils/hooks/useWindowSize";
import TemplateCard from "../../Cards/TemplateCard";

type TTemplatesList = {
  [template in TTemplatesCategories]: ITemplate[];
};

const TEMPLATES: TTemplatesList = {
  Menu: [{ name: "Menu" }],
  Header: [{ name: "Header" }],
  Content: [{ name: "Content" }],
  Feature: [{ name: "Feature" }],
  Call: [{ name: "Call" }],
  Transactional: [{ name: "Transactional" }],
  Footer: [{ name: "Footer" }],
};

interface ISideBar {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
  forceShowToggleButton?: boolean;
  isCollapsed?: boolean;
  setIsCollapsed?: (isCollapsed: boolean) => void;
  isMd?: boolean;
}
const DndSidebar = (props: ISideBar) => {
  const {
    showSideBar,
    setShowSideBar,
    forceShowToggleButton,
    isCollapsed,
    setIsCollapsed,
    isMd,
  } = props;

  const sliderRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const wwidth = useWindowSize()?.width;
  const router = useRouter();

  const [subMenuAnim, setSubMenuAnim] = useState<
    "menu-slide-in" | "menu-slide-out" | ""
  >("");
  const [activeSubMenu, setActiveSubMenu] = useState<TTemplatesCategories>();

  const close = () => {
    setSubMenuAnim("menu-slide-in");
    setActiveSubMenu(null);
  };

  const handleRedirect = (url: string) => {
    router.push({ pathname: url });
    if (setShowSideBar) {
      setShowSideBar(false);
    }
  };

  const onMouseEnterMenuItem = (category: TTemplatesCategories) => {
    setSubMenuAnim("menu-slide-out");
    setActiveSubMenu(category);
  };

  const onMouseLeaveSubMenu = (e: MouseEvent<HTMLDivElement>) => {
    // * If mouse is not leaving fomr the left, close slider
    const leavingEdge = mouseClosestEdge(e, sliderRef.current);

    if (leavingEdge !== "left") {
      close();
    }
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

      <div className="flex flex-col relative flex-1">
        <div
          ref={sliderRef}
          id="dnd-sidebar-slider"
          onMouseLeave={onMouseLeaveSubMenu}
          className={`h-full w-full absolute opacity-0 invisible bg-gray-700 top-0 ${subMenuAnim}`}
          style={{
            zIndex: subMenuAnim === "menu-slide-out" ? 99 : 1,
          }}
        >
          {TEMPLATES[activeSubMenu]?.map((t) => (
            <TemplateCard template={t} key={t.name} onDrag={close} />
          ))}
        </div>

        <Menu iconShape="circle" className="flex-1 z-10" id="dnd-sidebar-body">
          {Object.keys(TEMPLATES).map((t) => (
            <div
              key={t}
              className="p-5 cursor-pointer hover:bg-gray-600"
              onMouseEnter={() =>
                onMouseEnterMenuItem(t as TTemplatesCategories)
              }
            >
              {t}
            </div>
          ))}
        </Menu>

        {isMd && !isCollapsed && (
          <SidebarFooter>
            <div className="flex p-6 items-center justify-center">
              Clever Labs ® {moment().format("YYYY")}
            </div>
          </SidebarFooter>
        )}
      </div>
    </>
  );
};

export default DndSidebar;
