import { Button } from "@/core/components/ui/button"
import { Input } from "@/core/components/form/input"
import { Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebounce } from "use-debounce"
import { TUserProviderValue, useUsersProvider } from "../UsersPage"

export default function SearchBar() {

  const [ searchParams, setSearchParams ] = useSearchParams()
  const initSearchValue = searchParams.get("search") || ""
  const [ value, setValue ] = useState<string>(initSearchValue)
  const [debouncedValue] = useDebounce(value, 300)
  
  
  const { 
    setIsAddUserFormVisible 
  } = useUsersProvider() as TUserProviderValue

  useEffect(()=>{
    searchParams.set("search",debouncedValue)
    setSearchParams(searchParams)
  },[debouncedValue])

  const toggleAddMemberFormVisibility = () => {
    setIsAddUserFormVisible(true)
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="relative flex-1 sm:flex-none">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="بحث..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full sm:w-64 pr-10"
        />
      </div>
      <Button
        onClick={toggleAddMemberFormVisibility} 
        className="w-full sm:w-auto"
      >
        <Plus className="h-5 w-5 ml-2" />
        إضافة مستخدم
      </Button>
    </div>
  );
}