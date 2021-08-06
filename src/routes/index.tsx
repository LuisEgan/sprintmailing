import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useRouter } from "next/router";
import React from "react";
import { guardCheckUserRole } from "utils/guards";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { IRoute, RouteLayout } from "./types";

type IRoutes = {
  PRIVATE: {
    [route in keyof typeof PRIVATE_ROUTES]: IRoute;
  };
  PUBLIC: {
    [route in keyof typeof PUBLIC_ROUTES]: IRoute;
  };
};

export const ROUTES: IRoutes = {
  PRIVATE: PRIVATE_ROUTES,
  PUBLIC: PUBLIC_ROUTES,
};

const Routes = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const getCurrentRoute = (
    routes: IRoutes["PRIVATE"] | IRoutes["PUBLIC"],
    isPrivate = false,
  ) => {
    let currentRoute: IRoute;
    let isPrivatePath = false;

    Object.values(routes).some((route) => {
      const isRoute = route.path === router.pathname;
      if (isRoute) {
        isPrivatePath = isPrivate;
        currentRoute = route;
      }
      return isRoute;
    });

    return { currentRoute, isPrivatePath };
  };

  let route: IRoute;
  // * Search for the current route in private routes
  const { currentRoute, isPrivatePath } = getCurrentRoute(ROUTES.PRIVATE, true);
  route = currentRoute;

  // * If route was not private, search for the current route in public routes
  if (!isPrivatePath) {
    route = getCurrentRoute(ROUTES.PUBLIC).currentRoute;
  }

  // * Don't render the route if it's private and the user's role is not allowed
  if (!guardCheckUserRole(currentRoute?.roleGuards)) {
    router.push("/404");
    return null;
  }

  return (
    <>
      {isPrivatePath ? (
        <PrivateRoute>
          <RouteLayout layout={route?.layout} roleGuards={route?.roleGuards}>
            <Component {...pageProps} />
          </RouteLayout>
        </PrivateRoute>
      ) : (
        <RouteLayout layout={route?.layout} roleGuards={route?.roleGuards}>
          <Component {...pageProps} />
        </RouteLayout>
      )}
    </>
  );
};

export default Routes;
