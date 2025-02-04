import { FaRegStopCircle } from "react-icons/fa"
import { IoIosPause } from "react-icons/io"
import { RiRewindStartFill } from "react-icons/ri"

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