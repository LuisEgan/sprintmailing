import GeneralLayout from "components/Layout/GeneralLayout";
import LandingLayout from "components/Layout/LandingLayout";
import ManagerLayout from "components/Layout/ManagerLayout";
import { useNotification } from "context/notification/notification.provider";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { ELayout, ESystemRoles } from "settings/constants";
import { guardCheckUserRole } from "utils/guards";

interface IRouteLayout {
  layout: ELayout;
  roleGuards?: ESystemRoles[];
}

const LAYOUTS = {
  [ELayout.GENERAL]: GeneralLayout,
  [ELayout.MANAGER]: ManagerLayout,
  [ELayout.LANDING]: LandingLayout,
};

export const RouteLayout: FC<IRouteLayout> = (props) => {
  const router = useRouter();
  const { children } = props;
  const { layout = ELayout.GENERAL, roleGuards } = props;
  const { fireNotification } = useNotification();
  const Layout = LAYOUTS[layout];

  if (!guardCheckUserRole(roleGuards)) {
    fireNotification({
      title: "Oops",
      description: " No tienes permisos para acceder a esta ruta",
      type: "error",
    });
    router.back();
    return null;
  }

  return <Layout>{children}</Layout>;
};

export interface IRoute {
  path: string;
  layout?: ELayout;
  roleGuards?: ESystemRoles[];
}