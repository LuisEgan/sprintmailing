import { ESystemRoles } from "../settings/constants";

export const guardCheckUserRole = (
  roleGuards: ESystemRoles[],
  userRole: ESystemRoles,
) => {
  if (!roleGuards || roleGuards.length === 0) return true;

  return (
    roleGuards.length > 0 &&
    roleGuards.some((roleGuard) => userRole?.includes(roleGuard))
  );
};
