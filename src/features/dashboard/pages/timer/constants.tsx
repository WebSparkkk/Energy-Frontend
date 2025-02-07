import { FaRegStopCircle } from "react-icons/fa"
import { IoIosPause } from "react-icons/io"
import { RiRewindStartFill } from "react-icons/ri"
import { TIMER_PAYMENT_STATUSES, TIMER_STATUSES } from "./types"
import { TTagColorVariant } from "@/core/components/ui/tag"

export const timerPopupValues: Record<"start" | "end" | "pause",{
  description: string,
  title: string,
  icon: any
}> = {
  end: {
    description:"هل أنت متأكد من إنهاء المؤقت؟",
    title:"إنهاء المؤقت",
    icon:<FaRegStopCircle className='text-[3rem] text-secondary-500'/>,
  },
  pause: {
    description:"هل أنت متأكد من إيقاف المؤقت؟",
    title:"إيقاف المؤقت",
    icon:<IoIosPause className='text-[3rem] text-secondary-500'/>,
  },
  start: {
    description:"هل ستبدأ المؤقت؟",
    title:"ابدأ المؤقت",
    icon:<RiRewindStartFill className='text-[3rem] text-secondary-500'/>,
  }
}

export const timerStatusAssets: Record<TIMER_STATUSES,{
  label: string,
  color: TTagColorVariant
}> = {
  [TIMER_STATUSES.ACTIVE]: {
    label: "نشط",
    color: "green"
  },
  [TIMER_STATUSES.PAUSED]: {
    label: "موقوف",
    color: "orange"
  },
  [TIMER_STATUSES.ENDED]: {
    label: "انتهى",
    color: "gray"
  },
}

export const timerPaymentStatusAssets: Record<TIMER_PAYMENT_STATUSES,{
  label: string,
  color: TTagColorVariant
}> = {
  [TIMER_PAYMENT_STATUSES.PAID]: {
    label: "مدفوع",
    color: "green"
  },
  [TIMER_PAYMENT_STATUSES.PENDING]: {
    label: "معلق",
    color: "yellow"
  },
}

