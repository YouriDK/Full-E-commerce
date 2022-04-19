import {
  iNotification,
  Store,
  NOTIFICATION_TYPE,
  NOTIFICATION_CONTAINER,
} from 'react-notifications-component';
/* * interface iNotification {
    id?: string;
    onRemoval?: (id: string, removalFlag: string) => void;
    title?: NotificationTitleMessage;
    message?: NotificationTitleMessage;
    content?: NotificationContent;
    type?: NOTIFICATION_TYPE;
    container: NOTIFICATION_CONTAINER;
    insert?: NOTIFICATION_INSERTION;
    dismiss?: iNotificationDismiss;
    animationIn?: string[];
    animationOut?: string[];
    slidingEnter?: iTransition;
    slidingExit?: iTransition;
    touchRevert?: iTransition;
    touchSlidingExit?: {
        fade: iTransition;
        swipe: iTransition;
    };
    userDefinedTypes?: iNotificationCustomType[];
    width?: number;
    hasBeenRemoved?: boolean;
}*/

interface createNotificationsProps {
  type: NOTIFICATION_TYPE;
  title: string;
  message: string;
  container: NOTIFICATION_CONTAINER;
}
export const createNotifications: any = ({
  title,
  type = 'info',
  message = '',
  container = 'top-center',
}: createNotificationsProps) => {
  const notification: iNotification = {
    title: title,
    type: type,
    message: message,
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    container: container,
  };
  Store.addNotification({
    ...notification,
  });
};
