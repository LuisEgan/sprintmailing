import { USER_TOKEN_PERSIST } from "settings/constants";

import { ESystemRoles } from "../settings/constants";

interface IUserRole {
  exp: number;
  iat: number;
  id: string;
  role: ESystemRoles;
}

// * Guards return true when condition it's okay
const isBrowser = typeof window !== "undefined";

export const guardCheckUserRole = (roleGuards: ESystemRoles[]) => {
  let userRole: IUserRole;
  if (isBrowser && localStorage.getItem(USER_TOKEN_PERSIST)) {
    userRole = JSON.parse(
      atob(localStorage.getItem(USER_TOKEN_PERSIST)?.split(".")[1]),
    );
  }

  if (!roleGuards) return true;

  return roleGuards.length > 0 && roleGuards.includes(userRole?.role);
};
