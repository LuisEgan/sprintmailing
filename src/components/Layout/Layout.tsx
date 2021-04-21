import NavBar from "components/NavBar/NavBar";
import React, { useEffect, useState } from "react";
import { Drawer } from "rsuite";
import { MOBILE_VIEW, SIDEBAR_WIDTH } from "settings/constants";
import { LayoutMainContent, LayoutWrapper } from "./Layout.style";
import { useWindowSize } from "utils/use-windows-size";
import SideMenu from "components/SideMenu/SideMenu";
import { useTheme } from "next-themes";
import { Transition } from "react-transition-group";
const ManagerLayout = ({ children }: any) => {
  const { theme, setTheme } = useTheme();
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const wSize = useWindowSize();
  const [asdf, serasdf] = useState<boolean>(false);
  useEffect(() => {
    serasdf(!asdf);
  }, [theme]);
  return (
    <LayoutWrapper>
      {wSize && wSize.width <= MOBILE_VIEW ? (
        <Drawer
          show={showSideBar}
          placement="left"
          size={"xs"}
          style={{ width: SIDEBAR_WIDTH }}
          backdrop={true}
          onHide={() => {
            setShowSideBar(!showSideBar);
          }}
        >
          <SideMenu {...{ showSideBar, setShowSideBar }} />
        </Drawer>
      ) : (
        <SideMenu {...{ showSideBar, setShowSideBar }} />
      )}
      <LayoutMainContent className="animate__animated" id="layoutMainContent">
        <NavBar {...{ showSideBar, setShowSideBar }} />
        {children}
      </LayoutMainContent>
    </LayoutWrapper>
  );
};

export default ManagerLayout;
