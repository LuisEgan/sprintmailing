import SideMenu from "components/SideMenu/SideMenu";
import dynamic from "next/dynamic";
import React, { FC, useState } from "react";
import { Drawer } from "rsuite";
import { MOBILE_VIEW, SIDEBAR_WIDTH } from "settings/constants";
import useWindowSize from "utils/hooks/useWindowSize";

import {
  LayoutMainContent,
  LayoutWrapper,
  SideMenuWrapper,
} from "./Layout.style";

const NavBar = dynamic(() => import("components/NavBar/NavBar"), {
  ssr: false,
});

const ManagerLayout: FC = (props) => {
  const { children } = props;
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const wSize = useWindowSize();

  return (
    <LayoutWrapper>
      {wSize?.width <= MOBILE_VIEW ? (
        <Drawer
          open={showSideBar}
          placement="left"
          size="xs"
          style={{ width: SIDEBAR_WIDTH }}
          onClose={() => {
            setShowSideBar(!showSideBar);
          }}
        >
          <SideMenu {...{ showSideBar, setShowSideBar, isManager: true }} />
        </Drawer>
      ) : (
        <SideMenuWrapper>
          <SideMenu {...{ showSideBar, setShowSideBar, isManager: true }} />
        </SideMenuWrapper>
      )}
      <LayoutMainContent
        style={{ marginLeft: wSize.width <= MOBILE_VIEW ? 0 : SIDEBAR_WIDTH }}
        className="animate__animated animate__fadeIn"
        id="layoutMainContent"
      >
        <NavBar {...{ showSideBar, setShowSideBar }} />
        <div className="p-6">{children}</div>
      </LayoutMainContent>
    </LayoutWrapper>
  );
};

export default ManagerLayout;
