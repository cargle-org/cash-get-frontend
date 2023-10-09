import { Route, Routes } from "react-router-dom";
import DashboardShopRoutes from "./agent/root";
import DashboardAgentRoutes from "./shop/root";
import { pathTo } from "../../routes/routing";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path={`${pathTo.dashboardShop}/*`} element={<DashboardShopRoutes />} />
      <Route path={`${pathTo.dashbaordAgent}/*`} element={<DashboardAgentRoutes />} />
    </Routes>
  );
};

export default DashboardRoutes;
