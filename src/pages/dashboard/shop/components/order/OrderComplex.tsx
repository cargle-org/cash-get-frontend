import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IOrderListItem } from "../../../../../services/types";
import moment from "moment";
import { nairaCurrencyFormatter } from "../../../../../utils/misc";
import useModal from "../../../../../context/modal";
import OrderCollectionSimple from "./OrderCollectionSimple";

interface IOrderComplex {
  order: IOrderListItem;
}

const OrderComplex: React.FC<IOrderComplex> = (props) => {
  const { order } = props;
  const { openModal } = useModal();

  return (
    <div className=" w-full rounded-b-3xl shadow">
      <div className="py-4 px-8 bg-cash-get-dark-500 rounded-t-lg flex justify-between items-center">
        <span className=" py-1 rounded px-7 bg-[#0361F0] text-white text-lg font-medium">{order.status}</span>
        <span className="py-1 rounded px-7 bg-cash-get-dark-300 text-white text-lg font-medium">{moment(order.deliveryPeriod).format("hh:mmA")}</span>
      </div>
      <div className="rounded-b-3xl bg-white overflow-hidden ">
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#D6D6D8]">
          <div className="flex items-center gap-4">
            <FiShoppingCart size={32} />
            <span className=" text-xl font-semibold">#{order.id}</span>
          </div>
          <p className=" text-4xl font-bold">{nairaCurrencyFormatter(order.amount)}</p>
        </div>
        {order.orderCollections && (
          <>
            {order.orderCollections?.map((oC) => (
              <OrderCollectionSimple
                key={oC.id}
                agentName={oC.agentName}
                agentNo={oC.agentNo}
                amount={oC.amount}
                collectionProgressStatus={oC.collectionProgressStatus}
                collectionStatus={oC.collectionStatus}
                id={oC.id}
              />
            ))}
          </>
        )}

        <div className="flex justify-center py-6 ">
          <button onClick={() => openModal("shop-view-order", order.id)} className="px-14 py-2 rounded-lg bg-cash-get-dark-400 text-white">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderComplex;
