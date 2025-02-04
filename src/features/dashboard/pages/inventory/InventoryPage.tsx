import { createContext, Dispatch, useContext, useState } from 'react';
import InventoryToolbar from './components/InventoryToolbar';
import InventoryTable from './components/InventoryTable';
import AddInventoryForm from './components/AddInventoryForm';
import RestockInventoryForm from './components/RestockInventoryForm';
import ReturnInventoryStockForm from './components/ReturnInventoryStockForm';

export type TInventoryProviderValue = {
  isAddInventoryFormVisible: boolean,
  setIsAddInventoryFormVisible: Dispatch<boolean>,
  isRestockFormVisible: boolean,
  setIsRestockFormVisible: Dispatch<boolean>,
  setIsReturnStockFormVisible: Dispatch<boolean>,
  isReturnStockFormVisible: boolean
}

const InventoryContext = createContext<TInventoryProviderValue|undefined>(undefined)

export function useInventoryProvider () {
  if (InventoryContext === undefined)
    throw new Error("Cannot Use useInventoryProvider outside InventoryContext")
  return useContext(InventoryContext)
}

export default function InventoryPage() {
  const [isAddInventoryFormVisible,setIsAddInventoryFormVisible] = useState<boolean>(false)
  const [isRestockFormVisible,setIsRestockFormVisible] = useState<boolean>(false)
  const [isReturnStockFormVisible,setIsReturnStockFormVisible] = useState<boolean>(false)

  return (
    <InventoryContext.Provider 
      value={{
        isAddInventoryFormVisible,
        setIsAddInventoryFormVisible,
        isRestockFormVisible,
        setIsRestockFormVisible,
        isReturnStockFormVisible,
        setIsReturnStockFormVisible
      }}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">إدارة المخزون</h1>
          <p className="text-gray-600">تتبع وإدارة مخزون المنتجات والمستلزمات</p>
        </div>

        <InventoryToolbar/>
        <InventoryTable/>
        <AddInventoryForm/>
        <RestockInventoryForm/>
        <ReturnInventoryStockForm/>
      </div>
    </InventoryContext.Provider>
  );
}