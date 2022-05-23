import { ReactElement } from "react";
import { ELayout, ESystemRoles } from "settings/constants";

export const LAYOUT_STORED_MENU = "LAYOUT_STORED_MENU";
export const LAYOUT_STORED_SUBMENU = "LAYOUT_STORED_SUBMENU";

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

export enum EPrivateRouteType {
  ITEM = "SINGLE",
  DROPDOWN = "DROPDOWN",
}

export interface IMenuList {
  icon: string;
  iconSize?: number;
  name: string;
  route?: IRoute;
  type: EPrivateRouteType;
  children?: IMenuList[];
}

export interface ISubMenuLists {
  [mainMenuListName: string]: IMenuList[];
}
