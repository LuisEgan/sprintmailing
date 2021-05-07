import React from "react";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";

import { ProfileProvider } from "context/profile/profile.provider";
import ModalProvider from "context/modal/modal.provider";
import DrawerProvider from "context/drawer/drawer.provider";
import NotificationProvider from "context/notification/notification.provider";

import Theme from "components/Theme/Theme";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import ManagerLayout from "components/Layout/Layout";

import Tailwind from "components/Tailwind/Tailwind";

import "styles/global.scss";
import "animate.css/animate.css";
import { PRIVATE_ROUTE } from "components/SideMenu/private-routes";
import AuthProvider from "../context/auth";
import client from "../settings/apollo";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider attribute="class">
          <Theme />
          <Tailwind />
          <ModalProvider>
            <DrawerProvider>
              <AuthProvider>
                <NotificationProvider>
                  <ProfileProvider>
                    {!PRIVATE_ROUTE.some((item) => item.url === pathname) && (
                      <Component {...pageProps} />
                    )}{" "}
                    {PRIVATE_ROUTE.some((item) => item.url === pathname) && (
                      <>
                        <PrivateRoute>
                          <ManagerLayout>
                            <Component {...pageProps} />
                          </ManagerLayout>
                        </PrivateRoute>
                      </>
                    )}
                  </ProfileProvider>
                </NotificationProvider>
              </AuthProvider>
            </DrawerProvider>
          </ModalProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}
