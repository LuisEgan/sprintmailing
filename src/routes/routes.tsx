import { ELayout } from "settings/constants";

export const PRIVATE_ROUTES = {
  components: {
    path: "/app/components",
    layout: ELayout.MANAGER,
  },
  profile: { path: "/app/profile", layout: ELayout.MANAGER },
  siteConfig: {
    path: "/app/config/site-config",
    layout: ELayout.MANAGER,
  },
};

export const PUBLIC_ROUTES = {
  landing: { path: "/landing", layout: ELayout.LANDING },
  404: { path: "/404" },
  login: { path: "/login" },
};
