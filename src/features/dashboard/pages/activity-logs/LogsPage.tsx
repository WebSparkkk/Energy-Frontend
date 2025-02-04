import ActivityLogViewer from "./components/ActivityLogViewer";

export default function LogsPage() {
  return (
    <div className="p-4 sm:p-6 flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">سجل النشاطات</h1>
        <p className="text-gray-600">عرض وتتبع جميع النشاطات في النظام</p>
      </div>

      <ActivityLogViewer />
      
    </div>
  );
}

