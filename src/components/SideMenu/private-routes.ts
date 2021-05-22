import { IconProps } from "rsuite";

interface IPrivateRoute {
  name: string;
  url: string;
  icon: IconProps["icon"];
}

export const PRIVATE_ROUTE: IPrivateRoute[] = [
  {
    name: "Home",
    url: "/app/home",
    icon: "home",
  },
  {
    name: "Profile",
    url: "/app/profile",
    icon: "user",
  },
];
export const APP_BASE_ROUTE = PRIVATE_ROUTE[0];
