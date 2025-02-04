import { zodResolver } from "@hookform/resolvers/zod"
import { TMembersProviderValue, useMembersProvider } from "../MembersPage"
import { memberFormSchema } from "../schema"
import { useForm } from "react-hook-form"
import { Dialog } from "@radix-ui/react-dialog"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/core/components/ui/dialog"
import { Form } from "@/core/components/form/form"
import { FormInput } from "@/core/components/form/form-input"
import { Button } from "@/core/components/ui/button"
import { useEditMember } from "../hooks.ts/useEditMember"
import { useGetMember } from "../hooks.ts/useGetMember"
import { useSearchParams } from "react-router-dom"
import Spinner from "@/core/components/ui/spinner"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { z } from "zod"

type TFormFields = z.infer<typeof memberFormSchema>

function EditMemberForm() {
  
  const { 
    isEditMemberFormVisible,
    setIsEditMemberFormVisible
  } = useMembersProvider() as TMembersProviderValue

  const [searchParams,setSearchParams] = useSearchParams()
  const memberId = searchParams.get("member-id") || ""

  const { data, isLoading, error } = useGetMember(memberId)
  const member = data?.data
  const { mutate, isLoading: isSubmitting } = useEditMember()

  const methods = useForm<TFormFields>({
    defaultValues:{
      name: '',
      contactInfo: '',
    },
    resolver: zodResolver(memberFormSchema),
    values:{
      contactInfo: member?.contactInfo || "",
      name: member?.name || ""
    }
  })

  useEffect(() => {
    if (!isLoading && !member) {
      searchParams.delete("member-id")
      setSearchParams(searchParams)
      setIsEditMemberFormVisible(false)
      toast.error("Error, Member Not Found")
    }
  },[data])

  useEffect(()=>{
    searchParams.delete("member-id")
    setSearchParams(searchParams)
    setIsEditMemberFormVisible(false)
  },[error])

  useEffect(()=>{
    if (!isEditMemberFormVisible) {
      searchParams.delete("member-id")
      setSearchParams(searchParams)
    }
  },[isEditMemberFormVisible])

  function handleSubmit (data: TFormFields) {
    if (!isSubmitting) {
      mutate({
        member:data,
        memberId
      },{
        onSuccess() {
          setIsEditMemberFormVisible(false)
          methods.reset()
        },
      })
    }
  }

  return (
    <Dialog
      open={isEditMemberFormVisible}
      onOpenChange={setIsEditMemberFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            تعديل عضو 
          </DialogTitle>
        </DialogHeader>
        {
          !isLoading ? (
            <Form
              form={methods} 
              handleSubmit={handleSubmit} 
              className="space-y-4"
            >
              <FormInput
                label='الاسم'
                name='name'
                type='text'
              />
              <FormInput
                label='معلومات الاتصال'
                name='contactInfo'
                type='text'
              />

              <DialogFooter className="flex justify-end gap-4 mt-6">
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    setIsEditMemberFormVisible(false)
                  }}
                  disabled={isSubmitting}
                  variant="outline"
                >
                  إلغاء
                </Button>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="default"
                >
                  تعديل عضو
                </Button>
              </DialogFooter>
            </Form>  
          ) : <Spinner/>
        }
      </DialogContent> 
    </Dialog>
  );
}

export default EditMemberForm