import React, { useEffect, useMemo, useState } from "react";
import { IModal } from "../../../context/modal/types";
import ModalWrapper from "..";
import { orderApi } from "../../../services/order.service";
import { FiX } from "react-icons/fi";
import { nairaCurrencyFormatter } from "../../../utils/misc";
import { CollectionStatusEnum, IUser } from "../../../services/types";
import moment from "moment";
import Switch from "react-switch";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/appSlice";
import useNotification from "../../../context/notification";

const AgentAcceptOrderModal: React.FC<IModal<string>> = (props) => {
  const { openNotification } = useNotification();
  const user = useSelector((state: RootState) => state.auth.user);
  const [useSpikk, setUseSpikk] = useState(false);
  const [partialMopup, setPartialMopup] = useState(false);
  const { showModal, onClose, data: id } = props;
  const { data } = orderApi.useGetSingleOrderQuery(id!);
  const [mopupAmount, setMopupAmount] = useState(0);

  const [acceptOrder, { data: res, isLoading, isSuccess, isError, error }] = orderApi.useAcceptOrderMutation();

  useEffect(() => {
    if (data) {
      setMopupAmount(data.data?.remainingAmount || 0);
    }
  }, [data]);

  useMemo(() => {
    if (isSuccess) {
      openNotification({
        text: res!.message,
        type: "success",
      });
      onClose();
    }
  }, [isSuccess]);

  useMemo(() => {
    if (isError) {
      openNotification({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: (error as any)?.data?.message || "Couln't accept order",
        type: "failure",
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
          <h6 className="text-5xl font-medium ">{nairaCurrencyFormatter(data?.data?.remainingAmount || 0)}</h6>
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
        <div className={`px-8 py-5 border-t-2 border-cash-get-dark-100 space-y-5 `}>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="" id="" checked={partialMopup} onChange={() => setPartialMopup(!partialMopup)} />
            <span className="">Partial Mockup</span>
          </div>
          <div className={`relative custom-input-with-label ${!partialMopup && "opacity-50"} cursor-not-allowed`}>
            <input
              disabled={!partialMopup}
              value={mopupAmount}
              onChange={(e) => setMopupAmount(parseFloat(e.target.value))}
              type="text"
              id="mopupAmount"
              name="mopupAmount"
              className="h-20 rounded-lg border border-cash-get-dark-500 w-full px-4 focus-visible:outline-none"
              placeholder="Enter Mop Up Amount"
            />
            <label
              htmlFor="mopupAmount"
              className="px-4 font-light bg-white text-cash-get-dark-500 absolute left-4 top-1/2 transform -translate-y-1/2 cursor-text"
            >
              Enter Mop Up Amount
            </label>
          </div>
        </div>
        <div className={`px-8 pb-5 space-y-5 `}>
          <div className="flex items-center justify-between gap-2">
            <span className="">{!useSpikk ? "Handle Yourself" : "Use Spikk"}</span>
            <Switch
              checked={useSpikk}
              onChange={() => {
                setUseSpikk(!useSpikk);
              }}
            />
          </div>

          <button
            type="submit"
            onClick={() =>
              acceptOrder({
                agentId: user!.id,
                amount: mopupAmount,
                collectionStatus: partialMopup ? CollectionStatusEnum.PARTIAL : CollectionStatusEnum.FULL,
                orderId: data!.data!.id,
                useSpikk: useSpikk,
              })
            }
            className=" h-20 rounded-lg text-white bg-[#0361F0] mt-7 text-lg font-medium w-full disabled:bg-cash-get-dark-200"
          >
            {isLoading ? "...isLoading" : "ACCEPT ORDER"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AgentAcceptOrderModal;
