import React from "react";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";

import client from "../settings/apollo";
import AuthProvider from "../context/auth";
import { ProfileProvider } from "context/profile/profile.provider";
import ModalProvider from "context/modal/modal.provider";
import DrawerProvider from "context/drawer/drawer.provider";
import NotificationProvider from "context/notification/notification.provider";

import Theme from "components/Theme/Theme";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import ManagerLayout from "components/Layout/Layout";

import Tailwind from "components/Tailwind/Tailwind";

import "assets/global.scss";
import "animate.css/animate.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider attribute="class">
          <Theme />
          <Tailwind />
          <AuthProvider>
            <NotificationProvider>
              <ProfileProvider>
                {pathname === "/" && <Component {...pageProps} />}
                {pathname !== "/" && (
                  <>
                    <PrivateRoute>
                      <ModalProvider>
                        <DrawerProvider>
                          <ManagerLayout>
                            <Component {...pageProps} />
                          </ManagerLayout>
                        </DrawerProvider>
                      </ModalProvider>
                    </PrivateRoute>
                  </>
                )}
              </ProfileProvider>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}
