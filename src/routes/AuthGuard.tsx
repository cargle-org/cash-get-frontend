import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/appSlice";

const AuthGuard = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const isAuthenticated = () => {
    if (!token) {
      return false;
    }
    return true;
  };
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth/logout" />;
};

export default AuthGuard;
