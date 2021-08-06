import { ELayout } from "settings/constants";

import GeneralLayout from "./GeneralLayout";
import LandingLayout from "./LandingLayout";
import ManagerLayout from "./ManagerLayout";

// * register layouts here
export const LAYOUTS = {
    [ELayout.GENERAL]: GeneralLayout,
    [ELayout.MANAGER]: ManagerLayout,
    [ELayout.LANDING]: LandingLayout,
  };