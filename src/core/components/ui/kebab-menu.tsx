import { AnimatePresence, motion } from "motion/react"
import { ReactNode, useId, useState } from "react"
import { opacityFadeAnimation } from "../../lib/animations"
import { useOutsideClick } from "../../hooks/useClickOutside"

type TKebabMenuProps = {
  label: ReactNode,
  labelClassName?: string
  options:{
    label: string,
    action?: Function,
    icon?: ReactNode,
    className?: string,
    disabled?: boolean
  }[],
  optionsLabel?: string
}

function KebabMenu({
  label,
  labelClassName,
  options,
  optionsLabel
}: TKebabMenuProps) {

  const [isOpen,setIsOpen] = useState<boolean>(false)

  const id = useId()
  const ref = useOutsideClick<HTMLDivElement>(()=>{
    setIsOpen(false)
  })
  
  return (
    <div 
      onClick={(e) => e.stopPropagation()} 
      className="relative"
    >
      <div 
        onClick={() => {
          setIsOpen(true)
        }}  
        className={`${labelClassName || ""} cursor-pointer`}
      >
        {label}
      </div>
      <AnimatePresence>
        {
          isOpen ? (
            <motion.div 
              ref={ref}
              key={id}
              {...opacityFadeAnimation}
              className="flex flex-col absolute top-[calc(100%+5px)] left-0 bg-zinc-50 rounded-lg p-2 z-[1000] min-w-[120px] shadow-lg py-2 w-max"
            >
              <p className="text-sm text-zinc-800 mb-1 text-left px-2">{optionsLabel}</p>
              <ul className="flex flex-col">
                {
                  options.map((curr,idx) => (
                    <li 
                      onClick={() => {
                        curr.action && !curr.disabled && curr.action()
                        setIsOpen(false)
                      }}
                      className={`
                        ${curr.disabled ? "text-opacity-70 hover:!bg-transparent !cursor-not-allowed" : ""} 
                        flex items-center gap-2 justify-end cursor-pointer px-2 text-left w-full p-1 hover:bg-zinc-200/60 
                        transition-[background-color] duration-120 rounded-sm ${curr.className}
                      `} 
                      key={idx}
                    >
                      <span className="text-sm">{curr.label}</span>
                      <span>{curr.icon}</span>
                    </li>
                  ))
                }
              </ul>
            </motion.div>
          ) : <></>
        }
      </AnimatePresence>
    </div>
  )
}

export default KebabMenu