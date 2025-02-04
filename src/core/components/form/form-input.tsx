import { forwardRef, useId } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Input } from "./input.v2";
import { TInputProps } from "./input.v2"

type TFormInputProps = {
  showValidationMessage?:boolean,
  label?: string,
} & TInputProps

export const FormInput = forwardRef<HTMLInputElement, TFormInputProps>(
  function ({ 
    name, 
    showValidationMessage = true, 
    label, 
    ...props 
  }, ref) {

    if (!name)
      throw new Error("FormInput Component Must Be Provided With Name Props")
    
    const { control } = useFormContext()
    const inputId = useId()

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
                    htmlFor={inputId}
                  >
                    {label} {error ? <span className="text-red-600">*</span> : ''}
                  </label>
                ) : <></>
              }
              <Input
                {...field}
                ref={ref}
                id={inputId}
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
)

FormInput.displayName = "FormInput"