import { Outlet } from "react-router-dom";
import DashboardAgentHeader from "./Header";
import DashboardShopSidebar from "./Sidebar";

const DashboardAgentLayout = () => {
  return (
    <main className=" h-screen w-screen flex flex-col bg-cash-get-light-blue ">
      <DashboardAgentHeader />
      <div className="mt-8 flex-grow flex w-full items-stretch gap-8 overflow-hidden pr-8">
        <DashboardShopSidebar />
        <div className=" flex-grow  h-full overflow-hidden">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardAgentLayout;
