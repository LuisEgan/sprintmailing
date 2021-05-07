import React, { useContext } from "react";

import { Button, Col, Icon, Row } from "rsuite";
import { AuthContext } from "context/auth";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";

import { APP_BASE_ROUTE } from "components/SideMenu/private-routes";
import { useModal } from "context/modal/modal.provider";
import { Login } from "components/Modal/Login/Login";
import { Register } from "components/Modal/Register/Register";
import { VERTICAL_LOGO_DARK, VERTICAL_LOGO_LIGHT } from "settings/constants";

const Index = () => {
  const router = useRouter();
  const { openModal } = useModal();

  const { isAuthenticated } = useContext(AuthContext);

  const handleLogin = () => {
    openModal({
      modalComponent: <Login />,
      modalSize: "sm",
    });
  };

  const handleRegister = () => {
    openModal({
      modalComponent: <Register />,
      modalSize: "sm",
    });
  };

  if (isAuthenticated()) router.push(APP_BASE_ROUTE.url);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
      className="bg-white dark:bg-gray-900"
    >
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
        <Col size={24} className="text-center mt-4">
          Boilerplate Made with <Icon icon="heart" /> by Clever Labs
        </Col>
      </Row>
    </div>
  );
};

export default Index;
