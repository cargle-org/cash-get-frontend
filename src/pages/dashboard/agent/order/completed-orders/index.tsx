import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/appSlice";
import OrderComplex from "../../components/order/OrderComplex";
import OrderHistory from "../../components/order/OrderHistory";

const DashboardShopCompletedOrders = () => {
  const completedOrders = useSelector((state: RootState) => state.orders.shopOrders.closedOrders);
  return (
    <section className="flex gap-8 h-full pb-5">
      <div className=" flex-grow  rounded-2xl  overflow-auto space-y-8">
        {completedOrders.length > 0 ? (
          completedOrders.map((order) => <OrderComplex order={order} />)
        ) : (
          <div className=" text-center">No Orders Available</div>
        )}
      </div>
      <OrderHistory />
    </section>
  );
};

export default DashboardShopCompletedOrders;
