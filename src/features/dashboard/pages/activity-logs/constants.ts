import { TTagColorVariant } from "@/core/components/ui/tag"
import { LOG_ACTIONS } from "./types"
import { IconType } from "react-icons/lib";

import { FiLogIn } from "react-icons/fi";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { IoCartOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";

export type TLogAssests = {
  label: string,
  color: TTagColorVariant,
  icon: IconType
}

export const logsActionsAssets: Record<LOG_ACTIONS,TLogAssests> = {
  [LOG_ACTIONS.USER_LOGIN]: {
    color: "yellow",
    icon: FiLogIn,
    label: "تسجيل دخول المستخدم",
  },
  //               orders               //
  [LOG_ACTIONS.ORDERED]: {
    color: "blue",
    icon: IoCartOutline,
    label: "تم الطلب",
  },
  [LOG_ACTIONS.ORDER_PAID]: {
    color: "blue",
    icon: IoCartOutline,
    label: "تم الدفع للطلب",
  },
  [LOG_ACTIONS.ORDER_DELETED]: {
    color: "blue",
    icon: IoCartOutline,
    label: "تم حذف الطلب",
  },
  //               reservations               //
  [LOG_ACTIONS.RESERVATION]: {
    color: "purple",
    icon: HiOutlineArchiveBoxArrowDown,
    label: "إجراء حجز",
  },
  [LOG_ACTIONS.RESERVATION_PAID]: {
    color: "purple",
    icon: HiOutlineArchiveBoxArrowDown,
    label: "تم الدفع للحجز",
  },
  [LOG_ACTIONS.RESERVATION_DELETED]: {
    color: "purple",
    icon: HiOutlineArchiveBoxArrowDown,
    label: "تم حذف الحجز",
  },
   //               session               //
  [LOG_ACTIONS.SESSION_STARTED]: {
    color: "orange",
    icon: FaCalendarAlt,
    label: "بدء الجلسة",
  },
  [LOG_ACTIONS.SESSION_ENDED]: {
    color: "orange",
    icon: FaCalendarAlt,
    label: "إنهاء الجلسة",
  },
  [LOG_ACTIONS.SESSION_PAID]: {
    color: "orange",
    icon: FaCalendarAlt,
    label: "تم الدفع للجلسة",
  },
  [LOG_ACTIONS.SESSION_DELETED]: {
    color: "orange",
    icon: FaCalendarAlt,
    label: "تم حذف الجلسة",
  },
}