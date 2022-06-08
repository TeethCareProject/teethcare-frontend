import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationComponent from "../../components/commons/Notification/Notification.component";
import { getNotificationList } from "../../redux/notification/notification.action";

const NotificationContainer = () => {
  const notificationList = useSelector(
    (state) => state?.notification?.notificationList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationList());
  }, []);

  return <NotificationComponent notificationList={notificationList} />;
};

export default NotificationContainer;
