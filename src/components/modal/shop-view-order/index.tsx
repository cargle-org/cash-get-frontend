import React, { useMemo } from "react";
import { IModal } from "../../../context/modal/types";
import ModalWrapper from "..";
import { orderApi } from "../../../services/order.service";
import { FiX } from "react-icons/fi";
import { nairaCurrencyFormatter } from "../../../utils/misc";
import { IUser, OrderStatusEnum } from "../../../services/types";
import moment from "moment";
import OrderCollectionSimple from "../../../pages/dashboard/shop/components/order/OrderCollectionSimple";
import useNotification from "../../../context/notification";

const ShopOpenOrderModal: React.FC<IModal<string>> = (props) => {
  const { showModal, onClose, data: id } = props;
  const { openNotification } = useNotification();
  const { data } = orderApi.useGetSingleOrderQuery(id!);
  const [deleteOrder, { data: res, isLoading, isSuccess, isError, error }] = orderApi.useDeleteOrderMutation();

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
        text: (error as any)?.data.message || "Couldn't delete order",
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
          <span className=" text-xl font-bold">Order Id: {data?.data?.id}</span>
        </div>
        <span className=" py-1 rounded px-7 bg-cash-get-dark-300 text-white font-medium">{data?.data?.status}</span>
      </div>
      <div className="w-full py-3 max-h-[460px] overflow-x-auto">
        <div className="text-center py-5">
          <h6 className="text-5xl font-medium ">{nairaCurrencyFormatter(data?.data?.amount || 0)}</h6>
          <p className=" text-sm">{data?.data?.address}</p>
        </div>

        <div className=" flex items-center gap-5 px-8 py-5 border-t-2 border-cash-get-dark-100">
          <div className="h-[60px] w-[60px] rounded-full bg-cash-get-dark-200"></div>
          <div className="">
            <p className=" text-lg ">{(data?.data?.shop as IUser)?.name}</p>
            <p className=" text-lg font-light text-cash-get-dark-200">{(data?.data?.shop as IUser)?.phoneNo}</p>
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
            <span className=" text-lg  ">{data?.data?.contactName}</span>
          </p>
          <p className="">
            <span className=" text-lg font-light text-cash-get-dark-200 mr-4">Contact Number:</span>
            <span className=" text-lg  ">{data?.data?.contactNumber}</span>
          </p>
          <p className="">
            <span className=" text-lg font-light text-cash-get-dark-200 mr-4">Extra info:</span>
            <span className=" text-lg  block">{data?.data?.extraInfo}</span>
          </p>
        </div>
        {data?.data?.status === OrderStatusEnum.CREATED && (
          <div className=" px-8 py-5 border-t-2 border-cash-get-dark-100 space-y-3">
            <button
              onClick={() => deleteOrder({ orderId: id! })}
              type="submit"
              className=" h-20 rounded-lg text-white bg-red-600 mt-7 text-lg font-medium w-full disabled:bg-cash-get-dark-200"
            >
              {isLoading ? "...isLoading" : "CANCEL ORDER"}
            </button>
          </div>
        )}
        <div className="border-t-2">
          <div className="py-3">
            <h6 className=" text-center text-2xl font-medium">Order Collections</h6>
          </div>
          <div className="">
            {data?.data?.orderCollections && (
              <>
                {data.data.orderCollections.map((oC) => (
                  <OrderCollectionSimple
                    key={oC.id}
                    agentName={oC.agent?.name}
                    agentNo={oC.agent?.phoneNo}
                    amount={oC.amount}
                    collectionProgressStatus={oC.collectionProgressStatus}
                    collectionStatus={oC.collectionStatus}
                    id={oC.id}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ShopOpenOrderModal;
