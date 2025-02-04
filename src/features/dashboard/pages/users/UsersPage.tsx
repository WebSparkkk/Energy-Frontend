import UsersTable from './components/UsersTable';
import UsersToolbar from './components/SearchBar';
import { createContext, Dispatch, useContext, useState } from 'react';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';


export type TUserProviderValue = {
  isAddUserFormVisible: boolean ,
  setIsAddUserFormVisible: Dispatch<boolean>,
  isEditUserFormVisible: boolean,
  setIsEditUserFormVisible: Dispatch<boolean>
}
const UsersContext = createContext<TUserProviderValue|undefined>(undefined)

export function useUsersProvider () {
  if (UsersContext === undefined)
    throw new Error("Cannot Use useUsersProvider outside UsersPage")
  return useContext(UsersContext)
}

export default function UsersPage() {

  const [ isAddUserFormVisible, setIsAddUserFormVisible ] = useState<boolean>(false)
  const [ isEditUserFormVisible, setIsEditUserFormVisible ] = useState<boolean>(false)

  return (
    <UsersContext.Provider 
      value={{
        isAddUserFormVisible,
        setIsAddUserFormVisible,
        setIsEditUserFormVisible,
        isEditUserFormVisible
      }}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h1>
          <p className="text-gray-600">إدارة صلاحيات الوصول للوحة التحكم</p>
        </div>
        <UsersToolbar/>
        <UsersTable/>
        <AddUserForm/>
        <EditUserForm/>
      </div>
    </UsersContext.Provider>
  );
}