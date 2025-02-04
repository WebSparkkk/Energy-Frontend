import RoomsTable from '@/features/dashboard/pages/rooms/components/RoomsTable';
import RoomsToolbar from '@/features/dashboard/pages/rooms/components/RoomsToolbar';
import { createContext, Dispatch, useContext, useState } from 'react';
import EditRoomForm from './components/EditRoomForm';
import AddRoomForm from './components/AddRoomForm';


export type TRoomsProviderValue = {
  isAddRoomFormVisible: boolean,
  setIsAddRoomFormVisible: Dispatch<boolean>,
  isEditRoomFormVisible: boolean,
  setIsEditRoomFormVisible: Dispatch<boolean>
}
const RoomsContext = createContext<TRoomsProviderValue|undefined>(undefined)

export function useRoomsProvider () {
  if (RoomsContext === undefined)
    throw new Error("Cannot Use useRoomsProvider outside RoomsPage")
  return useContext(RoomsContext)
}


export default function RoomsPage() {

  const [isAddRoomFormVisible,setIsAddRoomFormVisible] = useState<boolean>(false)
  const [isEditRoomFormVisible,setIsEditRoomFormVisible] = useState<boolean>(false)

  return (
    <RoomsContext.Provider 
      value={{
        isAddRoomFormVisible,
        isEditRoomFormVisible,
        setIsAddRoomFormVisible,
        setIsEditRoomFormVisible
      }}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">إدارة الغرف</h1>
          <p className="text-gray-600">إدارة غرف وقاعات مساحات العمل</p>
        </div>

        <RoomsToolbar/>
        <RoomsTable/>
        <AddRoomForm/>
        <EditRoomForm/>
      </div>
    </RoomsContext.Provider>
  );
}
