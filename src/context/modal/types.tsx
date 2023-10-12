/* eslint-disable @typescript-eslint/no-explicit-any */
export type ModalTypes = "shop-view-order" | "shop-view-order-collection" | "agent-accept-order";

export interface IModalContext {
  openModal: (type: ModalTypes, payload?: any) => void;
  closeModal: () => void;
  getModal: () => JSX.Element;
}

export interface IModal<D> {
  onClose: () => void;
  showModal: boolean;
  data?: D;
}
