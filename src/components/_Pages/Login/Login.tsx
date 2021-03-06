import { Login as LoginModal } from "components/_Pages/Login/Forms/Login";
import { Register } from "components/_Pages/Login/Forms/Register";
import { Recovery } from "components/_Pages/Recovery/Forms/Recovery";
import { useModal } from "context/modal/modal.provider";
import Image from "next/image";
import { useTheme } from "next-themes";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Button } from "rsuite";
import { VERTICAL_LOGO_DARK, VERTICAL_LOGO_LIGHT } from "settings/constants";

const Login = () => {
  const { t } = useTranslation("common");
  const { theme } = useTheme();
  const { openModal } = useModal();

  const handleLogin = () => {
    openModal({
      modalComponent: <LoginModal />,
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
      size: "sm",
    });
  };

  return (
    <div className="w-full h-full grid place-items-center">
      <div className="flex flex-col items-center">
        <div
          style={{ width: 368 }}
          className="flex flex-col items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 shadow-sm rounded-2xl pt-12 pb-0 mx-auto"
        >
          <Image
            src={theme === "dark" ? VERTICAL_LOGO_DARK : VERTICAL_LOGO_LIGHT}
            width={300}
            height={100}
          />

          <Button
            appearance="primary"
            style={{ width: 150 }}
            className="mt-10 mb-5"
            onClick={handleLogin}
          >
            {t("login.loginBtn")}
          </Button>

          <Button
            appearance="primary"
            style={{ width: 150 }}
            onClick={handleRegister}
            className="mt-3"
          >
            {t("login.registerBtn")}
          </Button>

          <div
            style={{ color: "#d8d8d8" }}
            aria-hidden="true"
            className="flex justify-end  font-bold mt-8 mb-8"
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

        <p style={{ color: "#8f8f8f" }} className="mt-5">
          Boilerplate Made with ??? by Clever Labs
        </p>
      </div>
    </div>
  );
};

export default Login;
