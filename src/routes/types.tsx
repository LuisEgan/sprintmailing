import CleanLayout from "components/Layout/CleanLayout";
import LandingLayout from "components/Layout/LandingLayout";
import ManagerLayout from "components/Layout/ManagerLayout";
import { useNotification } from "context/notification/notification.provider";
import { useProfile } from "context/profile/profile.context";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { ELayout } from "settings/constants";
import { EUserRoleEnum } from "types/User/enum/EUserRoleEnum.enum";
import { guardCheckUserRole } from "utils/guards";

interface IRouteLayout {
  layout: ELayout;
  roleGuards?: EUserRoleEnum[];
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

  if (!guardCheckUserRole(roleGuards, user?.vendorRoles)) {
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
