import { ELayout, ESystemRoles } from "settings/constants";

// * const Layout = () => <></>;

export const PRIVATE_ROUTES = {
  home: {
    path: "/app/home",
    layout: ELayout.MANAGER,
  },
  profile: { path: "/app/profile", layout: ELayout.MANAGER },
  siteConfig: {
    path: "/app/config/site-config",
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
  404: { path: "/404" },
  login: { path: "/login" },
};