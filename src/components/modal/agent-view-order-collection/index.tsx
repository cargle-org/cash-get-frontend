import React, { useMemo, useState } from "react";
import ModalWrapper from "..";
import { IModal } from "../../../context/modal/types";
import { FiCopy, FiX } from "react-icons/fi";
import { orderApi } from "../../../services/order.service";
import { copyText, nairaCurrencyFormatter } from "../../../utils/misc";
import { IUser } from "../../../services/types";
import moment from "moment";
import useNotification from "../../../context/notification";

const AgentOrderCollectionModal: React.FC<IModal<string>> = (props) => {
  const { openNotification } = useNotification();
  const { showModal, onClose, data: id } = props;
  const { data } = orderApi.useGetSingleOrderCollectionQuery(id!);

  const [confirmShop, { isSuccess, isLoading, isError, error, data: res }] = orderApi.useConfirmShopKeyMutation();
  const [shopKey, setShopkey] = useState("");

  useMemo(() => {
    if (isSuccess) {
      openNotification({
        type: "success",
        text: res?.message || "",
      });
      onClose();
    }
  }, [isSuccess]);

  useMemo(() => {
    if (isError) {
      openNotification({
        type: "failure",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: (error as any)?.data.message || "Couldn't confirm order Collection",
      });
    }
  }, [isError]);
  return (
    <ModalWrapper
      bodyStyle={{
        className: "bg-white flex-grow relative rounded-xl",
        style: { maxWidth: "720px" },
      }}
      showModal={showModal}
      onClose={onClose}
    >
      <div className="py-6 px-8 flex items-center shadow-md bg-cash-get-dark-100 rounded-t-xl justify-between ">
        <div className="flex items-center gap-2">
          <FiX size={32} onClick={() => onClose()} role="button" />
          <span className=" text-xl font-bold">Order Id: {data?.data?.order.id}</span>
        </div>
        <span className=" py-1 rounded px-7 bg-cash-get-dark-300 text-white font-medium">{data?.data?.collectionProgressStatus}</span>
      </div>
      <div className="w-full py-3 max-h-[460px] overflow-x-auto">
        <div className="text-center py-5">
          <h6 className="text-5xl font-medium ">
            {nairaCurrencyFormatter(data?.data?.amount || 0)} <span className=" text-xs font-light">({data?.data?.collectionStatus})</span>
          </h6>
          <p className=" text-sm">{data?.data?.order.address}</p>
        </div>
        <div className=" flex items-center gap-5 px-8 py-5 border-t-2 border-cash-get-dark-100">
          <div className="h-[60px] w-[60px] rounded-full bg-cash-get-dark-200"></div>
          <div className="">
            <p className=" text-lg ">{(data?.data?.agent as IUser)?.name}</p>
            <p className=" text-lg font-light text-cash-get-dark-200">{(data?.data?.agent as IUser)?.phoneNo}</p>
          </div>
        </div>
        <div className=" flex items-center gap-5 px-8 py-5 border-t-2 border-cash-get-dark-100">
          <p className="">
            <span className=" text-lg font-light text-cash-get-dark-200 mr-4">Pick up before:</span>
            <span className=" text-lg  ">{moment(data?.data?.deliveryPeriod).format("hh:mmA D-m-YY")}</span>
          </p>
        </div>
        <div className=" px-8 py-5 border-t-2 border-cash-get-dark-100 space-y-3">
          <p className=" ">
            <span className=" text-lg font-light text-cash-get-dark-200 mr-4">Contact Name:</span>
            <span className=" text-lg  ">{data?.data?.order.contactName}</span>
          </p>
          <p className="">
            <span className=" text-lg font-light text-cash-get-dark-200 mr-4">Contact Number:</span>
            <span className=" text-lg  ">{data?.data?.order.contactNumber}</span>
          </p>
          <p className="">
            <span className=" text-lg font-light text-cash-get-dark-200 mr-4">Extra info:</span>
            <span className=" text-lg  block">{data?.data?.order.extraInfo}</span>
          </p>
        </div>
        <div className="px-8 py-5 border-t-2 border-cash-get-dark-100 space-y-3">
          <p className="text-center text-lg text-cash-get-dark-400">Agent Key</p>
          <div
            className=" w-full px-8 py-6 flex gap-4  items-center rounded-lg bg-cash-get-dark-400 text-white text-2xl font-bold"
            role="button"
            onClick={() => {
              copyText(data?.data?.agentKey || "");
              openNotification({
                text: "Shop Key Copied",
                type: "info",
              });
            }}
          >
            <FiCopy />
            {data?.data?.agentKey}
          </div>
        </div>
        <div className={`px-8 py-5 border-t-2 border-cash-get-dark-100 space-y-5 ${data?.data?.shopConfirmed && "opacity-50"} `}>
          <div className="relative custom-input-with-label">
            <input
              disabled={data?.data?.agentConfirmed}
              value={data?.data?.agentConfirmed ? data.data.shopKey : shopKey}
              onChange={(e) => setShopkey(e.target.value)}
              type="tel"
              id="shopKey"
              name="shopKey"
              className="h-20 rounded-lg border border-cash-get-dark-500 w-full px-4 focus-visible:outline-none"
              placeholder="Enter Shop Key"
            />
            <label
              htmlFor="shopKey"
              className="px-4 font-light bg-white text-cash-get-dark-500 absolute left-4 top-1/2 transform -translate-y-1/2 cursor-text"
            >
              Enter Shop Key
            </label>
          </div>
          <button
            type="submit"
            disabled={shopKey.length !== 7 || data?.data?.shopConfirmed || isLoading}
            onClick={() =>
              confirmShop({
                orderCollectionId: data?.data?.id || "",
                shopKey: shopKey,
              })
            }
            className=" h-20 rounded-lg text-white bg-cash-get-dark-500 mt-7 text-lg font-medium w-full disabled:bg-cash-get-dark-200"
          >
            {isLoading ? "...isLoading" : "SUBMIT KEY"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AgentOrderCollectionModal;
