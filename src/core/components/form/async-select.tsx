import { ComponentProps, forwardRef, useLayoutEffect, useState } from "react"
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
  const [defaultOptions,setDefaultOptions] = useState<TSelectOption[]>([])

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

  useLayoutEffect(() => {
    (async () => {
      const options = await loadOptions("")
      setDefaultOptions(options)
    })()
  },[])

  return (
    <Async
      ref={ref}
      isClearable={true}
      loadOptions={loadOptions}
      isLoading={isLoading}
      onFocus={() => setIsLoading(false)}
      key={dependencyString}
      defaultOptions={defaultOptions}
      noOptionsMessage={noOptionsMessage ? noOptionsMessage : _ => "لا يوجد بيانات"}
      loadingMessage={_ => "جاري جلب البيانات"}
      styles={getSelectStyles("async")}
      {...props}
    />
  )
})

export default AsyncSelect