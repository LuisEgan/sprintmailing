import SideMenuPublic from "components/SideMenuPublic/SideMenuPublic";
import dynamic from "next/dynamic";
import React, { FC, useState } from "react";
import { Drawer } from "rsuite";
import { SIDEBAR_WIDTH } from "settings/constants";

import { LayoutMainContent, LayoutWrapper } from "./Layout.style";

const NavBarPublic = dynamic(
  () => import("components/NavBarPublic/NavBarPublic"),
  {
    ssr: false,
  },
);

const LandingLayout: FC = (props) => {
  const { children } = props;
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  return (
    <LayoutWrapper>
      <Drawer
        show={showSideBar}
        placement="left"
        size="xs"
        style={{ width: SIDEBAR_WIDTH }}
        onHide={() => {
          setShowSideBar(!showSideBar);
        }}
      >
        <SideMenuPublic {...{ showSideBar, setShowSideBar }} />
      </Drawer>
      <LayoutMainContent className="animate__animated" id="layoutMainContent">
        <NavBarPublic {...{ showSideBar, setShowSideBar }} />
        <div>{children}</div>
      </LayoutMainContent>
    </LayoutWrapper>
  );
};

export default LandingLayout;
