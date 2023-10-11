import React from "react";
import OrderComplex from "../../components/order/OrderComplex";
import OrderHistory from "../../components/order/OrderHistory";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/appSlice";

const DashboardShopActiveOrders = () => {
  const activeOrders = useSelector((state: RootState) => state.orders.shopOrders.activeOrders);
  return (
    <section className="flex gap-8 h-full pb-5">
      <div className=" flex-grow  rounded-2xl  overflow-auto space-y-8">
        {activeOrders.map((order) => (
          <OrderComplex order={order} />
        ))}
      </div>
      <OrderHistory />
    </section>
  );
};

export default DashboardShopActiveOrders;
