import { ReactNode } from "react"

function DataItem({
  label,
  value,
  labelClassName,
  valueClassName
}:{
  label: ReactNode,
  value: ReactNode,
  labelClassName?: string,
  valueClassName?: string
}) {
  return (
    <div className={`flex text-[1rem] items-center gap-5`}>
      <span className={`font-[500] text-secondary-600 ${labelClassName||""}`}>
        <span>{label}</span>
        <span className="text-[1.3rem]"> :</span>
      </span>
      <span className={`font-[500] ${valueClassName||""}`}>{value}</span>
    </div>
  )
}

export default DataItem