/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from "react";
import { INotificationContext, INotificationData, INotificationPayload } from "./types";
import Notification from "../../components/notifications";
import uuid from "uuid-random";

const NotificationContext = createContext({});

export const NotificationContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [notificationData, setNotificationData] = useState<INotificationData[]>([]);

  const openNotification = (data: INotificationPayload) => {
    const id = uuid();
    setNotificationData((notificationData) => {
      return [...notificationData, { ...data, id: id }];
    });
  };

  const closeNotification = (id: string) => {
    setNotificationData((data) => {
      return data.filter((d) => d.id !== id);
    });
  };
  const getNotification = () => {
    return <Notification closeNotification={closeNotification} data={notificationData} />;
  };

  const value = useMemo(
    () => ({
      getNotification,
      openNotification,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openNotification]
  );
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

const useNotification = (): INotificationContext => useContext(NotificationContext) as INotificationContext;

export default useNotification;
