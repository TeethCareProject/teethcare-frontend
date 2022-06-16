import { notification } from "antd";
import RoutePath from "../routers/Path";
import { checkMobile } from "../utils/checkUserAgent";
import notificationTypes from "./notification.types";

const confirmBookingNotificationHandler = (history, notificationData) => {
  if (!checkMobile()) {
    notification["info"]({
      message: notificationData.title,
      description: notificationData.body,
    });
    if (notificationData.title === notificationTypes.CONFIRM_BOOKING) {
      setTimeout(history.push(RoutePath.DASHBOARD_PAGE), 2000);
    } else {
      window.location.reload();
    }
  } else {
    notification["success"]({
      message: "Send notification successfully",
    });
  }
};

export default confirmBookingNotificationHandler;
