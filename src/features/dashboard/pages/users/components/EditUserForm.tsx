import { Button } from '@/core/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/core/components/ui/dialog'
import { Form } from '@/core/components/form/form'
import { FormInput } from '@/core/components/form/form-input'
import FormSelect from '@/core/components/form/form-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TUserProviderValue, useUsersProvider } from '../UsersPage'
import { editUserFormSchema } from '../schema'
import { useEditUser } from '../hooks/useEditUser'
import { useGetUser } from '../hooks/useGetUser'
import { useSearchParams } from 'react-router-dom'
import Spinner from '@/core/components/ui/spinner'
import { useEffect } from 'react'
import { USER_ROLES } from '@/features/auth/login/types'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { IEditUserPayload } from '../types'

type TFormFields = z.infer<typeof editUserFormSchema>

function EditUserForm() {
  const { 
    isEditUserFormVisible,
    setIsEditUserFormVisible 
  } = useUsersProvider() as TUserProviderValue

  const [searchParams, setSearchParams] = useSearchParams()
  const userId = searchParams.get("user-id") || ""
  
  const { data, isLoading, error } = useGetUser(userId)
  const user = data?.data

  const { mutate, isLoading: isSubmitting } = useEditUser()

  const methods = useForm<TFormFields>({
    defaultValues:{
      username: "",
      email: "",
      password: "",
      role: roles[2],
      dailyRate: "0"
    },
    resolver: zodResolver(editUserFormSchema),
    values: {
      dailyRate: user?.dailyRate?.toString() || "0",
      email: user?.email || "",
      password: "",
      role: roles.find(curr => curr.value === user?.role) || roles[2],
      username: user?.username || "",
    }
  })

  useEffect(() => {
    if (!isLoading && !user) {
      searchParams.delete("user-id")
      setSearchParams(searchParams)
      setIsEditUserFormVisible(false)
      toast.error("Error, User Not Found")
    }
  },[data])

  useEffect(()=>{
    searchParams.delete("user-id")
    setSearchParams(searchParams)
    setIsEditUserFormVisible(false)
  },[error])

  useEffect(()=>{
    if (!isEditUserFormVisible) {
      searchParams.delete("user-id")
      setSearchParams(searchParams)
    }
  },[isEditUserFormVisible])

  function handleSubmit(fields: TFormFields) {
    const payload: IEditUserPayload = {
      dailyRate: Number(fields.dailyRate),
      email: fields.email,
      role: fields.role.value,
      username: fields.username
    }

    if (!!fields.password)
      payload.password = fields.password
    
    mutate({
      user: payload,
      userId
    }, {
      onSuccess:()=>{
        searchParams.delete("user-id")
        setSearchParams(searchParams)
        setIsEditUserFormVisible(false)
        methods.reset()
      }
    })
  }

  return (
    <Dialog
      open={isEditUserFormVisible}
      onOpenChange={setIsEditUserFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            تعديل مستخدم    
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
                label='اسم المستخدم'
                type='text'
                name='username'
              />
              <FormInput
                label="كلمة المرور"
                type='password'
                name='password'
              />
              <FormInput
                label="البريد الإلكتروني"
                type='email'
                name='email'
              />
              <FormInput
                label="التقييم اليومي"
                type='number'
                name='dailyRate'
              />
              <FormSelect
                name='role'
                label='اختيار دور المستخدم'
                options={roles}
                placeholder='اختيار دور المستخدم'
              />

              <DialogFooter className="flex justify-end gap-4 mt-6">
                <Button
                  type="button" 
                  disabled={isLoading || isSubmitting}
                  variant="outline" 
                  onClick={(e) => {
                    e.preventDefault()
                    setIsEditUserFormVisible(false)
                  }}
                >
                  إلغاء
                </Button>
                <Button disabled={isLoading || isSubmitting} type="submit">
                  تعديل مستخدم
                </Button>
              </DialogFooter>
            </Form>
          ) : <Spinner/>
        }
      </DialogContent>
    </Dialog>
  );
}

export default EditUserForm



const roles: { 
  value: USER_ROLES; 
  label: string,
}[] = [
  { 
    value: USER_ROLES.MANAGER, 
    label: 'مدير' 
  },
  { 
    value:  USER_ROLES.CASHIER, 
    label: 'كاشير' 
  },
  { 
    value: USER_ROLES.EMPLOYEE, 
    label: 'موظف' 
  },
  { 
    value: USER_ROLES.CHIEF, 
    label: 'شيف' 
  },
];