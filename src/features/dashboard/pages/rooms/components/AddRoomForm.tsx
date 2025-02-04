import { FormInput } from "@/core/components/form/form-input"
import { Button } from "@/core/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/core/components/ui/dialog"
import { useForm } from "react-hook-form"
import { TRoomsProviderValue, useRoomsProvider } from "../RoomsPage"
import { z } from "zod"
import { createRoomSchema } from "../schema"
import { ROOM_STATUSES } from "../types"
import FormSelect from "@/core/components/form/form-select"
import { useCreateRoom } from "../hooks/useCreateRoom"
import { Form } from "@/core/components/form/form"

type TFormFields = z.infer<typeof createRoomSchema>

export default function AddRoomForm() {
  
  const { mutate, isLoading:isSubmitting } = useCreateRoom()
  const { setIsAddRoomFormVisible, isAddRoomFormVisible } = useRoomsProvider() as TRoomsProviderValue

  const methods = useForm<TFormFields>({
    defaultValues: {
      capacity: "0",
      hourlyRate: "0",
      name: "",
      status: statuses[0]
    }
  })

  function handleSubmit ({ capacity, hourlyRate, name, status }: TFormFields) {
    if (!isSubmitting) {
      mutate({
        capacity: Number(capacity),
        hourlyRate: Number(hourlyRate),
        status: status.value,
        name
      },{
        onSuccess:() => {
          setIsAddRoomFormVisible(false)
          methods.reset()
        }
      })
    }
  }

  return (
    <Dialog
      open={isAddRoomFormVisible}
      onOpenChange={setIsAddRoomFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            أنشئ الغرفة            
          </DialogTitle>
        </DialogHeader>
        <Form
          form={methods}
          handleSubmit={handleSubmit}
          className="space-y-4"
        >
          <FormInput
            label="الاسم"
            name="name"
            placeholder="الاسم"
            type="text"
          />
          <FormInput
            label="السعر بالساعة"
            name="hourlyRate"
            placeholder="السعر بالساعة"
            type="number"
          />
          <FormInput
            label="السعة"
            name="capacity"
            placeholder="السعة"
            type="number"
          />
          <FormSelect
            name="status"
            options={statuses}
            label="حالة الغرفة"
            placeholder="حالة الغرفة"
          />
          <DialogFooter>
            <div className="flex justify-end gap-4">
              <Button
                disabled={isSubmitting} 
                type="button" 
                variant="outline" 
                onClick={(e) => {
                  e.preventDefault()
                  setIsAddRoomFormVisible(false)
                }}
              >
                إلغاء
              </Button>
              <Button
                disabled={isSubmitting} 
                type="submit"
              >
                أنشئ الغرفة
              </Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const statuses: {
  value: ROOM_STATUSES,
  label: string
}[] = [
  {
    label: "متاح",
    value: ROOM_STATUSES.AVAILABLE
  },
  {
    label: "غير متاح",
    value: ROOM_STATUSES.NOT_AVAILABLE
  }
]