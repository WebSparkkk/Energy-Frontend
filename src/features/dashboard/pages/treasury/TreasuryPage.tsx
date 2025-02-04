import TreasuryBalance from '@/features/dashboard/pages/treasury/components/TreasuryBalance';
import TransactionsList from '@/features/dashboard/pages/treasury/components/TransactionsList';
import TransactionStats from '@/features/dashboard/pages/treasury/components/TransactionStats';
import { createContext, Dispatch, useContext, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionItem from './components/TransactionItem';
import TreasuryTransactionForm from './components/TreasuryTransactionForm';
import { Button } from '@/core/components/ui/button';
import { HiArrowsUpDown } from 'react-icons/hi2';


export type TTreasuryProviderValue = {
  setIsAddTreasuryFormVisible: Dispatch<boolean>,
  isAddTreasuryFormVisible: boolean,
  isTransactionFormVisible: boolean,
  setIsTransactionFormVisible: Dispatch<boolean>,

}
const TreasuryContext = createContext<TTreasuryProviderValue|undefined>(undefined)

export function useTreasuryProvider() {
  if (TreasuryContext === undefined)
    throw new Error("Cannot use TreasuryContext outside TreasuryPage")
  return useContext(TreasuryContext)
}

export default function TreasuryPage() {

  const [ isAddTreasuryFormVisible, setIsAddTreasuryFormVisible ] = useState<boolean>(false)
  const [ isTransactionFormVisible, setIsTransactionFormVisible ] = useState<boolean>(false)
  
  return (
    <TreasuryContext.Provider
      value={{  
        isAddTreasuryFormVisible,
        setIsAddTreasuryFormVisible,
        isTransactionFormVisible,
        setIsTransactionFormVisible
      }}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex justify-between flex-row-reverse items-center">
          <Button 
            onClick={() => setIsTransactionFormVisible(true)}
            variant="default"
          >الإيداع/السحب
            <HiArrowsUpDown className='mr-2 text-xl rotate-45'/>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">الخزينة</h1>
            <p className="text-gray-600">إدارة المعاملات المالية والأرصدة</p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="!w-[32.5%] flex flex-col">
            <TreasuryBalance />
            <TransactionStats />
          </div>
          <div className="flex-1">
            <TransactionsList />
          </div>
        </div>
      </div>
      <TransactionForm/>
      <TransactionItem/>
      <TreasuryTransactionForm/>
    </TreasuryContext.Provider>
  );
}