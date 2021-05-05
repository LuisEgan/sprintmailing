import React, { useContext, useEffect, useState } from "react";

import LogoDark from "assets/images/logo/dark/VerticalLogo.svg";
import LogoLight from "assets/images/logo/light/VerticalLogo.svg";

import { Button, Col, Icon, Row } from "rsuite";
import { AuthContext } from "context/auth";
import { useRouter } from "next/router";
import { gqlUser } from "gql";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ReactSVG } from "react-svg";
import {
  ILoginActiveDirectory,
  ILoginActiveDirectoryRes,
} from "gql/User/queries";
import { APP_BASE_ROUTE } from "components/SideMenu/private-routes";
import { useTheme } from "next-themes";
import { useModal } from "context/modal/modal.provider";
import { Login } from "modal-components/Login/Login";
import { Register } from "modal-components/Register/Register";

const Index = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { openModal } = useModal();

  const { authenticate, isAuthenticated } = useContext(AuthContext);

  const [
    getUser,
    { data: getUserData, loading: getUserLoading },
  ] = useLazyQuery(gqlUser.queries.GET_USER);

  useEffect(() => {
    if (getUserData) {
      const {
        user: { id: userId },
      } = getUserData;
      localStorage.setItem("userId", `${userId}`);

      authenticate({ accessToken: localStorage.getItem("userToken") });
    }
  }, [getUserData, router.pathname, authenticate]);

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
            src={LogoDark}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 350px;");
            }}
          />
          <ReactSVG
            className="block dark:hidden"
            src={LogoLight}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 350px;");
            }}
          />
        </Col>
        <Col size={24} className={"flex justify-center mt-5"}>
          <Button
            appearance="primary"
            size="lg"
            onClick={handleLogin}
            loading={getUserLoading}
          >
            Iniciar sesión
          </Button>
        </Col>
        <Col size={24} className={"flex justify-center mt-5"}>
          <Button
            appearance="primary"
            size="lg"
            onClick={handleRegister}
            loading={getUserLoading}
          >
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
