import { createContext } from "react";
import { ModalProps } from "rsuite/lib/Modal/Modal";

export interface IOpenModal {
  modalComponent: JSX.Element;
  modalProps?: ModalProps;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
}

interface IModalMethods {
  openModal: (params: IOpenModal) => void;
  closeModal: () => void;
  setModalComponent: (newModalComponent: JSX.Element) => void;
}
const modalMethods = {
  openModal: () => null,
  closeModal: () => null,
  setModalComponent: () => null,
};
export const ModalContext = createContext<IModalMethods>(modalMethods);
