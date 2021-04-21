import { IconProps } from "rsuite";

interface IPrivateRoute {
  name: string;
  url: string;
  icon: IconProps["icon"];
}

export const PRIVATE_ROUTE: IPrivateRoute[] = [
  {
    name: "HOME",
    url: "/app/home",
    icon: "home",
  },
];
export const APP_BASE_ROUTE = PRIVATE_ROUTE[0];
