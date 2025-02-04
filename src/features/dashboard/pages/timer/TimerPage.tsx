import { createContext, Dispatch, useContext, useState } from 'react';
import TimerTable from './components/TimerTable';
import TimerToolbar from './components/TimerToolbar';
import TimerPayForm from './components/TimerPayForm';
import { CreateTimerForm } from './components/CreateTimerForm';

export type TTimersProviderValue = {
  isAddTimerFormVisible: boolean,
  setIsAddTimerFormVisible: Dispatch<boolean>,
}
const TimersContext = createContext<TTimersProviderValue|undefined>(undefined)

export function useTimersProvider () {
  if (TimersContext === undefined)
    throw new Error("Cannot Use useTimersProvider outside TimersPage")
  return useContext(TimersContext)
}


export default function TimerPage() {
  
  const [isAddTimerFormVisible,setIsAddTimerFormVisible] = useState<boolean>(false)
  
  return (
    <TimersContext.Provider 
      value={{
        isAddTimerFormVisible,
        setIsAddTimerFormVisible,
      }}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">إدارة المؤقتات</h1>
          <p className="text-gray-600">تتبع وقت استخدام المساحات المشتركة</p>
        </div>

        <TimerToolbar/>
        <TimerTable/>
        <TimerPayForm/>
        <CreateTimerForm/>
      </div>
    </TimersContext.Provider>
  );
}