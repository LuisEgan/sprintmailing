import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useRouter } from "next/router";
import React from "react";

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

const ROUTES: IRoutes = {
  PRIVATE: PRIVATE_ROUTES,
  PUBLIC: PUBLIC_ROUTES,
};

const Routes = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const privatePaths = Object.values(ROUTES.PRIVATE).map((route) => route.path);
  const pathIndex = privatePaths.findIndex((path) =>
    path.includes(router.pathname),
  );

  const privatePathsKeys = Object.keys(ROUTES.PRIVATE);

  const key = privatePathsKeys[pathIndex];

  return (
    <>
      {privatePaths.includes(router.pathname) ? (
        <PrivateRoute>
          <RouteLayout
            layout={ROUTES.PRIVATE[key]?.layout}
            roleGuards={ROUTES.PRIVATE[key]?.roleGuards}
          >
            <Component {...pageProps} />
          </RouteLayout>
        </PrivateRoute>
      ) : (
        <RouteLayout
          layout={ROUTES.PUBLIC[key]?.layout}
          roleGuards={ROUTES.PUBLIC[key]?.roleGuards}
        >
          <Component {...pageProps} />
        </RouteLayout>
      )}
    </>
  );
};

export default Routes;
