import React from "react";
import { Icon, Modal, ModalProps } from "rsuite";

type TModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  style?: any;
  modalProps: ModalProps;
};

const buttonStyle = {
  width: 35,
  height: 35,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ffffff",
  color: "#0D1136",
  border: 0,
  outline: 0,
  boxShadow: "none",
  borderRadius: "50%",
  position: "fixed" as "fixed",
  top: "20px",
  right: "35px",
  zIndex: 100000,
  cursor: "pointer",

  ":focus": {
    outline: 0,
    boxShadow: "none",
  },
};

const CenterModal: React.FC<TModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  modalProps,
}) => (
  <Modal
    show={isOpen}
    onHide={onRequestClose}
    style={{ padding: 0 }}
    className="fodtureModal"
    {...modalProps}
  >
    <button type="button" onClick={onRequestClose} style={{ ...buttonStyle }}>
      <Icon icon="close" />
    </button>
    {children}
  </Modal>
);

export default CenterModal;
