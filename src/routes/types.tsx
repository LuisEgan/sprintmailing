import CleanLayout from "components/Layout/CleanLayout";
import LandingLayout from "components/Layout/LandingLayout";
import ManagerLayout from "components/Layout/ManagerLayout";
import { useNotification } from "context/notification/notification.provider";
import { useProfile } from "context/profile/profile.context";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { ELayout, ESystemRoles } from "settings/constants";
import { guardCheckUserRole } from "utils/guards";

interface IRouteLayout {
  layout: ELayout;
  roleGuards?: ESystemRoles[];
}

const LAYOUTS = {
  [ELayout.CLEAN]: CleanLayout,
  [ELayout.MANAGER]: ManagerLayout,
  [ELayout.LANDING]: LandingLayout,
};

export const RouteLayout: FC<IRouteLayout> = (props) => {
  const router = useRouter();
  const { user } = useProfile();
  const { children } = props;
  const { layout = ELayout.CLEAN, roleGuards } = props;
  const { fireNotification } = useNotification();
  const Layout = LAYOUTS[layout];

  if (!guardCheckUserRole(roleGuards, user?.systemRole)) {
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
