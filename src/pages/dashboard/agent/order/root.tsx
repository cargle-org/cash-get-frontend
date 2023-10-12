import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { pathTo } from "../../../../routes/routing";
import DashboardShopActiveOrders from "./active-orders";
import DashboardShopCompletedOrders from "./completed-orders";
import DashboardShopOpenOrders from "./open-orders";

const DashboardAgentOrderRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={pathTo.dashboardActiveOrders} />} />
      <Route path={pathTo.dashboardActiveOrders} element={<DashboardShopActiveOrders />} />
      <Route path={pathTo.dashboardOpenOrders} element={<DashboardShopOpenOrders />} />
      <Route path={pathTo.dashboardCompletedOrders} element={<DashboardShopCompletedOrders />} />
    </Routes>
  );
};

export default DashboardAgentOrderRoutes;
