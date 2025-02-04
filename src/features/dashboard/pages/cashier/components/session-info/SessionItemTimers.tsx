import { useAppPopupProvider } from '@/core/providers/app-popup/app-popup-provider'
import { useEndTimer } from '../../../timer/hooks/useEndTimer'
import { usePauseTimer } from '../../../timer/hooks/usePauseTimer'
import { useStartTimer } from '../../../timer/hooks/useStartTimer'
import { useSessionItemInfoData } from './SessionItemInfo'
import { timerPopupValues } from '../../../timer/constants'
import { ReactNode } from 'react'
import { formatISODate } from '@/core/lib/utils/format-date'
import { formatCurrency } from '@/core/lib/utils/currency'
import { formatTime } from '@/core/lib/utils/time'
import { TIMER_STATUSES } from '../../../timer/types'

const buttonClassName = "px-4 py-2 text-sm text-white flex-1 rounded-md disabled:cursor-not-allowed disabled:bg-zinc-300"

function SessionItemTimers() {
 
  const { timers } = useSessionItemInfoData()
  const { mutate: pauseTimer } = usePauseTimer()
  const { mutate: endTimer } = useEndTimer()
  const { mutate: startTimer } = useStartTimer()
  const { setPopup } = useAppPopupProvider()


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

  return (
    <>
      <h3 className='mb-3 font-semibold text-right'>المؤقت النشط</h3>
      {
        !timers.length ? 
        <h4 className='font-semibold text-center mt-5'>
          لا توجد مؤقتات لعرضها
        </h4> : <></>
      }
      <div className='h-[400px] overflow-auto w-full flex flex-col gap-4 p-2'>
        {
          timers.map(curr => (
            <div key={curr.id} className="w-full flex flex-col gap-2 bg-zinc-50 p-3 rounded-lg">
              
              <TimerDataItem
                label="وقت البدء"
                value={formatISODate(curr.startTime)}
              />

              <TimerDataItem
                label="السعر/ساعة"
                value={formatCurrency(Number(curr.hourlyRate))}
              />

              <TimerDataItem
                label="إجمالي الوقت النشط"
                value={formatTime(curr.totalActiveTime)}
              />

              <div className="flex gap-4 mt-2">
                <button 
                  onClick={() => handleEndTimer(curr.id)}
                  disabled={curr.timerStatus === TIMER_STATUSES.ENDED}
                  className={`bg-red-500 ${buttonClassName}`}
                >
                  انهاء المؤقت  
                </button>
                <button 
                  onClick={() => handlePauseTimer(curr.id)}
                  disabled={curr.timerStatus === TIMER_STATUSES.PAUSED || curr.timerStatus === TIMER_STATUSES.ENDED}
                  className={`bg-yellow-500 ${buttonClassName}`}
                >
                  إيقاف المؤقت  
                </button>
                <button 
                  onClick={() => handleStartTimer(curr.id)}
                  disabled={curr.timerStatus === TIMER_STATUSES.ACTIVE || curr.timerStatus === TIMER_STATUSES.ENDED}
                  className={`bg-green-500 ${buttonClassName}`}
                >
                  بدء المؤقت  
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default SessionItemTimers

function TimerDataItem ({ label, value }:{
  label: ReactNode,
  value: ReactNode
}) {
  return (
    <div className='flex justify-between items-center font-medium'>
      <span className='text-zinc-700'>{value}</span>
      <span className='text-zinc-500'>{label}</span>
    </div>
  )
}