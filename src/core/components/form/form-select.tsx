import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form"
import { Select, TSelectProps } from "@/core/components/form/select"

type TFormSelectProps = {
  name: string,
  label?: string,
  showValidationMessage?:boolean,
} & TSelectProps

function FormSelect({ 
  options, 
  placeholder, 
  className, 
  name,
  label,
  showValidationMessage = true, 
}: TFormSelectProps) {

  if (!name)
    throw new Error("FormInput Component Must Be Provided With Name Props")
  
  const { control } = useFormContext()
  const selectId = useId()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const error = fieldState.error
        return (
          <>
            {
              label ? (
                <label
                  className={`font-[500] capitalize ${error ? 'text-red-600' : ''}`}
                  htmlFor={selectId}
                >
                  {label} {error ? <span className="text-red-600">*</span> : ''}
                </label>
              ) : <></>
            }
            <Select
              {...field}
              placeholder={placeholder}
              className={className}
              options={options}
              id={selectId}
            />
            {
              showValidationMessage && 
              fieldState.error && 
              <p className="text-red-500 capitalize text-[12px] mt-2">{fieldState.error.message}</p>
            }
          </>
        )
      }}
    />
  )
}

export default FormSelect


