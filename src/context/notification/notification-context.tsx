import React from "react";
import { Notification } from "rsuite";

type NotificationContextProps = {
  fireNotification: (title: string, description: string, type: string) => void;
};

export const NotificationContext = React.createContext(
  {} as NotificationContextProps
);

const NotificationProvider = (props: any) => {
  const fireNotification = (
    title: string,
    description: string,
    type: string
  ) => {
    Notification[type]({
      title,
      description,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        fireNotification,
      }}
    >
      <>{props.children}</>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
