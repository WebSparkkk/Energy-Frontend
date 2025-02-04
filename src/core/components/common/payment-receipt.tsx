import { CreditCard, Printer, Receipt } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { formatCurrency } from "@/core/lib/utils/currency";
import Spinner from "../ui/spinner";

type TPaymentReceiptProps = {
  handleProceedPayment: Function,
  open: boolean,
  setIsOpen: (state: boolean) => void,
  total: number,
  isLoading?: boolean
} & TChildren

export default function PaymentReceipt({ 
  handleProceedPayment, 
  open, 
  setIsOpen, 
  children, 
  total,
  isLoading
}: TPaymentReceiptProps) {

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            فاتورة الدفع
          </DialogTitle>
        </DialogHeader>

        {
          !isLoading ? (
            <>
              <div className="space-y-6">
                <div className="text-center border-b border-gray-200 pb-4">
                  <h2 className="text-2xl font-bold text-primary-600">Energy</h2>
                  <p className="text-gray-600">مساحات العمل المشتركة</p>
                </div>

                <div className="space-y-3 border-b border-gray-200 py-4">
                  { children }
                </div>

                <div className="flex items-center justify-between text-lg font-bold">
                  <span>الإجمالي</span>
                  <span className="text-primary-600">{formatCurrency(total)}</span>
                </div>
              </div>

              <DialogFooter className="flex justify-between sm:justify-between gap-4 print:hidden">
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="h-4 w-4 ml-2" />
                  طباعة
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={(e) => {
                      e.preventDefault()
                      setIsOpen(false)
                    }}
                  >
                    إلغاء
                  </Button>
                  <Button onClick={() => {
                    handleProceedPayment()
                  }}>
                    <CreditCard className="h-4 w-4 ml-2" />
                    تأكيد الدفع
                  </Button>
                </div>
              </DialogFooter>
            </>
          ) : <Spinner/>
        }
      </DialogContent>
    </Dialog>
  );
}


function PaymentReceiptItem ({ label, value, icon }: {
  label: string,
  value: string,
  icon?: ReactNode
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-600">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  )
}

PaymentReceipt.Item = PaymentReceiptItem
