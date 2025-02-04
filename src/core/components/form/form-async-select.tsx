import { ComponentProps, useId } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import AsyncSelect from './async-select'


type TFormAsyncSelectProps = {
  label?: string,
  name: string,
  showValidationMessage?: boolean
} & ComponentProps<typeof AsyncSelect>

function FormAsyncSelect({ label, name, showValidationMessage, ...props }: TFormAsyncSelectProps) {
  
  if (!name)
    throw new Error("FormAsyncSelect Component Must Be Provided With Name Props")
  
  const { control } = useFormContext()
  const selectId = useId()

  return (
    <Controller
      name={name}
      control={control}
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
            <AsyncSelect
              {...field}
              {...props}
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


export default FormAsyncSelect