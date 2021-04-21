import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { ModalProps } from "rsuite";
import CenterModal from "components/Modal/CenterModal";
import { IOpenModal, ModalContext } from "./modal.context";

interface IModalProvider {}

const ModalProvider: FC<IModalProvider> = (props) => {
  const { children } = props;

  const [modal, setModal] = useState<JSX.Element | null>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [size, setSize] = useState<ModalProps["size"]>("xs");

  const [onOpen, setOnOpen] = useState<Function | null>();
  const [onClose, setOnClose] = useState<Function | null>();

  useEffect(() => {
    if (isOpen) {
      if (onOpen) onOpen();
    } else {
      if (onClose) onClose();
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setOnOpen(null);

    setTimeout(() => {
      setModal(null);
      setOnClose(null);
    }, 500);
  };

  const setModalComponent = (newModalComponent: JSX.Element) => {
    setModal(newModalComponent);
  };

  const value = useMemo(
    () => ({
      openModal: (params: IOpenModal) => {
        const { modalComponent, modalSize, onOpenModal, onCloseModal } = params;

        setIsOpen(true);
        setModal(modalComponent);

        if (modalSize) setSize(modalSize);
        if (onOpenModal) setOnOpen(() => onOpenModal);
        if (onCloseModal) setOnClose(() => onCloseModal);
      },

      closeModal,
      setModalComponent,
    }),
    []
  );

  return (
    <ModalContext.Provider {...{ value }}>
      <CenterModal {...{ size, isOpen }} onRequestClose={closeModal}>
        {modal}
      </CenterModal>

      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

export default ModalProvider;
