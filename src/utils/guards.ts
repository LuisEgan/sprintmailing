import { EUserRoleEnum } from "types/User/enum/EUserRoleEnum.enum";

export const guardCheckUserRole = (
  roleGuards: EUserRoleEnum[],
  userRole: EUserRoleEnum[],
) => {
  if (!roleGuards || roleGuards.length === 0) return true;

  return (
    roleGuards.length > 0 &&
    roleGuards.some((roleGuard) => userRole?.includes(roleGuard))
  );
};
