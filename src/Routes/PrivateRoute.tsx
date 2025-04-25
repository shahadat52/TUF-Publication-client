import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { TAuth } from "../interface/auth";



const PrivateRoute = () => {
  const { user } = useAppSelector((state: TAuth) => state?.auth?.auth);
  return user && (user?.role === 'admin' || user?.role === 'superAdmin') ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;