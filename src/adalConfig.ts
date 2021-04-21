import { AdalConfig, AuthenticationContext } from "react-adal";

export const endpoint = process.env.NEXT_PUBLIC_CLIENT_ID;

export const adalConfig: AdalConfig = {
  tenant: process.env.NEXT_PUBLIC_TENANT_ID,
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
  endpoints: {
    api: endpoint as string,
  },
  cacheLocation: "localStorage",
  extraQueryParameter: "prompt=select_account",
  popUp: true,
  postLogoutRedirectUri:
    typeof window !== "undefined" ? window.location.origin : "",
};

export const adalAuthContext: AuthenticationContext | null = process.browser
  ? new AuthenticationContext(adalConfig)
  : null;
