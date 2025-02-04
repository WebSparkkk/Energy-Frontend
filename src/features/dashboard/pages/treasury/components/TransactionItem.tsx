import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/core/components/ui/dialog"
import { useSearchParams } from "react-router-dom"
import { useGetTransaction } from "../hooks/useGetTransaction"
import Spinner from "@/core/components/ui/spinner"
import Error from "@/core/components/ui/error"
import DataItem from "@/core/components/ui/data-item"
import { formatCurrency } from "@/core/lib/utils/currency"
import { Button } from "@/core/components/ui/button"

function TransactionItem() {

  const [searchParams,setSearchParams] = useSearchParams()
  const transactionId = searchParams.get("transaction-id") || ""
  const { data, isLoading, error } = useGetTransaction(transactionId)

  const transaction = data?.data

  function handleOnOpenChange (isOpen: boolean) {
    if (!isOpen) {
      searchParams.delete("transaction-id")
      setSearchParams(searchParams)
    }
  }

  return (
    <Dialog
      open={Boolean(transactionId)}
      onOpenChange={handleOnOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            تفاصيل المعاملة 
          </DialogTitle>
        </DialogHeader>
        { error && <Error>{error.message}</Error>}
        {
          !isLoading ? (
            <>
              <div className="space-y-2 my-4">
                <DataItem 
                  label={"المبلغ"}
                  value={transaction?.amount || "-"}
                />
                <DataItem 
                  label={"الوصف"}
                  value={transaction?.description || "-"}
                />
                <DataItem 
                  label={"طريقة الدفع"}
                  value={transaction?.paymentMethod || "-"}
                />
                <DataItem 
                  label={"النوع المحدد"}
                  value={transaction?.specificType || "-"}
                />
                <DataItem 
                  label={"نوع المعاملة"}
                  value={transaction?.transactionType || "-"}
                />
                <DataItem 
                  label={"تاريخ التسوية"}
                  value={transaction?.reconciliationDate || "-"}
                />
                <DataItem 
                  label={"الرصيد بعد المعاملة"}
                  value={
                    transaction?.balanceAfterTransaction ?
                    formatCurrency(Number(transaction?.balanceAfterTransaction)) :
                    "-"
                  }
                />
                <DataItem 
                  label={"النقد في الآلة بعد المعاملة"}
                  value={
                    transaction?.cashInMachineAfter ?
                    formatCurrency(Number(transaction?.cashInMachineAfter)) :
                    "-"
                  }
                />
                <DataItem 
                  label={"النقد في الآلة قبل المعاملة"}
                  value={
                    transaction?.cashInMachineBefore ? 
                    formatCurrency(Number(transaction?.cashInMachineBefore)) :
                    "-"
                  }
                />
              </div>
              <DialogFooter>
                <Button
                  type="button" 
                  variant="secondary" 
                  onClick={() => {
                    searchParams.delete("transaction-id")
                    setSearchParams(searchParams)
                  }}
                >
                  إلغاء
                </Button>
              </DialogFooter>
            </>
          ) : <Spinner/>
        }
      </DialogContent>
    </Dialog>
  )
}

export default TransactionItem