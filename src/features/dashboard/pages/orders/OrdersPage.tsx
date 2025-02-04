import OrdersToolbar from './components/OrdersToolbar';
import OrdersTable from './components/OrdersTable';
import AddOrderForm from './components/AddOrderForm';
import { createContext, Dispatch, useContext, useState } from 'react';
import Order from './components/Order';
import OrderPaymentForm from './components/OrderPaymentForm';

export type TOrdersProviderValue = {
  isAddOrderFormVisible: boolean,
  setIsAddOrderFormVisible: Dispatch<boolean>,
}
const OrdersContext = createContext<TOrdersProviderValue|undefined>(undefined)

export function useOrdersProvider () {
  if (OrdersContext === undefined)
    throw new Error("Cannot Use useOrdersProvider outside OrdersPage")
  return useContext(OrdersContext)
}

export default function OrdersPage() {

  const [isAddOrderFormVisible,setIsAddOrderFormVisible] = useState<boolean>(false)
  
  return (
    <OrdersContext.Provider
      value={{
        isAddOrderFormVisible,
        setIsAddOrderFormVisible
      }}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">إدارة الطلبات</h1>
          <p className="text-gray-600">إدارة طلبات العملاء والمدفوعات</p>
        </div>

        <OrdersToolbar/>
        <OrdersTable/>
        <Order/>
        <AddOrderForm/>
        <OrderPaymentForm/>
      </div>
    </OrdersContext.Provider>
  );
}