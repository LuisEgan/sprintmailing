export const DEFAULT_INITIAL_ROUTE = "/login";
export const LOGIN_REDIRECT_ROUTE = "/app/components";

export const DEFAULT_PROFILE_IMAGE = "some-default-url-avatar-for-users";
export const ICON = "/images/icon/isotipo.svg";

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
export const PUBLIC_HOME = "/app/home";

export const DEFAULT_THEME = process.env.NEXT_PUBLIC_DEFAULT_THEME || "dark";

export enum ELayout {
  "MANAGER" = "MANAGER",
  "LANDING" = "LANDING",
  "CLEAN" = "CLEAN",
}

export enum GraphQLErrors {
  UNAUTHENTICATED = "UNAUTHENTICATED",
  BAD_USER_INPUT = "BAD_USER_INPUT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  GRAPHQL_VALIDATION_FAILED = "GRAPHQL_VALIDATION_FAILED",
  GRAPHQL_PARSE_FAILED = "GRAPHQL_PARSE_FAILED",
}
export const USER_LANG = "x1QTUA0Pe8Sat2AGdsZ31f8HYOxYlR90Wfk0yDcX17gGg";
export const isBrowser = typeof window !== "undefined";

export const WIDTH_SM = 640;
export const WIDTH_MD = 768;
export const WIDTH_LG = 1024;
export const WIDTH_XL = 1280;
export const WIDTH_2XL = 1536;

export const AVATAR_COLORS = [
  "#92A1C6",
  "#146A7C",
  "#F0AB3D",
  "#C271B4",
  "#C20D90",
];

export const DEFAULT_AVATAR = "some-default-url-avatar-for-users";
