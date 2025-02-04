import { FormInput } from "@/core/components/form/form-input"
import FormSelect from "@/core/components/form/form-select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/core/components/ui/dialog"
import { ROOM_STATUSES } from "../types"
import { Button } from "@/core/components/ui/button"
import { useForm } from "react-hook-form"
import { TRoomsProviderValue, useRoomsProvider } from "../RoomsPage"
import { Form } from "@/core/components/form/form"
import { z } from "zod"
import { editRoomSchema } from "../schema"
import { useCreateRoom } from "../hooks/useCreateRoom"
import { useGetRoom } from "../hooks/useGetRoom"
import { useSearchParams } from "react-router-dom"
import Spinner from "@/core/components/ui/spinner"
import Error from "@/core/components/ui/error"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useEditRoom } from "../hooks/useEditRoom"

type TFormFields = z.infer<typeof editRoomSchema>

function EditRoomForm() {
 
  const { mutate, isLoading:isSubmitting } = useEditRoom()
  const [searchParams,setSearchParams] = useSearchParams()

  const roomId = searchParams.get("room-id") || ""
  const { data, isLoading, error } = useGetRoom(roomId)
  const room = data?.data

  const { setIsEditRoomFormVisible, isEditRoomFormVisible } = useRoomsProvider() as TRoomsProviderValue

  const methods = useForm<TFormFields>({
    defaultValues: {
      capacity: "0",
      hourlyRate: "0",
      name: "",
      status: statuses[0]
    },
    values: {
      status: statuses.find(curr => curr.value === room?.status) || statuses[0],
      capacity: `${room?.capacity}` || "0",
      hourlyRate: room?.hourlyRate || "0",
      name: room?.name || ""
    }
  })

  function closeFrom () {
    searchParams.delete("member-id")
    setSearchParams(searchParams)
    setIsEditRoomFormVisible(false)
  }

  useEffect(() => {
    if (!isLoading && !room) {
      closeFrom()
      toast.error("Error, Member Not Found")
    }
  },[data])

  useEffect(()=>{
    closeFrom()
  },[error])

  useEffect(()=>{
    if (!isEditRoomFormVisible) {
      closeFrom()
    }
  },[isEditRoomFormVisible])

  function handleSubmit ({ capacity, hourlyRate, name, status }: TFormFields) {
    if (!isSubmitting) {
      mutate({
        roomId,
        payload: {
          capacity: Number(capacity),
          hourlyRate: Number(hourlyRate),
          status: status.value,
          name
        }
      },{
        onSuccess:() => {
          setIsEditRoomFormVisible(false)
          methods.reset()
        }
      })
    }
  }

  return (
    <Dialog
      open={isEditRoomFormVisible}
      onOpenChange={setIsEditRoomFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            تعديل الغرفة            
          </DialogTitle>
        </DialogHeader>
        { error && <Error>{error.message}</Error>}
        {
          !isLoading ? (
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
                      setIsEditRoomFormVisible(false)
                    }}
                  >
                    إلغاء
                  </Button>
                  <Button
                    disabled={isSubmitting} 
                    type="submit"
                  >
                    تعديل الغرفة
                  </Button>
                </div>
              </DialogFooter>
            </Form>
          ) : <Spinner/>
        }
      </DialogContent>
    </Dialog>
  )
}

export default EditRoomForm


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