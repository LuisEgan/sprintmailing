import "styles/global.scss";
import "styles/overwrite-rsuite.scss";
import "animate.css/animate.css";

import { ApolloProvider } from "@apollo/client";
import SiteHead from "components/SiteHead/SiteHead";
import SiteLoader from "components/SiteLoader/SiteLoader";
import Tailwind from "components/Tailwind/Tailwind";
import Theme from "components/Theme/Theme";
import DrawerProvider from "context/drawer/drawer.provider";
import ModalProvider from "context/modal/modal.provider";
import NotificationProvider from "context/notification/notification.provider";
import { ProfileProvider } from "context/profile/profile.provider";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import React from "react";
import Routes from "routes";

import AuthProvider from "../context/auth";
import client from "../settings/apollo";

export default function App(props: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider attribute="class">
          <Theme>
            <SiteHead />
            <Tailwind />
            <ModalProvider>
              <DrawerProvider>
                <ProfileProvider>
                  <AuthProvider>
                    <NotificationProvider>
                      <SiteLoader>
                        <Routes {...props} />
                      </SiteLoader>
                    </NotificationProvider>
                  </AuthProvider>
                </ProfileProvider>
              </DrawerProvider>
            </ModalProvider>
          </Theme>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}
