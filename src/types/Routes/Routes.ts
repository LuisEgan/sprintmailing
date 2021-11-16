import { ReactElement } from "react";
import { ELayout, ESystemRoles } from "settings/constants";

export enum EMenuRouteType {
  ITEM = "SINGLE",
  DROPDOWN = "DROPDOWN",
}

export interface IRoute {
  path: string;
  layout?: ELayout;
  roleGuards?: ESystemRoles[];
}

export interface IMenuRoute {
  name: string;
  url?: IRoute;
  icon: ReactElement;
  type: EMenuRouteType;
  children?: {
    name: string;
    url?: IRoute;
    icon: ReactElement;
    type: EMenuRouteType;
    hideInNavbar?: boolean;
  }[];
  hideInNavbar?: boolean;
}
