import "@fortawesome/fontawesome-svg-core/styles.css";
import "animate.css/animate.css";
import "rsuite/dist/rsuite.min.css";
import "styles/global.scss";
import "styles/overwrite-rsuite.scss";
import "styles/react-pro-sidebar.scss";

import { ApolloProvider } from "@apollo/client";
import SiteHead from "components/Template/SiteHead";
import SiteLoader from "components/Template/SiteLoader";
import Tailwind from "components/Template/Tailwind/Tailwind";
import Theme from "components/Template/Theme/Theme";
import DrawerProvider from "context/drawer/drawer.provider";
import ModalProvider from "context/modal/modal.provider";
import NotificationProvider from "context/notification/notification.provider";
import { ProfileProvider } from "context/profile/profile.provider";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import React from "react";
import Routes from "routes";
import { isBrowser } from "settings/constants";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

import AuthProvider from "../context/auth";
import client from "../settings/apollo";

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function App(props: AppProps) {
  const theme = isBrowser ? localStorage.getItem("theme") : "dark";
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider attribute="class" defaultTheme={theme}>
          <Theme>
            <SiteHead />
            <Tailwind />
            <NotificationProvider>
              <ProfileProvider>
                <AuthProvider>
                  <SiteLoader>
                    <ModalProvider>
                      <DrawerProvider>
                        <Routes {...props} />
                      </DrawerProvider>
                    </ModalProvider>
                  </SiteLoader>
                </AuthProvider>
              </ProfileProvider>
            </NotificationProvider>
          </Theme>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}
