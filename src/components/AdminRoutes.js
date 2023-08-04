import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {

  const { userInfo } = useSelector((store) => store.userInfo);
  return userInfo.isAdmin === true ? <Outlet /> : <Navigate to='/' replace />
}
export default AdminRoutes