import React, { FC, useContext, useMemo } from "react";
import { Notification, toaster } from "rsuite";

import { IOpenNotification, NotificationContext } from "./notification.context";

const NotificationProvider: FC = ({ children }) => {
  const value = useMemo(
    () => ({
      fireNotification: (params: IOpenNotification) => {
        const {
          description,
          title = "",
          type,
          // onOpen,
          // ...notificationProps
        } = params;

        toaster.push(
          <Notification type={type} duration={4500} header={title}>
            {description}
          </Notification>,
          { placement: "bottomEnd" },
        );
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
