import { notification } from "antd";
import RoutePath from "../routers/Path";
import { checkMobile } from "../utils/checkUserAgent";
import notificationTypes from "./notification.types";

const confirmBookingNotificationHandler = (history, title) => {
  if (!checkMobile()) {
    if (title === notificationTypes.CONFIRM_BOOKING) {
      setTimeout(history.push(RoutePath.DASHBOARD_PAGE), 2000);
    } else {
      history.go(0);
    }
  } else {
    notification["success"]({
      message: "Send notification successfully",
    });
  }
};

export default confirmBookingNotificationHandler;
