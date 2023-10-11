import React from "react";
import { FiChevronRight, FiShoppingCart } from "react-icons/fi";
import { IOrderListItem } from "../../../../../services/types";
import moment from "moment";
import { nairaCurrencyFormatter } from "../../../../../utils/misc";
import useModal from "../../../../../context/modal";
import { orderApi } from "../../../../../services/order.service";

interface IOrderComplex {
  order: IOrderListItem;
}

const OrderComplex: React.FC<IOrderComplex> = (props) => {
  const { order } = props;
  const { openModal } = useModal();
  const { data } = orderApi.useGetSingleOrderQuery(order.id);
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
        {data?.data?.orderCollections && (
          <>
            {data.data.orderCollections.map((oC) => (
              <div className="px-8 py-6 border-b border-[#D6D6D8]">
                <div className=" flex items-center justify-between w-full">
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{nairaCurrencyFormatter(oC.amount)}</p>
                    <p className="text-sm text-cash-get-dark-400">{oC.collectionProgressStatus}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-cash-get-dark-200">Agent Name</p>
                    <p className="text-sm text-cash-get-dark-400">{oC.agent?.name}</p>
                  </div>
                  <div className="space-y-2 text-right">
                    <p className="text-sm text-cash-get-dark-200">Agent Number</p>
                    <p className="text-sm text-cash-get-dark-400">{oC?.agent?.phoneNo}</p>
                  </div>
                  <div className="space-y-2 text-right">
                    <FiChevronRight size={32} role="button" />
                  </div>
                </div>
              </div>
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
