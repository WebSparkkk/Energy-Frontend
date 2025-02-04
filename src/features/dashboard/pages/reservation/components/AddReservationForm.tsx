import { z } from "zod";
import { createReservationSchema } from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateReservation } from "../hooks/useCreateReservation";
import { TReservationsProviderValue, useReservationsProvider } from "../ReservationsPage";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/core/components/ui/dialog";
import FormAsyncSelect from "@/core/components/form/form-async-select";
import { fetchClientOptionsService, fetchRoomsOptionsService } from "../services";
import { Button } from "@/core/components/ui/button";
import { FormInput } from "@/core/components/form/form-input";
import { Form } from "@/core/components/form/form";

type TFormFields = z.infer<typeof createReservationSchema>

export default function AddReservationForm() {

  const { mutate, isLoading:isSubmitting } = useCreateReservation()
  const { 
    isAddReservationFormVisible, 
    setIsAddReservationFormVisible 
  } = useReservationsProvider() as TReservationsProviderValue

  const methods = useForm<TFormFields>({
    defaultValues: {
      client: null as unknown as {
        label: string,
        value: string
      },
      room: null as unknown as {
        label: string,
        value: string
      },
      fromDate: "",
      toDate: ""
    },
    resolver: zodResolver(createReservationSchema)
  })

  function handleSubmit ({ client, fromDate, room, toDate }: TFormFields) {
    if (!isSubmitting) {
      mutate({
        clientId: client.value,
        roomId: room.value,
        fromDate,
        toDate
      },{
        onSuccess: () => {
          setIsAddReservationFormVisible(false)
          methods.reset()
        }
      })
    }
  }


  return (
    <Dialog
      open={isAddReservationFormVisible}
      onOpenChange={setIsAddReservationFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            أنشئ الحجز            
          </DialogTitle>
        </DialogHeader>
        <Form
          form={methods}
          handleSubmit={handleSubmit}
          className="space-y-4"
        >
          <FormAsyncSelect
            fetchOptions={fetchClientOptionsService}
            noOptionsMessage={_ => "لا يوجد عملاء"}
            label='اختر العميل'
            placeholder='العميل'
            name='client'
          />
          <FormAsyncSelect
            fetchOptions={fetchRoomsOptionsService}
            noOptionsMessage={_ => "لا توجد غرف"}
            label='اختر الغرفة'
            placeholder='الغرفة'
            name='room'
          />
          <FormInput
            name="fromDate"
            placeholder="وقت البداية"
            label="وقت البداية"
            type="date"
          />
          <FormInput
            name="toDate"
            placeholder="وقت النهاية"
            label="وقت النهاية"
            type="date"
          />
          <DialogFooter>
            <div className="flex justify-end gap-4">
              <Button
                disabled={isSubmitting} 
                type="button" 
                variant="outline" 
                onClick={(e) => {
                  e.preventDefault()
                  setIsAddReservationFormVisible(false)
                }}
              >
                إلغاء
              </Button>
              <Button
                disabled={isSubmitting} 
                type="submit"
              >
                أنشئ الحجز
              </Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}