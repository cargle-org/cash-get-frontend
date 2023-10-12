import React from "react";
import { IOrderListItem } from "../../../../../services/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/appSlice";
import { nairaCurrencyFormatter } from "../../../../../utils/misc";

interface IOrderSimple {
  order: IOrderListItem;
}

const OrderSimple: React.FC<IOrderSimple> = (props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { order } = props;
  return (
    <button className="flex gap-2 items-center w-full">
      <div className=" h-[60px] w-[60px] rounded-lg bg-cash-get-dark-200 shrink-0"></div>
      <div className=" flex items-center justify-between w-full">
        <div className="space-y-2">
          <p className="text-sm text-cash-get-dark-200">{user?.name}</p>
          <p className="text-sm text-cash-get-dark-400">#{order.id}</p>
        </div>
        <div className="space-y-2 text-right">
          <p className="text-xl font-bold text-cash-get-dark-500">{nairaCurrencyFormatter(order.amount)}</p>
          <p className="text-sm text-cash-get-dark-400">{order.status}</p>
        </div>
      </div>
    </button>
  );
};

export default OrderSimple;
