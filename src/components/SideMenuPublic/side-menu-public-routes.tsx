import HomeIcon from "@rsuite/icons/legacy/Home";
import { ReactElement } from "react";

import { PUBLIC_ROUTES } from "../../routes/routes";

export enum EPrivateRouteType {
  ITEM = "SINGLE",
  DROPDOWN = "DROPDOWN",
}
interface IPrivateRoute {
  name: string;
  url?: string;
  icon: ReactElement;
  type: EPrivateRouteType;
  children?: Omit<IPrivateRoute, "children">[];
  hidden?: boolean; // * Use for hide item menu for some reason
}

export const SIDE_MENU_PUBLIC_ROUTES: IPrivateRoute[] = [
  {
    name: "Home",
    url: PUBLIC_ROUTES.noRoute.path,
    icon: <HomeIcon />,
    type: EPrivateRouteType.ITEM,
  },
];
