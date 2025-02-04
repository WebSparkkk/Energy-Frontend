import { Button } from "@/core/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/core/components/ui/dialog"
import { Form } from "@/core/components/form/form"
import FormAsyncSelect from "@/core/components/form/form-async-select"
import { useForm } from "react-hook-form"
import { TTimersProviderValue, useTimersProvider } from "../TimerPage"
import { fetchClientsOptions } from "../services"
import { useCreateTimer } from "../hooks/useCreateTimer"
import { z } from "zod"
import { createTimerFormSchema } from "../schema"
import { FormInput } from "@/core/components/form/form-input"
import { zodResolver } from "@hookform/resolvers/zod"

type TFormFields = z.infer<typeof createTimerFormSchema>

export function CreateTimerForm() {
  
  const { mutate, isLoading:isSubmitting } = useCreateTimer()
  const { isAddTimerFormVisible, setIsAddTimerFormVisible } = useTimersProvider() as TTimersProviderValue

  const methods = useForm<TFormFields>({
    defaultValues: {
      client: null as unknown as {
        label: string,
        value: string
      },
      hourlyRate: "0"
    },
    resolver: zodResolver(createTimerFormSchema)
  })

  function handleSubmit ({ client, hourlyRate }: TFormFields) {
    if (!isSubmitting) {
      mutate({
        clientId: client.value,
        hourlyRate: Number(hourlyRate)
      },{
        onSuccess:() => {
          setIsAddTimerFormVisible(false)
          methods.reset()
        }
      })
    }
  }

  return (
    <Dialog
      open={isAddTimerFormVisible}
      onOpenChange={setIsAddTimerFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            أنشئ المؤقت            
          </DialogTitle>
        </DialogHeader>
        <Form
          form={methods}
          handleSubmit={handleSubmit}
          className="space-y-4"
        >
          <FormAsyncSelect
            fetchOptions={fetchClientsOptions}
            label='اختر العميل'
            placeholder='العميل'
            name='client'
          />
          <FormInput
            label="السعر بالساعة"
            name="hourlyRate"
            placeholder="السعر بالساعة"
            type="number"
          />
          <DialogFooter>
            <div className="flex justify-end gap-4">
              <Button
                disabled={isSubmitting} 
                type="button" 
                variant="outline" 
                onClick={(e) => {
                  e.preventDefault()
                  setIsAddTimerFormVisible(false)
                }}
              >
                إلغاء
              </Button>
              <Button
                disabled={isSubmitting} 
                type="submit"
              >
                أنشئ المؤقت
              </Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}