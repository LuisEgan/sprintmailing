import { Login } from "components/Modal/Login/Login";
import { Recovery } from "components/Modal/Recovery";
import { Register } from "components/Modal/Register/Register";
import ToggleLang from "components/ToggleLang/ToggleLang";
import ToggleTheme from "components/ToggleTheme/ToggleTheme";
import { useAuth } from "context/auth";
import { useModal } from "context/modal/modal.provider";
import { useRouter } from "next/router";
import React from "react";
import { ReactSVG } from "react-svg";
import { Button, Col, Icon, Row } from "rsuite";
import {
  AFTER_LOGIN_REDIRECT,
  VERTICAL_LOGO_DARK,
  VERTICAL_LOGO_LIGHT,
} from "settings/constants";

const LoginPage = () => {
  const router = useRouter();
  const { openModal } = useModal();

  const { isAuthenticated } = useAuth();

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

  if (isAuthenticated()) router.push(AFTER_LOGIN_REDIRECT);

  return (
    <div className="bg-white dark:bg-gray-900 w-screen h-screen flex justify-center items-center">
      <Row>
        <Col size={24}>
          <ReactSVG
            className="hidden dark:block"
            src={VERTICAL_LOGO_DARK}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 350px;");
            }}
          />
          <ReactSVG
            className="block dark:hidden"
            src={VERTICAL_LOGO_LIGHT}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 350px;");
            }}
          />
        </Col>
        <Col size={24} className="flex justify-center mt-5">
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
