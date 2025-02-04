import { ComponentProps, forwardRef, useState } from "react"
import Async from "react-select/async"
import { getSelectStyles } from "./constants"


type TSelectOption = {
  label: string,
  value: string,
  other?: any,
}

type TAsyncSelectProps = {
  fetchOptions: (query: string) => Promise<TSelectOption[]>,
  dependencyString?: string,
} & ComponentProps<typeof Async>

const AsyncSelect = forwardRef<any,TAsyncSelectProps>(function ({ 
  fetchOptions, 
  dependencyString, 
  noOptionsMessage,
  ...props 
}, ref) {
  const [isLoading,setIsLoading] = useState<boolean>(false)

  async function loadOptions (inputValue: string) {
    let options:TSelectOption[] = []
    setIsLoading(true)
    try {
      options = await fetchOptions(inputValue)
    }finally {
      setIsLoading(false)
    }
    return options
  }

  return (
    <Async
      ref={ref}
      isClearable={true}
      loadOptions={loadOptions}
      isLoading={isLoading}
      onFocus={() => setIsLoading(false)}
      key={dependencyString}
      noOptionsMessage={noOptionsMessage ? noOptionsMessage : _ => "لا يوجد بيانات"}
      loadingMessage={_ => "جاري جلب البيانات"}
      styles={getSelectStyles("async")}
      {...props}
    />
  )
})

export default AsyncSelect