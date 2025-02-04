import SearchBar from './components/SearchBar';
import MembersTable from './components/MembersTable';
import AddMemberForm from './components/AddMemberForm';
import { createContext, Dispatch, useContext, useState } from 'react';
import EditMemberForm from './components/EditMemberForm';

export type TMembersProviderValue = {
  isAddMemberFormVisible: boolean,
  setIsAddMemberFormVisible: Dispatch<boolean>,
  isEditMemberFormVisible: boolean,
  setIsEditMemberFormVisible: Dispatch<boolean>
}
const MembersContext = createContext<TMembersProviderValue|undefined>(undefined)

export function useMembersProvider () {
  if (MembersContext === undefined)
    throw new Error("Cannot Use useMembersProvider outside MembersPage")
  return useContext(MembersContext)
}


export default function MembersPage() {

  const [ isAddMemberFormVisible, setIsAddMemberFormVisible ] = useState<boolean>(false)
  const [ isEditMemberFormVisible, setIsEditMemberFormVisible ] = useState<boolean>(false)
  
  return (
    <MembersContext.Provider 
      value={{
        isAddMemberFormVisible,
        setIsAddMemberFormVisible,
        setIsEditMemberFormVisible,
        isEditMemberFormVisible
      }}
    >   
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">إدارة الأعضاء</h1>
          <p className="text-gray-600">إدارة وتتبع جميع أعضاء مساحات العمل</p>
        </div>

        <SearchBar/>
        <MembersTable/>
        <AddMemberForm/>
        <EditMemberForm/>
      </div>
    </MembersContext.Provider>
  );
}