import dynamic from "next/dynamic";
import React, { FC, useState } from "react";

import { LayoutMainContent, LayoutWrapper } from "./Layout.style";

const NavBar = dynamic(() => import("components/NavBar/NavBar"), {
  ssr: false,
});

const LandingLayout: FC = (props) => {
  const { children } = props;
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

  return (
    <LayoutWrapper>
      <LayoutMainContent className="animate__animated" id="layoutMainContent">
        <NavBar {...{ showSideBar, setShowSideBar }} />
        <div className="p-6">{children}</div>
      </LayoutMainContent>
    </LayoutWrapper>
  );
};

export default LandingLayout;
