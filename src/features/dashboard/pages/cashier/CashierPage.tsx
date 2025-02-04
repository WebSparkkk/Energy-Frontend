
import CashierToolbar from './components/CashierToolbar';
import ActiveSessionsTable from './components/ActiveSessionsTable';
import { createContext, Dispatch, useContext, useState } from 'react';
import SessionItemInfo from './components/session-info/SessionItemInfo';
import AddOrderToClientForm from './components/session-info/AddOrderToClientForm';
import CreateSessionForm from './components/CreateSessionForm';
import SessionPaymentForm from './components/SessionPaymentForm';


export type TCashierProviderValue = {
  isAddSessionFormVisible: boolean,
  setIsAddSessionFormVisible: Dispatch<boolean>,
  isAddOrderFormVisible: boolean,
  setIsAddOrderFormVisible: Dispatch<boolean>
}
const CashierContext = createContext<TCashierProviderValue|undefined>(undefined)

export function useCashierProvider () {
  if (CashierContext === undefined)
    throw new Error("Cannot Use useCashierProvider outside CashierPage")
  return useContext(CashierContext)
}

export default function CashierPage() {

  const [isAddSessionFormVisible, setIsAddSessionFormVisible] = useState<boolean>(false)
  const [isAddOrderFormVisible, setIsAddOrderFormVisible] = useState<boolean>(false)

  return (
    <CashierContext.Provider
      value={{
        isAddSessionFormVisible,
        setIsAddSessionFormVisible,
        isAddOrderFormVisible,
        setIsAddOrderFormVisible
      }}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">الكاشير</h1>
          <p className="text-gray-600">إدارة الجلسات النشطة والمدفوعات</p>
        </div>

        <CashierToolbar/>
        <ActiveSessionsTable/>
        <SessionItemInfo/>
        <AddOrderToClientForm/>
        <CreateSessionForm/>
        <SessionPaymentForm/>
      </div>
    </CashierContext.Provider>
  );
}