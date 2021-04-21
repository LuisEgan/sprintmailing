import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { DrawerProps } from "rsuite";
import AdminDrawer from "components/Drawer/Drawer";
import { IOpenDrawer, DrawerContext } from "./drawer.context";

interface IDrawerProvider {}

const DrawerProvider: FC<IDrawerProvider> = (props) => {
  const { children } = props;

  const [drawer, setDrawer] = useState<JSX.Element | null>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [size, setSize] = useState<DrawerProps["size"]>("xs");

  const [onOpen, setOnOpen] = useState<Function | null>();
  const [onClose, setOnClose] = useState<Function | null>();

  useEffect(() => {
    if (isOpen) {
      if (onOpen) onOpen();
    } else {
      if (onClose) onClose();
    }
  }, [isOpen]);

  const closeDrawer = () => {
    setIsOpen(false);
    setOnOpen(null);

    setTimeout(() => {
      setDrawer(null);
      setOnClose(null);
    }, 500);
  };

  const setDrawerComponent = (newDrawerComponent: JSX.Element) => {
    setDrawer(newDrawerComponent);
  };

  const value = useMemo(
    () => ({
      openDrawer: (params: IOpenDrawer) => {
        const {
          drawerComponent,
          drawerSize,
          onOpenDrawer,
          onCloseDrawer,
        } = params;

        setIsOpen(true);
        setDrawer(drawerComponent);

        if (drawerSize) setSize(drawerSize);
        if (onOpenDrawer) setOnOpen(() => onOpenDrawer);
        if (onCloseDrawer) setOnClose(() => onCloseDrawer);
      },

      closeDrawer,
      setDrawerComponent,
    }),
    []
  );

  return (
    <DrawerContext.Provider {...{ value }}>
      <AdminDrawer {...{ size, isOpen }} onRequestClose={closeDrawer}>
        {drawer}
      </AdminDrawer>

      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);

export default DrawerProvider;
