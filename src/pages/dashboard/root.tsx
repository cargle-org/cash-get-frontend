import { Navigate, Route, Routes } from "react-router-dom";
import DashboardAgentRoutes from "./agent/root";
import DashboardShopRoutes from "./shop/root";
import { pathTo } from "../../routes/routing";
import { useSelector } from "react-redux";
import { RootState } from "../../store/appSlice";
import { UserEnum } from "../../services/types";

const DashboardRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Routes>
      <Route
        index
        element={user?.role === UserEnum.AGENT ? <Navigate to={`${pathTo.dashbaordAgent}`} /> : <Navigate to={`${pathTo.dashboardShop}`} />}
      />
      <Route path={`${pathTo.dashboardShop}/*`} element={<DashboardShopRoutes />} />
      <Route path={`${pathTo.dashbaordAgent}/*`} element={<DashboardAgentRoutes />} />
    </Routes>
  );
};

export default DashboardRoutes;
