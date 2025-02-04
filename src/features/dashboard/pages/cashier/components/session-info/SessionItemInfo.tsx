import { useSearchParams } from "react-router-dom"
import { useGetActiveSession } from "../../hooks/useGetSession"
import { createContext, useContext, useLayoutEffect } from "react"
import { IOrder } from "../../../orders/types"
import { ITimer } from "../../../timer/types"
import { Dialog, DialogContent, DialogHeader } from "@/core/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tabs"
import SessionItemTimers from "./SessionItemTimers"
import SessionItemOrders from "./SessionItemOrders"
import { MdAvTimer } from "react-icons/md"
import { IoCartOutline } from "react-icons/io5"
import Spinner from "@/core/components/ui/spinner"

type TSessionItemInfo = {
  orders: IOrder[],
  timers: ITimer[]
}

const SessionItemInfoContext = createContext<TSessionItemInfo>({
  orders: [],
  timers: []
})

export function useSessionItemInfoData () {
  if (SessionItemInfoContext === undefined)
    throw new Error("Cannot Use useSessionItemInfoData outside SessionItemInfo Component")
  return useContext(SessionItemInfoContext)
}

function SessionItemInfo() {

  const [searchParams,setSearchParams] = useSearchParams()
  const sessionClientId = searchParams.get("session-client-id") || ""

  const { data, isLoading, error } = useGetActiveSession(sessionClientId)

  const orders = data?.data.Orders || []
  const timers = data?.data.Timers || []

  function closeSessionItem() {
    searchParams.delete("session-client-id")
    setSearchParams(searchParams)
  }

  useLayoutEffect(() => {
    error && closeSessionItem()
  },[error])

  return (
    <SessionItemInfoContext.Provider
      value={{
        orders,
        timers
      }}
    >
      <Dialog 
        open={Boolean(sessionClientId)}
        onOpenChange={(isOpen) => !isOpen && closeSessionItem()}
      >
        <DialogContent>
          <Tabs defaultValue="timers-tab">
            <DialogHeader>
              <h3 className="mb-3 font-semibold">معلومات العميل</h3>
              <TabsList className="custom_triggering_list !mb-4">
                <TabsTrigger disabled={isLoading} value="orders-tab">
                  <span>الطلبات</span>
                  <IoCartOutline className="text-xl" />
                </TabsTrigger>
                <TabsTrigger disabled={isLoading} value="timers-tab">
                  <span>المؤقتات</span>
                  <MdAvTimer className="text-xl"/>
                </TabsTrigger>
              </TabsList>
            </DialogHeader>
            {
              !isLoading ? (
                <>
                  <TabsContent value="orders-tab">
                    <SessionItemOrders/>
                  </TabsContent>
                  <TabsContent value="timers-tab">
                    <SessionItemTimers/>
                  </TabsContent>
                </>
              ) : <Spinner/>
            }
          </Tabs>
        </DialogContent>
      </Dialog>
    </SessionItemInfoContext.Provider>
  )
}

export default SessionItemInfo