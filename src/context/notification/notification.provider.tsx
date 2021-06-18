import React, { FC, useContext, useMemo } from "react";
import { Notification } from "rsuite";

import { IOpenNotification, NotificationContext } from "./notification.context";

const NotificationProvider: FC = ({ children }) => {
  const value = useMemo(
    () => ({
      fireNotification: (params: IOpenNotification) => {
        const { description, type, onOpen, ...notificationProps } = params;

        Notification[type]({
          description,
          placement: "bottomEnd",
          ...notificationProps,
        });
      },
    }),
    [],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

export default NotificationProvider;
