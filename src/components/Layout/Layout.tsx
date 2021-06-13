import React, { useState } from "react";
import { Drawer } from "rsuite";
import { MOBILE_VIEW, SIDEBAR_WIDTH } from "settings/constants";

import { useWindowSize } from "utils/use-windows-size";
import SideMenu from "components/SideMenu/SideMenu";
import dynamic from "next/dynamic";
import {
  LayoutMainContent,
  LayoutWrapper,
  SideMenuWrapper,
} from "./Layout.style";

const NavBar = dynamic(() => import("components/NavBar/NavBar"), {
  ssr: false,
});

const ManagerLayout = ({ children }: any) => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const wSize = useWindowSize();

  return (
    <LayoutWrapper>
      {wSize && wSize.width <= MOBILE_VIEW ? (
        <Drawer
          show={showSideBar}
          placement="left"
          size="xs"
          style={{ width: SIDEBAR_WIDTH }}
          onHide={() => {
            setShowSideBar(!showSideBar);
          }}
        >
          <SideMenu {...{ showSideBar, setShowSideBar }} />
        </Drawer>
      ) : (
        <SideMenuWrapper>
          <SideMenu {...{ showSideBar, setShowSideBar }} />
        </SideMenuWrapper>
      )}
      <LayoutMainContent
        style={{ marginLeft: wSize.width <= MOBILE_VIEW ? 0 : SIDEBAR_WIDTH }}
        className="animate__animated"
        id="layoutMainContent"
      >
        <NavBar {...{ showSideBar, setShowSideBar }} />
        <div className="p-6">{children}</div>
      </LayoutMainContent>
    </LayoutWrapper>
  );
};

export default ManagerLayout;
