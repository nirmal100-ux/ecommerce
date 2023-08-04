import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {

  const { userInfo } = useSelector((store) => store.userInfo);
  return userInfo === null ? <Outlet /> : <Navigate to='/' replace />
}
export default AuthRoutes