import { useAuth } from "@/contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

interface PrivateRouterProps {
  allowedRoles: string[]
}

export const PrivateRouter = ({ allowedRoles }: PrivateRouterProps) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated() && !user) {
    return <Navigate to={'/login'} replace />
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to={'/not-authorized'} replace />
  }

  return <Outlet />;

}
