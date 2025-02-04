import ProtectedRoute from "@/core/middlewares/protected-route"
import { USER_ROLES } from "../auth/login/types"
import DashboardLayout from "./_layout/dashboard-layout"

function Dashboard() {
  return (
    <ProtectedRoute 
      withLogout={true}
      redirectTo="/employer/signin"
      roles={[
        USER_ROLES.ADMIN,
        USER_ROLES.CASHIER,
        USER_ROLES.EMPLOYEE,
        USER_ROLES.MANAGER,
      ]}
    >
      <DashboardLayout/>
    </ProtectedRoute>
  )
}

export default Dashboard