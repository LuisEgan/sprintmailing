import React from "react";
import { ReactSVG } from "react-svg";
import { LOGO_DARK } from "settings/constants";

import { Copyright, LogoWrapper } from "./Footer.style";

export const Footer = () => (
  <div className="bottom-0 w-full">
    <LogoWrapper className="py-16">
      <div>
        <div>
          <ReactSVG
            className="hidden dark:block"
            src={LOGO_DARK}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 300px; height: auto");
            }}
          />
        </div>

        <div>
          <p>Curabitur</p>
          <span>+5695678345</span>
        </div>

        <div>
          <p>Scelerisque</p>
          <span>Alburquerque, Nuevo México, EE. UU.</span>
        </div>
      </div>
    </LogoWrapper>

    <Copyright className="p-3">
      <p>Copyright @ Your Landing page 2021</p>
    </Copyright>
  </div>
);
