import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationComponent from "../../components/commons/Notification/Notification.component";
import { getNotificationList } from "../../redux/notification/notification.action";
import { notificationActions } from "../../redux/notification/notification.slice";
import {
  markAllAsRead,
  markNotificationAsRead,
} from "../../services/teeth-apis/NotificationController";

const NotificationContainer = () => {
  const notificationListData = useSelector(
    (state) => state?.notification?.notificationList
  );
  const totalMarkAsUnread = useSelector(
    (state) => state?.notification?.totalMarkAsUnread
  );
  const currentPage = useSelector((state) => state?.notification?.page);

  const dispatch = useDispatch();
  const [render, setRender] = useState(true);
  const pageSize = 10;

  const markAllAsReadAction = async () => {
    try {
      await markAllAsRead();
      setRender(!render);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while mark all as read, try again later`,
        duration: 2,
      });
    }
  };

  const fetchNotification = async () => {
    await dispatch(
      getNotificationList({
        size: pageSize * (currentPage + 1),
        page: 0,
      })
    );
  };

  useEffect(() => {
    fetchNotification();
  }, [currentPage, render]);

  return (
    <NotificationComponent
      notificationList={notificationListData?.content?.map((item) => ({
        ...item,
        markAsReadAction: async () => {
          try {
            await markNotificationAsRead(item.id);
            setRender(!render);
          } catch (e) {
            notification["error"]({
              message: `Something went wrong! Try again latter!`,
              description: `There is problem while mark as read, try again later`,
              duration: 2,
            });
          }
        },
      }))}
      loadMoreData={() => {
        dispatch(notificationActions.setPage(1));
      }}
      totalElements={notificationListData?.totalElements}
      totalMarkAsUnread={totalMarkAsUnread}
      markAllAsReadAction={markAllAsReadAction}
    />
  );
};

export default NotificationContainer;
