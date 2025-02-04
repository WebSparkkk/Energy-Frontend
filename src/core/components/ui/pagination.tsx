import { ChangeEvent, useLayoutEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from './button'
import { Input } from '../form/input'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function Pagination({
  totalPages,
}:{
  totalPages: number
}) {
  const [searchParams,setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  useLayoutEffect(() => {
    const page = Number(searchParams.get("page"))
    if (isNaN(page)) {
      searchParams.set("page","1")
    }else if (page <= 0) {
      searchParams.set("page","1")
    }else if (page > totalPages && totalPages > 0) {
      searchParams.set("page",totalPages.toString())
    }
    setSearchParams(searchParams)
  },[searchParams])

  function handlePaginationInputChange (e: ChangeEvent<HTMLInputElement>) {
    const value = Math.trunc(Number(e.target.value))
    if (value <= totalPages && value > 0) {
      searchParams.set("page",value.toString())
      setSearchParams(searchParams)
    }
  }

  const isNextPageDisabled = currentPage === totalPages || totalPages === 0
  const isPrevPageDisabled = currentPage === 1

  function handleNextPage () {
    if (!isNextPageDisabled) {
      searchParams.set("page",(currentPage + 1).toString())
      setSearchParams(searchParams)
    }
  }

  function handlePrevPage () {
    if (!isPrevPageDisabled) {
      searchParams.set("page",(currentPage - 1).toString())
      setSearchParams(searchParams)
    }
  }

  return (
    <div className='w-full flex justify-between items-center'>
      <div className='text-zinc-600 font-medium flex gap-3 items-center'>
        <span>الصفحة الحالية: </span>
        <Input 
          type='number' 
          min={1} 
          value={currentPage}
          className='w-[70px]'
          onChange={handlePaginationInputChange}
        />
      </div>
      <div className="flex gap-4 items-center">
        <Button 
          disabled={isNextPageDisabled} 
          className='flex items-center gap-3 disabled:cursor-not-allowed disabled:pointer-events-auto'
          onClick={handleNextPage}
        >
          <IoIosArrowForward/>
          الصفحة التالية  
        </Button>
      
        <Button 
          className='flex items-center gap-3 disabled:cursor-not-allowed disabled:pointer-events-auto' 
          disabled={isPrevPageDisabled}
          onClick={handlePrevPage}
        >
          الصفحة السابقة          
          <IoIosArrowBack/>
        </Button>
      </div>
    </div>
  )
}

export default Pagination