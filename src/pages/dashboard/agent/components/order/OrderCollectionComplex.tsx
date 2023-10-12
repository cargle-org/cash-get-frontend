import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import useModal from "../../../../../context/modal";
import { nairaCurrencyFormatter } from "../../../../../utils/misc";
import moment from "moment";
import { IOrderCollectionListItem } from "../../../../../services/types";

interface IOrderCollectionComplex {
  orderCollection: IOrderCollectionListItem;
}

const OrderCollectionComplex: React.FC<IOrderCollectionComplex> = (props) => {
  const { openModal } = useModal();
  const { orderCollection } = props;
  return (
    <div className=" w-full rounded-b-3xl shadow">
      <div className="py-4 px-8 bg-cash-get-dark-500 rounded-t-lg flex justify-between items-center">
        <span className=" py-1 rounded px-7 bg-[#0361F0] text-white text-lg font-medium">{orderCollection?.collectionProgressStatus}</span>
        <span className="py-1 rounded px-7 bg-cash-get-dark-300 text-white text-lg font-medium">
          {moment(orderCollection.deliveryPeriod).format("hh:mmA")}
        </span>
      </div>
      <div className="rounded-b-3xl bg-white overflow-hidden ">
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#D6D6D8]">
          <div className="flex items-center gap-4">
            <FiShoppingCart size={32} />
            <span className=" text-xl font-semibold">#{orderCollection.orderId}</span>
          </div>
          <p className=" text-4xl font-bold">
            {nairaCurrencyFormatter(orderCollection.amount)} <span className=" text-xs font-light">({orderCollection.collectionStatus})</span>
          </p>
        </div>
        <div className="px-8 py-6">
          <div className=" flex items-center justify-between w-full">
            <div className="space-y-2">
              <p className="text-sm text-cash-get-dark-200">Shop Name</p>
              <p className="text-sm text-cash-get-dark-400">{orderCollection?.shopName}</p>
            </div>
            <div className="space-y-2 text-right">
              <p className="text-sm text-cash-get-dark-200">Shop Address</p>
              <p className="text-sm text-cash-get-dark-400">{orderCollection?.shopAddress}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-6">
          <button
            onClick={() => openModal("agent-view-order-collection", orderCollection.id)}
            className="px-14 py-2 rounded-lg bg-cash-get-dark-400 text-white"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCollectionComplex;
