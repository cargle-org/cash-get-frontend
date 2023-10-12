import React from "react";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { linkTo, pathTo } from "../../../../../routes/routing";
import { useDispatch } from "react-redux";
import { logout } from "../../../../../store/authSlice";

const DashboardShopSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const naviagte = useNavigate();
  const onClickLogout = () => {
    dispatch(logout());
    naviagte(`/${pathTo.auth}`);
  };
  return (
    <aside className="w-44 bg-white shadow shrink-0 rounded-tr py-14 flex-col flex">
      <div className=" flex-grow">
        <h2 className=" text-2xl font-medium text-cash-get-dark-500 text-center">Dashboard</h2>
        <nav className="mt-8">
          <ul className=" space-y-6">
            <li className="">
              <NavLink
                to={linkTo.dashboardCreateOrder()}
                className={({ isActive }) =>
                  (isActive ? "bg-cash-get-dark-500 text-white" : " bg-transparent text-cash-get-dark-500") + " text-center font-medium py-3 block"
                }
              >
                Create Order
              </NavLink>
            </li>

            <li className="">
              <NavLink
                to={linkTo.dashboardOrder()}
                className={({ isActive }) =>
                  (isActive ? "bg-cash-get-dark-200 text-white" : " bg-transparent text-cash-get-dark-500") + " text-center font-medium py-3 block"
                }
              >
                My Orders
              </NavLink>
              {location.pathname.includes(`/${linkTo.dashboardOrder()}`) && (
                <ul className="mt-px">
                  <li className="">
                    <NavLink
                      to={`${linkTo.dashboardOrder()}/${linkTo.dashboardActiveOrders()}`}
                      className={({ isActive }) =>
                        (isActive ? "bg-cash-get-dark-500 text-white" : " bg-transparent text-cash-get-dark-500") +
                        " text-center text-xs font-medium py-3 block"
                      }
                    >
                      Active Order
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to={`${linkTo.dashboardOrder()}/${linkTo.dashboardOpenOrders()}`}
                      className={({ isActive }) =>
                        (isActive ? "bg-cash-get-dark-500 text-white" : " bg-transparent text-cash-get-dark-500") +
                        " text-center text-xs font-medium py-3 block"
                      }
                    >
                      Open Order
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink
                      to={`${linkTo.dashboardOrder()}/${linkTo.dashboardCompletedOrders()}`}
                      className={({ isActive }) =>
                        (isActive ? "bg-cash-get-dark-500 text-white" : " bg-transparent text-cash-get-dark-500") +
                        " text-center text-xs font-medium py-3 block"
                      }
                    >
                      Completed Order
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-shrink-0 pl-10">
        <button className="flex items-center gap-2" onClick={onClickLogout}>
          <FiLogOut size={32} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardShopSidebar;
