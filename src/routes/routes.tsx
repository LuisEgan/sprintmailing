import { ELayout, ESystemRoles } from "settings/constants";

// * const Layout = () => <></>;

export const PRIVATE_ROUTES = {
  home: {
    path: "/",
    layout: ELayout.GENERAL,
  },
  profile: { path: "/app/profile", layout: ELayout.MANAGER },
  siteConfig: {
    path: "/app/config/site-config",
    layout: ELayout.MANAGER,
    roleGuards: [ESystemRoles.ADMIN, ESystemRoles.USER],
  },
  siteConfigId: {
    path: "/app/config/[id]",
    layout: ELayout.MANAGER,
    roleGuards: [ESystemRoles.ADMIN, ESystemRoles.USER],
  },
  onlyAdmin: {
    path: "/app/only-admin",
    layout: ELayout.MANAGER,
    roleGuards: [ESystemRoles.ADMIN],
  },
};

export const PUBLIC_ROUTES = {
  noRoute: { path: "/", layout: ELayout.LANDING },
  404: { path: "/404" },
};
