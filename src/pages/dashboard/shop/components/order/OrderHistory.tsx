import React from "react";
import OrderSimple from "./OrderSimple";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/appSlice";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();
  const sortedOrders = useSelector((state: RootState) => state.orders.shopOrders.sortedOrders);
  const orderHistory = sortedOrders?.slice(0, 4) || [];
  return (
    <div className="bg-white rounded-2xl p-8  w-[400px] shrink-0 h-full shadow flex flex-col gap-6">
      <div className=" border-b-2 border-[#D6D6D8]">
        <p className=" text-xl font-medium text-center py-5">Order History</p>
      </div>
      <div className=" space-y-5 flex-grow">
        {orderHistory.map((order) => (
          <OrderSimple order={order} />
        ))}
      </div>
      <button
        onClick={() => navigate("/dashboard/shop/order/open")}
        className=" h-12 w-full text-white bg-cash-get-dark-300 font-semibold rounded-lg"
      >
        View More
      </button>
    </div>
  );
};

export default OrderHistory;
