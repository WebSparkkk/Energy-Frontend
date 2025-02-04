import BarTable from "./components/BarTable"
import BarToolBar from "./components/BarToolBar"

function BarPage() {
  
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">المطبخ</h1>
        <p className="text-gray-600">إدارة عناصر الطلب</p>
      </div>
      <BarToolBar/>
      <BarTable/>
    </div>
  )
}

export default BarPage