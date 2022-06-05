import { EPrivateRouteType, IMenuList } from "types/Routes/Routes";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";

export const MAIN_MENU_LISTS: IMenuList[] = [
  {
    name: "Landing",
    icon: "landing",
    route: PUBLIC_ROUTES.landing,
    type: EPrivateRouteType.ITEM,
  },
  {
    name: "Componentes",
    icon: "components",
    route: PRIVATE_ROUTES.components,
    type: EPrivateRouteType.ITEM,
  },
  {
    name: "Perfil",
    icon: "profile",
    route: PRIVATE_ROUTES.profile,
    type: EPrivateRouteType.ITEM,
  },
  {
    name: "Templates",
    icon: "profile",
    route: PRIVATE_ROUTES.templates,
    type: EPrivateRouteType.ITEM,
  },

  {
    name: "Dropdown",
    icon: "config",
    type: EPrivateRouteType.DROPDOWN,
    children: [
      {
        name: "Sitio",
        icon: "onlyAdmin",
        route: PRIVATE_ROUTES.siteConfig,
        type: EPrivateRouteType.ITEM,
      },
    ],
  },
];
