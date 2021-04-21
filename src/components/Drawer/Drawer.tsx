import React from "react";
import { Drawer, Icon, ModalProps } from "rsuite";

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

const AdminDrawer: React.FC<SpringModalProps> = ({
  isOpen,
  onRequestClose,
  children,
  size,
}) => {
  return (
    <Drawer show={isOpen} onHide={onRequestClose} size={size}>
      <button type="button" onClick={onRequestClose} style={{ ...buttonStyle }}>
        <Icon icon="close" />
      </button>
      <div className="p-5 w-100">{children}</div>
    </Drawer>
  );
};

export default AdminDrawer;
