import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardShopLayout from "./components/layout";
import { pathTo } from "../../../routes/routing";
import CreateOrder from "./create-order";
import DashboardShopOrderRoutes from "./order/root";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/appSlice";
import { firebaseService } from "../../../services/firebase.service";

const DashboardShopRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const removeOrderListener = firebaseService.listenForOrders(user!.id, user!.role);
    const removerOrderCollectionListener = firebaseService.listenForOrderCollections(user!.id);
    return () => {
      removeOrderListener();
      removerOrderCollectionListener();
    };
  }, []);
  return (
    <Routes>
      <Route index element={<Navigate to={`${pathTo.dashboardCreateOrder}`} />} />
      <Route element={<DashboardShopLayout />}>
        <Route path={`${pathTo.dashboardCreateOrder}`} element={<CreateOrder />} />
        <Route path={`${pathTo.dashboardOrder}/*`} element={<DashboardShopOrderRoutes />} />
      </Route>
    </Routes>
  );
};

export default DashboardShopRoutes;
