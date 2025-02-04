import { createContext, Dispatch, useContext, useState } from 'react';
import ReservationsTable from '@/features/dashboard/pages/reservation/components/ReservationsTable';
import ReservationsToolbar from '@/features/dashboard/pages/reservation/components/ReservationsToolbar';
import AddReservationForm from '@/features/dashboard/pages/reservation/components/AddReservationForm';
import ReservationPayment from './components/ReservationPayment';

export type TReservationsProviderValue = {
  isAddReservationFormVisible: boolean,
  setIsAddReservationFormVisible: Dispatch<boolean>,
}
const ReservationsContext = createContext<TReservationsProviderValue|undefined>(undefined)

export function useReservationsProvider () {
  if (ReservationsContext === undefined)
    throw new Error("Cannot Use useReservationsProvider outside ReservationsPage")
  return useContext(ReservationsContext)
}

export default function ReservationsPage() {
  
  const [isAddReservationFormVisible,setIsAddReservationFormVisible] = useState<boolean>(false)

  return (
    <ReservationsContext.Provider
      value={{
        isAddReservationFormVisible,
        setIsAddReservationFormVisible
      }}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">إدارة الحجوزات</h1>
          <p className="text-gray-600">إدارة حجوزات الغرف والقاعات</p>
        </div>

        <ReservationsToolbar/>
        <ReservationsTable/>
        <AddReservationForm/>
        <ReservationPayment/>
      </div>
    </ReservationsContext.Provider>
  );
}

