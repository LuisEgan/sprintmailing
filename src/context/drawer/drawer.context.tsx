import { createContext } from "react";
import { DrawerProps } from "rsuite/lib/Drawer/Drawer";

export interface IOpenDrawer extends DrawerProps {
  drawerComponent: JSX.Element;
  onOpenDrawer?: () => void;
  onCloseDrawer?: () => void;
}

interface IDrawerMethods {
  openDrawer: (params: IOpenDrawer) => void;
  closeDrawer: () => void;
  setDrawerComponent: (newDrawerComponent: JSX.Element) => void;
}
const drawerMethods = {
  openDrawer: () => null,
  closeDrawer: () => null,
  setDrawerComponent: () => null,
};
export const DrawerContext = createContext<IDrawerMethods>(drawerMethods);
