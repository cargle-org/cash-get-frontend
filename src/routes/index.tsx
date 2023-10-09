import { Navigate, Route, Routes } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import { linkTo, pathTo } from "./routing";
import DashboardRoutes from "../pages/dashboard/root";
import AuthRoutes from "../pages/auth/root";
import NotFound from "../pages/404";

const IndexRoutes = () => (
  <Routes>
    <Route index element={<Navigate to={`/${linkTo.dashboard()}`} />} />
    <Route path={`${pathTo.auth}/*`} element={<AuthRoutes />} />
    <Route element={<AuthGuard />}>
      <Route path={`${pathTo.dashboard}/*`} element={<DashboardRoutes />} />
    </Route>
    <Route path={`${pathTo["404"]}`} element={<NotFound />} />
    <Route path="/*" element={<Navigate to="/404" />} />
  </Routes>
);

export default IndexRoutes;
