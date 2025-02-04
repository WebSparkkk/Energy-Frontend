const variants = {
  red: "text-red-500 bg-red-100",
  blue: "text-blue-500 bg-blue-100",
  yellow: "text-yellow-500 bg-yellow-100",
  green: "text-green-500 bg-green-100",
  gray: "text-gray-500 bg-gray-100",
  orange: "text-orange-500 bg-orange-100",
  purple: "text-purple-500 bg-purple-100",
}

export type TTagColorVariant = keyof typeof variants

type TTagProps = {
  variant: TTagColorVariant,
  className?: string
} & TChildren

function Tag({ children, variant, className }: TTagProps) {
  return (
    <span className={`${variants[variant]} rounded-full py-2 px-4 leading-[10px]${className ? " "+className : ""}`}>{children}</span>
  )
}

export default Tag