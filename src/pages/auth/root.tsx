import { Navigate, Route, Routes } from "react-router-dom";
import Logout from "./logout";
import SignIn from "./sign-in";
import { pathTo } from "../../routes/routing";

const AuthRoutes = () => (
  <Routes>
    <Route index element={<Navigate to={pathTo.signIn} />} />
    <Route path={`${pathTo.signIn}`} element={<SignIn />} />
    <Route path={`${pathTo.logout}`} element={<Logout />} />
    <Route path="/*" element={<Navigate to={`/${pathTo[404]}`} />} />
  </Routes>
);

export default AuthRoutes;
