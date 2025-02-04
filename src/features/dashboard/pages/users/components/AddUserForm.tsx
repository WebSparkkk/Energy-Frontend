import { Button } from '@/core/components/ui/button';
import { USER_ROLES } from '@/features/auth/login/types';
import { FormInput } from '@/core/components/form/form-input';
import { Form } from '@/core/components/form/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormSelect from '@/core/components/form/form-select';
import { TUserProviderValue, useUsersProvider } from '../UsersPage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateUser } from '../hooks/useCreateUser';
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogContent } from '@/core/components/ui/dialog';
import { userFormSchema } from '../schema';


type TFormFields = z.infer<typeof userFormSchema>

export default function AddUserForm() {
  
  const { 
    isAddUserFormVisible,
    setIsAddUserFormVisible 
  } = useUsersProvider() as TUserProviderValue
  const { mutate, isLoading } = useCreateUser()

  const methods = useForm<TFormFields>({
    defaultValues:{
      username: "",
      email: "",
      password: "",
      role: roles[2],
      dailyRate: "0"
    },
    resolver: zodResolver(userFormSchema)
  })


  function handleSubmit({ dailyRate, email, password, role, username}: TFormFields) {
    mutate({
      dailyRate: +dailyRate,
      email,
      password,
      role:role.value,
      username
    }, {
      onSuccess:()=>{
        setIsAddUserFormVisible(false)
        methods.reset()
      }
    })
  }

  return (
    <Dialog 
      open={isAddUserFormVisible}
      onOpenChange={setIsAddUserFormVisible}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            إضافة مستخدم جديد   
          </DialogTitle>
        </DialogHeader>

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
              disabled={isLoading}
              variant="outline" 
              onClick={(e) => {
                e.preventDefault()
                setIsAddUserFormVisible(false)
              }}
            >
              إلغاء
            </Button>
            <Button disabled={isLoading} type="submit">
              إضافة مستخدم
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
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
];