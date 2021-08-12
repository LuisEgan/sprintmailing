import { Login } from "components/_Pages/Login/Forms/Login";
import { Register } from "components/_Pages/Login/Forms/Register";
import { Recovery } from "components/_Pages/Recovery/Forms/Recovery";
import { useModal } from "context/modal/modal.provider";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { ReactSVG } from "react-svg";
import { Button } from "rsuite";
import { VERTICAL_LOGO_DARK, VERTICAL_LOGO_LIGHT } from "settings/constants";

const MainLoginMenu = () => {
  const { t } = useTranslation("common");

  const { openModal } = useModal();

  const handleLogin = () => {
    openModal({
      modalComponent: <Login />,
      size: "xs",
    });
  };

  const handleRegister = () => {
    openModal({
      modalComponent: <Register />,
      size: "sm",
    });
  };
  
  const handleRecovery = () => {
    openModal({
      modalComponent: <Recovery />,
      modalProps: { size: "sm" },
    });
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <div
        style={{width: 368}}
        className="flex flex-col items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 shadow-sm rounded-2xl pt-12 pb-0 mx-auto"
      >
        <div className="flex">
          <div>
            <ReactSVG
              className="hidden dark:block"
              src={VERTICAL_LOGO_DARK}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 300px; height: auto");
              }}
            />
            <ReactSVG
              className="block dark:hidden"
              src={VERTICAL_LOGO_LIGHT}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 300px; height: auto");
              }}
            />
          </div>
        </div>

        <Button appearance="primary" className="mt-10 mb-5" onClick={handleLogin}>
          {t("login.loginBtn")}
        </Button>

        <Button appearance="primary" onClick={handleRegister}>
          {t("login.registerBtn")}
        </Button>
        
        <div
          style={{ color: "#d8d8d8" }}
          aria-hidden="true"
          className="flex justify-end mt-3 font-bold mt-8 mb-8"
        >
          {t("login.forgotPassword")}
          <div
            onClick={handleRecovery}
            onKeyPress={handleRecovery}
            role="button"
            tabIndex={0}
            className="ml-2 underline inline"
          >
            {t("login.recoverPassword")}
          </div>
        </div>
      </div>

      <p style={{color: "#8f8f8f"}} className="mt-5">
        Boilerplate Made with ♥ by Clever Labs
      </p>
    </div>
  );
};

export default MainLoginMenu;
