import React from "react";
import { nairaCurrencyFormatter } from "../../../../../utils/misc";
import { CollectionProgressStatusEnum, CollectionStatusEnum } from "../../../../../services/types";
import { FiChevronRight } from "react-icons/fi";
import useModal from "../../../../../context/modal";

interface IOrderCollectionSimple {
  id: string;
  amount: string | number;
  collectionStatus: CollectionStatusEnum;
  collectionProgressStatus: CollectionProgressStatusEnum;
  agentName: string;
  agentNo: string;
}

const OrderCollectionSimple: React.FC<IOrderCollectionSimple> = (props) => {
  const { openModal } = useModal();
  const { id, amount, collectionStatus, collectionProgressStatus, agentName, agentNo } = props;
  return (
    <div className="px-8 py-6 border-b last-of-type:border-none border-[#D6D6D8]">
      <div className=" flex items-center justify-between w-full">
        <div className="space-y-2">
          <p className="text-2xl font-bold">
            {nairaCurrencyFormatter(amount)} <span className=" text-xs font-light">({collectionStatus})</span>
          </p>
          <p className="text-sm text-cash-get-dark-400">{collectionProgressStatus}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-cash-get-dark-200">Agent Name</p>
          <p className="text-sm text-cash-get-dark-400">{agentName}</p>
        </div>
        <div className="space-y-2 text-right">
          <p className="text-sm text-cash-get-dark-200">Agent Number</p>
          <p className="text-sm text-cash-get-dark-400">{agentNo}</p>
        </div>
        <div className="space-y-2 text-right">
          <FiChevronRight
            size={32}
            role="button"
            onClick={() => {
              openModal("shop-view-order-collection", id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderCollectionSimple;
