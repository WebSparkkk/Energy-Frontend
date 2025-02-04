import { useCreateMember } from "../../members/hooks.ts/useCreateMember";
import { useCreateTimer } from "../../timer/hooks/useCreateTimer";
import { IMemberPayload } from "../../members/types";
import { ITimerPayload } from "../../timer/types";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

type TPayload = {
  payload: {
    hourlyRate: number,
    client?: IMemberPayload,
    clientId?: string
  },
  method: "create_new_client" | "use_existing_client"
} 

export function useCreateSession ({
  onSuccess,
  onError
}:{
  onSuccess?: Function,
  onError?: Function
}) {

  const queryClient = useQueryClient()

  const { 
    mutate: mutateMember, 
    error: memberError, 
    isLoading: isCreatingMember,
  } = useCreateMember()

  const { 
    mutate: mutateTimer, 
    error: timerError, 
    isLoading: isCreatingTimer 
  } = useCreateTimer()

  function createTimerFn (payload: ITimerPayload) {
    mutateTimer(payload,{
      onSuccess() {
        toast.success("تم إنشاء الجلسة بنجاح")
        queryClient.invalidateQueries({
          queryKey:["sessions"]
        })
        onSuccess && onSuccess()
      },
      onError() {
        toast.error("حدث خطأ، لا يمكن إنشاء الجلسة.")
        onError && onError()
      }
    })
  }

  function createMemberWithTimer (payload: {
    hourlyRate: number,
    client: IMemberPayload
  }) {
    mutateMember(payload.client,{
      onSuccess({ data: createdClient }) {
        createTimerFn({
          clientId: createdClient.id,
          hourlyRate: payload.hourlyRate
        })
      },
      onError() {
        toast.error("حدث خطأ، لا يمكن إنشاء الجلسة.")
        onError && onError()
      },
    })
  }

  function createSessionFn({ 
    method, 
    payload: { client, hourlyRate, clientId }
  }: TPayload) {
    switch (method) {
      case "use_existing_client":
        clientId && createTimerFn({ clientId, hourlyRate});
        break;
      case "create_new_client":
        client && createMemberWithTimer({ client, hourlyRate })
        break;
    }
  }

  return {
    isLoading: isCreatingMember || isCreatingTimer,
    error: {
      memberError,
      timerError
    },
    createSessionFn
  }
}