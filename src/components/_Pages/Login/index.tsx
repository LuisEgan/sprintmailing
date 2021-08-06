import { Register } from "components/_Pages/Login/Forms/Register";
import { Recovery } from "components/_Pages/Recovery/Forms/Recovery";
import ToggleLang from "components/ToggleLang/ToggleLang";
import ToggleTheme from "components/ToggleTheme/ToggleTheme";
import { useModal } from "context/modal/modal.provider";
import React from "react";
import { ReactSVG } from "react-svg";
import { Button, Col, Icon, Row } from "rsuite";
import { VERTICAL_LOGO_DARK, VERTICAL_LOGO_LIGHT } from "settings/constants";

import { Login } from "./Forms/Login";

const LoginPage = () => {
  const { openModal } = useModal();

  const handleLogin = () => {
    openModal({
      modalComponent: <Login />,
      size: "sm",
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
    <div className="bg-white dark:bg-gray-900 w-screen h-screen flex justify-center items-center">
      <Row>
        <Col size={24}>
          <ReactSVG
            className="hidden dark:block"
            src={VERTICAL_LOGO_DARK}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 250px;height:100%;");
            }}
          />
          <ReactSVG
            className="block dark:hidden"
            src={VERTICAL_LOGO_LIGHT}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 250px;height:100%;");
            }}
          />
        </Col>
        <Col size={24} className="flex justify-center mt-8">
          <Button appearance="primary" size="lg" onClick={handleLogin}>
            Iniciar sesión
          </Button>
        </Col>
        <Col size={24} className="flex justify-center mt-5">
          <Button appearance="primary" size="lg" onClick={handleRegister}>
            Regístrarse
          </Button>
        </Col>
        <Col size={24} className="flex justify-center mt-5">
          <Button appearance="primary" size="lg" onClick={handleRecovery}>
            Recuperar Contraseña
          </Button>
        </Col>
        <Col size={24} className="text-center mt-4">
          Boilerplate Made with <Icon icon="heart" /> by Clever Labs
        </Col>
        <Col size={24} className="text-center mt-4">
          <ToggleLang />
          <ToggleTheme />
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
