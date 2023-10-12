import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/appSlice";
import { firebaseService } from "../../../services/firebase.service";
import { Navigate, Route, Routes } from "react-router-dom";
import { pathTo } from "../../../routes/routing";
import DashboardAgentLayout from "./components/layout";
import DashboardAgentOrderRoutes from "./order/root";

const DashboardAgentRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const removeOrderListener = firebaseService.listenForOrders(user!.id, user!.role);
    const removerOrderCollectionListener = firebaseService.listenForOrderCollections(user!.id);
    return () => {
      removeOrderListener();
      removerOrderCollectionListener();
    };
  });
  return (
    <Routes>
      <Route index element={<Navigate to={`${pathTo.dashboardOrder}`} />} />
      <Route element={<DashboardAgentLayout />}>
        <Route path={`${pathTo.dashboardOrder}/*`} element={<DashboardAgentOrderRoutes />} />
      </Route>
    </Routes>
  );
};

export default DashboardAgentRoutes;
