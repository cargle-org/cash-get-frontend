/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useMemo, useState } from "react";
import { IModalContext, ModalTypes } from "./types";
import ShopOpenOrderModal from "../../components/modal/shop-view-order";
import ShopOrderCollectionModal from "../../components/modal/shop-view-order-collection";
import AgentAcceptOrderModal from "../../components/modal/agent-accept-order";
import AgentOrderCollectionModal from "../../components/modal/agent-view-order-collection";

const ModalContext = createContext({});

export const ModalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ModalTypes>();
  const [data, setData] = useState<any>();
  const openModal = (type: ModalTypes, payload?: any) => {
    setShowModal(true);
    setActiveModal(type);
    setData(payload);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveModal(undefined);
    setData(undefined);
  };

  const getModal = () => {
    switch (activeModal) {
      case "shop-view-order":
        return <ShopOpenOrderModal onClose={closeModal} showModal={showModal} data={data} />;
      case "shop-view-order-collection":
        return <ShopOrderCollectionModal onClose={closeModal} showModal={showModal} data={data} />;
      case "agent-accept-order":
        return <AgentAcceptOrderModal onClose={closeModal} showModal={showModal} data={data} />;
      case "agent-view-order-collection":
        return <AgentOrderCollectionModal onClose={closeModal} showModal={showModal} data={data} />;
      default:
        return null;
    }
  };

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
      getModal,
    }),
    [getModal, data]
  );
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

const useModal = (): IModalContext => useContext(ModalContext) as IModalContext;

export default useModal;
