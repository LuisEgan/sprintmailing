import { createContext } from "react";
import { NotificationProps } from "rsuite";

export type TNotificationTypeEnum = "success" | "info" | "warning" | "error";

export interface IOpenNotification extends NotificationProps {
  title: React.ReactNode | string;
  description: React.ReactNode | string;
  type: TNotificationTypeEnum;
  onOpen?: () => void;
}

interface INotificationMethods {
  fireNotification: (params: IOpenNotification) => void;
}
const notificationMethods = {
  fireNotification: () => null,
};
export const NotificationContext =
  createContext<INotificationMethods>(notificationMethods);
