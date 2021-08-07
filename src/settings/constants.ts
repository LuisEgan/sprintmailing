export const DEFAULT_PROFILE_IMAGE = "some-default-url-avatar-for-users";

export const LOGO_DARK = "/images/logo/dark/HorizontalLogo.svg";
export const LOGO_LIGHT = "/images/logo/light/HorizontalLogo.svg";

export const VERTICAL_LOGO_DARK = "/images/logo/dark/VerticalLogo.svg";
export const VERTICAL_LOGO_LIGHT = "/images/logo/light/VerticalLogo.svg";

export const SITE_LOADER_DARK = "utils/lottie/site-loader.json";
export const SITE_LOADER_LIGHT = "utils/lottie/site-loader.json";

export const USER_TOKEN_PERSIST = "userToken";
export const VENDOR_ID_PERSIST = "selectedVendorId";
export const USER_ID_PERSIST = "userId";
export const REFRESH_TOKEN_PERSIST =
  "x1QTUA0Pe8Sat2AGdsZ31f8HYOxYlR90Wfk0yDcX17pSe";

export const MOBILE_VIEW = 1024;
export const SIDEBAR_WIDTH = 300;

export const AFTER_LOGIN_REDIRECT = "/app/profile";
export const PUBLIC_HOME = "/";

export const DEFAULT_THEME = process.env.NEXT_PUBLIC_DEFAULT_THEME || "dark";

export enum ESystemRoles {
  "USER" = "USER",
  "ADMIN" = "ADMIN",
  "OTHER" = "OTHER",
}

export enum ELayout {
  "MANAGER" = "MANAGER",
  "LANDING" = "LANDING",
  "GENERAL" = "GENERAL",
}
