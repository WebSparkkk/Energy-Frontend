import Error from "@/core/components/ui/error"
import Spinner from "@/core/components/ui/spinner"
import { useGetTimers } from "../hooks/useGetTimers"
import Table from "@/core/components/ui/table"
import KebabMenu from "@/core/components/ui/kebab-menu"
import { MdDeleteForever, MdOutlineDeleteForever } from "react-icons/md"
import { BsThreeDotsVertical } from "react-icons/bs"
import { formatCurrency } from "@/core/lib/utils/currency"
import { RiRewindStartFill } from "react-icons/ri";
import { IoIosPause } from "react-icons/io"
import { FaRegStopCircle } from "react-icons/fa"
import { ITimer, TIMER_PAYMENT_STATUSES, TIMER_STATUSES } from "../types"
import Tag from "@/core/components/ui/tag"
import { useAppPopupProvider } from "@/core/providers/app-popup/app-popup-provider"
import { TbCash } from "react-icons/tb";
import { timerPaymentStatusAssets, timerPopupValues, timerStatusAssets } from "../constants"
import { useEndTimer } from "../hooks/useEndTimer"
import { useStartTimer } from "../hooks/useStartTimer"
import { usePauseTimer } from "../hooks/usePauseTimer"
import { useDeleteTimer } from "../hooks/useDeleteTimer"
import { useSearchParams } from "react-router-dom"
import { formatTime } from "@/core/lib/utils/time"
import Pagination from "@/core/components/ui/pagination"


export default function TimerTable() {

  const { data, isLoading, error } = useGetTimers()

  if (isLoading) return <Spinner/>
  if (error) return <Error>{error.message}</Error>
   
  return (
    <div className='w-full'>
      <h3 className='mb-3 font-semibold'>قائمة المؤقتات</h3>
      <Table columns={`grid-cols-[.7fr_.7fr_150px_150px_.7fr_.5fr_170px_60px]`}>
        <Table.Header>
          <Table.Cell>اسم العميل</Table.Cell>
          <Table.Cell>السعر بالساعة</Table.Cell>
          <Table.Cell>حالة المؤقت</Table.Cell>
          <Table.Cell>حالة الدفع</Table.Cell>
          <Table.Cell>إجمالي الوقت النشط</Table.Cell>
          <Table.Cell>السعر الإجمالي</Table.Cell>
          <Table.Cell> </Table.Cell>
          <Table.Cell> </Table.Cell>
        </Table.Header>
        <Table.Body
          data={data?.data || []}
          render={(curr) => <TimerTableRow key={curr.id} timer={curr}/>}
        />
        <Table.Footer>
          { data && <Pagination totalPages={data.totalPages}/>}
        </Table.Footer>
      </Table>
    </div>
  )
}

function TimerTableRow ({ timer }: {
  timer: ITimer
}) {

  const { setPopup } = useAppPopupProvider()
  const { mutate: startTimer } = useStartTimer()
  const { mutate: pauseTimer } = usePauseTimer()
  const { mutate: endTimer } = useEndTimer()
  const { mutate: deleteTimer } = useDeleteTimer()

  const [searchParams,setSearchParams] = useSearchParams()

  function handleDeleteTimer(timerId: string) {
    setPopup({
      description:"هل أنت متأكد من حذف المؤقت؟",
      title:"حذف المؤقت",
      isOpen: true,
      icon:<MdOutlineDeleteForever className='text-[3rem] text-secondary-500'/>,
      onConfirm:() => deleteTimer(timerId)
    })
  }

  function handleStartTimer (timerId: string) {
    setPopup({
      ...timerPopupValues.start,
      isOpen: true,
      onConfirm:() => startTimer(timerId)
    })
  }

  function handlePauseTimer (timerId: string) {
    setPopup({
      ...timerPopupValues.pause,
      isOpen: true,
      onConfirm:() => pauseTimer(timerId)
    })
  }
  
  function handleEndTimer (timerId: string) {
    setPopup({
      isOpen: true,
      ...timerPopupValues.end,
      onConfirm:() => endTimer(timerId)
    })
  }

  function handlePayTimer (timerId:string) {
    searchParams.set("timer-paying-id",timerId)
    setSearchParams(searchParams)
  }

  const isPaid = timer.paymentStatus === TIMER_PAYMENT_STATUSES.PAID

  return (
    <Table.Row>
      <Table.Cell>{timer.Client.name}</Table.Cell>
      <Table.Cell>{formatCurrency(Number(timer.hourlyRate))}</Table.Cell>
      <Table.Cell>
        <Tag variant={timerStatusAssets[timer.timerStatus].color}>
          {timerStatusAssets[timer.timerStatus].label}
        </Tag>
      </Table.Cell>
      <Table.Cell>
        <Tag variant={timerPaymentStatusAssets[timer.paymentStatus].color}>
          {timerPaymentStatusAssets[timer.paymentStatus].label}
        </Tag>
      </Table.Cell>
      <Table.Cell>{formatTime(timer.totalActiveTime)}</Table.Cell>
      <Table.Cell>{formatCurrency(Number(timer.totalPrice))}</Table.Cell>
      <Table.Cell>
        <button 
          onClick={() => handlePayTimer(timer.id)} 
          className="payment_button"
          disabled={isPaid}
        >
          دفع
          <TbCash className='text-lg' />
        </button>
      </Table.Cell>
      <Table.Cell>
        <KebabMenu
          label={<BsThreeDotsVertical />}
          labelClassName='hover:bg-zinc-200 duration-100 text-lg rounded-sm p-1'
          optionsLabel='Actions'
          options={[
            {
              label:"Start Timer",
              action: () => handleStartTimer(timer.id),
              className: "text-blue-500",
              icon: <RiRewindStartFill />,
              disabled: timer.timerStatus === TIMER_STATUSES.ENDED
            },    
            {
              label:"Pause Timer",
              action: () => handlePauseTimer(timer.id),
              className: "text-yellow-500",
              icon: <IoIosPause />
            },
            {
              label:"End Timer",
              action: () => handleEndTimer(timer.id),
              className: "text-gray-500",
              icon: <FaRegStopCircle />
            },
            { 
              label:"Delete",
              action: () => handleDeleteTimer(timer.id),
              className: "text-red-400",
              icon: <MdDeleteForever className='text-lg' />
            },
          ]}
        />
      </Table.Cell>
    </Table.Row>
  )
}
