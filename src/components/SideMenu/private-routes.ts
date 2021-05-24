import { IconProps } from "rsuite";

export enum EPrivateRouteType {
  ITEM = "SINGLE",
  DROPDOWN = "DROPDOWN",
}
interface IPrivateRoute {
  name: string;
  url?: string;
  icon: IconProps["icon"];
  type: EPrivateRouteType;
  children?: Omit<IPrivateRoute, "children">[];
  hidden?: boolean; // * Use for hide item menu but stay as private route
}
export const PRIVATE_ROUTE: IPrivateRoute[] = [
  {
    name: "Home",
    url: "/app/home",
    icon: "home",
    type: EPrivateRouteType.ITEM,
  },
  {
    name: "Profile",
    url: "/app/profile",
    icon: "user",
    type: EPrivateRouteType.ITEM,
  },
  {
    name: "Configuration",
    icon: "cog",
    type: EPrivateRouteType.DROPDOWN,
    children: [
      {
        name: "Categoría insumos",
        url: "/app/config/site-config",
        icon: "cog",
        type: EPrivateRouteType.ITEM,
      },
    ],
  },
];
export const APP_BASE_ROUTE = PRIVATE_ROUTE[0];
