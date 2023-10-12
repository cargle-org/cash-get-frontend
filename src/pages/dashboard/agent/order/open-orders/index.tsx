import React from "react";
import OrderComplex from "../../components/order/OrderComplex";
import OrderHistory from "../../components/order/OrderHistory";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/appSlice";

const DashboardShopOpenOrders = () => {
  const openOrders = useSelector((state: RootState) => state.orders.agentOrders.openOrders);
  return (
    <section className="flex gap-8 h-full pb-5">
      <div className=" flex-grow  rounded-2xl  overflow-auto  space-y-8">
        {openOrders.map((order) => (
          <OrderComplex order={order} />
        ))}
      </div>
      <OrderHistory />
    </section>
  );
};

export default DashboardShopOpenOrders;
