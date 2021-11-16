
import { PRIVATE_ROUTES } from "../../routes/routes";

export enum EPrivateRouteType {
  ITEM = "SINGLE",
  DROPDOWN = "DROPDOWN",
}
interface IPrivateRoute {
  name: string;
  path?: any;
  type: EPrivateRouteType;
  children?: Omit<IPrivateRoute, "children">[];
  hidden?: boolean; // * Use for hide item menu for some reason
  t?: string;
}

export const SIDE_MENU_ROUTES: IPrivateRoute[] = [
  {
    name: "Home",
    path: PRIVATE_ROUTES.home,
    type: EPrivateRouteType.ITEM,
    t: "home",
  },
  {
    name: "Profile",
    path: PRIVATE_ROUTES.profile,
    type: EPrivateRouteType.ITEM,
    t: "profile",
  },
  {
    name: "Only admin",
    path: PRIVATE_ROUTES.onlyAdmin,
    type: EPrivateRouteType.ITEM,
    t: "onlyAdmin",
  },
  {
    name: "Configuration",
    type: EPrivateRouteType.DROPDOWN,
    t: "configuration",
    children: [
      {
        name: "Site config",
        path: PRIVATE_ROUTES.siteConfig,
        type: EPrivateRouteType.ITEM,
        t: "siteConfig",
      },
      {
        name: "Only admin",
        path: PRIVATE_ROUTES.onlyAdmin,
        type: EPrivateRouteType.ITEM,
        t: "onlyAdmin",
      },
    ],
  },
];
