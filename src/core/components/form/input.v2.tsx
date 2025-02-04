import { ComponentProps, forwardRef, ReactNode, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export type TInputProps = {
  rightIcon?: ReactNode | null,
  leftIcon?: ReactNode | null  
} & ComponentProps<"input">

const Input = forwardRef<HTMLInputElement, TInputProps>(
  ({ type, leftIcon = null, rightIcon = null, className, ...props }, ref) => {
    const [ inputType, setInputType ] = useState<TInputProps["type"]>(type)
    
    const isPassword = type === "password"

    return (
      <div className='relative flex items-center'>
        { 
          rightIcon && (
            <div className="w-[32px] absolute top-0 right-0 h-full items-center justify-center flex pr-3">
              {rightIcon}
            </div>
          )
        }
        <input
          type={inputType}
          className={`
            ${rightIcon && "pr-9"}
            ${leftIcon || isPassword && "pr-9"}
            ${leftIcon && isPassword && "pr-20"}
            ${className}
          `}
          ref={ref}
          {...props}
        />
        <div className="absolute left-3 h-full items-center flex">
          {
            isPassword && (
              <button 
                disabled={props.disabled}
                onClick={(e) => {
                  e.preventDefault()
                  setInputType(inputType === "text" ? "password" : 'text')
                }}
                className="hover:bg-zinc-200 p-1 rounded-md duration-100 cursor-pointer text-[1rem] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-transparent"
              >
                { 
                  inputType === "password" ? 
                  <FaEyeSlash /> : 
                  <FaEye /> 
                }
              </button>
            )
          }
          { 
            leftIcon && (
              <div>
                {leftIcon}
              </div>
            )  
          }
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }