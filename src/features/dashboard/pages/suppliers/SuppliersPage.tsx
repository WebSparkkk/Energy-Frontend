import SuppliersList from '@/features/dashboard/pages/suppliers/components/SuppliersList';
import { createContext, Dispatch, useContext, useState } from 'react';
import SupplierForm from './components/SupplierForm';
import EditSupplierForm from './components/EditSupplierForm';

export type TSuppliersProviderValue = {
  isAddSupplierFormVisible: boolean,
  setIsAddSupplierFormVisible: Dispatch<boolean>,
  isEditSupplierFormVisible: boolean,
  setIsEditSupplierFormVisible: Dispatch<boolean>
}
const SuppliersContext = createContext<TSuppliersProviderValue|undefined>(undefined)

export function useSuppliersProvider () {
  if (SuppliersContext === undefined)
    throw new Error("Cannot Use useSuppliersProvider outside SupplierPage")
  return useContext(SuppliersContext)
}


export default function SuppliersPage() {

  const [ isAddSupplierFormVisible, setIsAddSupplierFormVisible ] = useState<boolean>(false)
  const [ isEditSupplierFormVisible, setIsEditSupplierFormVisible ] = useState<boolean>(false)
    
  return (
    <SuppliersContext.Provider 
      value={{
        isAddSupplierFormVisible,
        setIsAddSupplierFormVisible,
        isEditSupplierFormVisible,
        setIsEditSupplierFormVisible
      }}
    >
      <div className="p-4 sm:p-6 !pb-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">إدارة الموردين</h1>
          <p className="text-gray-600">إدارة الموردين والمدفوعات</p>
        </div>
      </div>
      <SuppliersList />
      <SupplierForm/>
      <EditSupplierForm/>
    </SuppliersContext.Provider>
  );
}