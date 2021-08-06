import { IconProps } from "rsuite";
import { guardCheckUserRole } from "utils/guards";

import { PRIVATE_ROUTES } from "../../routes/routes";

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
  hidden?: boolean; // * Use for hide item menu for some reason
}

export const PUBLIC_SIDE_MENU_ROUTES: IPrivateRoute[] = [
  {
    name: "Home",
    url: PRIVATE_ROUTES.home.path,
    icon: "home",
    type: EPrivateRouteType.ITEM,
  },
  {
    name: "Profile",
    url: PRIVATE_ROUTES.profile.path,
    icon: "user",
    type: EPrivateRouteType.ITEM,
  },
  {
    name: "Only admin333",
    url: PRIVATE_ROUTES.onlyAdmin.path,
    icon: "key",
    type: EPrivateRouteType.ITEM,
    hidden: !guardCheckUserRole(PRIVATE_ROUTES.onlyAdmin.roleGuards),
  },
  {
    name: "Configuration",
    icon: "cog",
    type: EPrivateRouteType.DROPDOWN,
    children: [
      {
        name: "Site config",
        url: PRIVATE_ROUTES.siteConfig.path,
        icon: "cog",
        type: EPrivateRouteType.ITEM,
      },
      {
        name: "Only admin",
        url: PRIVATE_ROUTES.onlyAdmin.path,
        icon: "key",
        type: EPrivateRouteType.ITEM,
      },
    ],
  },
];
