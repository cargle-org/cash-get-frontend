import React from "react";
import { INotificationData } from "../../context/notification/types";
import NotificationBadge from "./NotificationBadge";

const Notification: React.FC<{
  closeNotification: (id: string) => void;
  data: INotificationData[];
}> = (props) => {
  const { closeNotification, data } = props;
  return (
    <aside className=" fixed z-50 top-10 right-10 flex flex-col gap-4">
      {data.map((notificationData) => (
        <NotificationBadge key={notificationData.id} data={notificationData} closeNotification={closeNotification} />
      ))}
    </aside>
  );
};

export default Notification;
