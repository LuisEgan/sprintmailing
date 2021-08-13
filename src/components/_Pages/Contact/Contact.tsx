import React from "react";
import { ReactSVG } from "react-svg";
import { LOGO_DARK } from "settings/constants";

import { Footer,FormWrapper, LogoWrapper, Main, Top } from "./Contact.style";

const Contact = () => (
    <Main>
      <Top className="p-8">
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </h1>

        <p>
          Vestibulum saggitis mollis leo et vestibulum. Curabitur auctor felis quis felis ullamcorper
        </p>

        <FormWrapper className="m-8 w-6/12">
          <div className="flex flex-col mr-5 w-5/12">
            <label>Vestibulum</label>
            <input />

            <label>Vestibulum</label>
            <input />

            <label>Vestibulum</label>
            <input />
          </div>

          <div className="flex flex-col w-7/12">
            <label>Vestibulum</label>

            <textarea />
          </div>
        </FormWrapper>

        <button className="px-8 py-2 mt-10 mb-4">
          Call to action
        </button>
      </Top>

      <div className="absolute bottom-0 w-full">
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


        <Footer className="p-3">
          <p>Copyright @ Your Landing page 2021</p>
        </Footer>
      </div>
    </Main>
  )

export default Contact;
