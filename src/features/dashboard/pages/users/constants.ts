import { TTagColorVariant } from "@/core/components/ui/tag";
import { USER_ROLES } from "@/features/auth/login/types";

export const userRolesAssets: Record<USER_ROLES, {
  color: TTagColorVariant,
  label: string
}> = {
  [USER_ROLES.ADMIN]: {
    color: "purple",
    label:"مسؤول"
  },
  [USER_ROLES.CASHIER]: {
    color:"blue",
    label:"أمين الصندوق"
  },
  [USER_ROLES.EMPLOYEE]: {
    color:"gray",
    label:"موظف"
  },
  [USER_ROLES.MANAGER]: {
    color:"orange",
    label:"مدير"
  }
}
