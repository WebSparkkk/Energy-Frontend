import { ComponentProps, createContext, ReactElement, useContext } from "react"

type TTableProviderValue = {
  columns: string,
}

const TableContext = createContext<TTableProviderValue | undefined>(undefined)
const useTableProvider = () => {
  if (TableContext === undefined)
    throw new Error("You Cannot Use Any Table Component Outside The Table")
  return useContext(TableContext)
}

type TTableProps = {
  columns: string,
  className?: string
} & TChildren

export default function Table({ columns, children, className }: TTableProps) {

  return (
    <TableContext.Provider value={{
      columns
    }}>
      <div className={`table ${className || ""}`}>
        { children }
      </div>
    </TableContext.Provider>
  )
}


function Body<T> ({
  className,
  data,
  render
}:{
  className?: string,
  data: T[],
  render: (item: T) => ReactElement,
}) {

  return (
    data.length ? (
      <div className={`table_body ${className || ""}`}>
        {
          data.map((curr) => render(curr))
        }
      </div>
    ) : (
      <div className={`table_body empty ${className||""}`}>
        <p className="text-center font-semibold">لا توجد بيانات حتى الآن </p>
      </div>
    )
  )
}

function Footer ({ children, className }: {
  className?: string
} & TChildren) {
  return (
    <div className={`table_footer ${className || ""}`}>
      {children}
    </div>
  )
}

function Header ({ children, className }: {
  className?: string
} & TChildren) {
  const { columns } = useTableProvider() as TTableProviderValue

  return (
    <div 
      className={`table_header ${columns} ${className || ""}`}
    >
      {children}
    </div>
  )
}

function Row ({ children, className, ...props }: ComponentProps<"div">) {
  const { columns } = useTableProvider() as TTableProviderValue

  return (
    <div 
      {...props}
      className={`table_row ${columns} ${className || ""}`}
    > 
      { children }
    </div>
  )
}

function Cell ({
  children,
  className
}:{
  className?: string
} & TChildren) {

  return (
    <div className={`table_cell ${className || ""}`}> 
      { children }
    </div>
  )
}


Table.Row = Row
Table.Cell = Cell
Table.Body = Body
Table.Footer = Footer
Table.Header = Header