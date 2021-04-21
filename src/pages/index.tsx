import React, { useContext, useEffect, useState } from "react";

import LogoDark from "assets/images/logo/dark/VerticalLogo.svg";
import LogoLight from "assets/images/logo/light/VerticalLogo.svg";

import { Button, Col, Icon, Row } from "rsuite";
import { adalAuthContext, endpoint } from "../adalConfig";
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

const Index = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const accessToken = adalAuthContext?.getCachedToken(endpoint as string);

  const { authenticate, isAuthenticated } = useContext(AuthContext);

  const [loginWithAzureActiveDirectory, { loading: loadingAD }] = useMutation<
    ILoginActiveDirectoryRes,
    ILoginActiveDirectory
  >(gqlUser.queries.LOGIN_ACTIVE_DIRECTORY, {
    onCompleted({ loginWithAzureActiveDirectory }) {
      const { accessToken } = loginWithAzureActiveDirectory;
      localStorage.setItem("userToken", `${accessToken}`);
      getUser({
        variables: {
          accessToken,
        },
      });
    },
  });

  const [
    getUser,
    { data: getUserData, loading: getUserLoading },
  ] = useLazyQuery(gqlUser.queries.GET_USER);

  const [loginData, setLoginData] = useState({});

  useEffect(() => {
    if (getUserData) {
      const {
        user: { id: userId },
      } = getUserData;
      localStorage.setItem("userId", `${userId}`);

      authenticate({ accessToken: localStorage.getItem("userToken") });
    }
  }, [getUserData, router.pathname, authenticate]);

  const handleADLogin = () => {
    if (adalAuthContext) {
      adalAuthContext.callback = (errorDesc, token, error) => {
        loginWithAzureActiveDirectory({
          variables: {
            activeDirectoryLogInInput: {
              accessToken: token as string,
            },
          },
        });
      };

      adalAuthContext?.login();
    }
  };

  useEffect(() => {
    if (accessToken) {
      loginWithAzureActiveDirectory({
        variables: {
          activeDirectoryLogInInput: {
            accessToken,
          },
        },
      });
    }
  }, [accessToken]);

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
            onClick={handleADLogin}
            loading={loadingAD || getUserLoading}
          >
            Iniciar sesión
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
