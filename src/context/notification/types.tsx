export type notificationTypes = "success" | "failure" | "info";

export interface INotificationContext {
  getNotification: () => JSX.Element;
  openNotification: (data: INotificationPayload) => void;
}

export interface INotificationData {
  id: string;
  type: notificationTypes;
  text: string;
  title?: string;
}

export interface INotificationPayload {
  type: notificationTypes;
  text: string;
  title?: string;
}
