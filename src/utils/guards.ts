import { ESystemRoles } from "../settings/constants";

export const guardCheckUserRole = (
  roleGuards: ESystemRoles[],
  userRole: ESystemRoles,
) => {
  if (!roleGuards) return true;

  return roleGuards.length && roleGuards.includes(userRole);
};
