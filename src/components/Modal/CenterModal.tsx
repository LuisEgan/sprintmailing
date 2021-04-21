import React from "react";
import { Icon, Modal, ModalProps } from "rsuite";

type SpringModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  style?: any;
  size: ModalProps["size"];
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

const CenterModal: React.FC<SpringModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  size,
}) => {
  return (
    <Modal
      show={isOpen}
      onHide={onRequestClose}
      size={size}
      style={{ padding: 0 }}
      className="fodtureModal"
    >
      <button type="button" onClick={onRequestClose} style={{ ...buttonStyle }}>
        <Icon icon="close" />
      </button>
      {children}
    </Modal>
  );
};

export default CenterModal;
