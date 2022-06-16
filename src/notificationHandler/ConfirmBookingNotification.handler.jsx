import { notification } from "antd";
import RoutePath from "../routers/Path";
import { checkMobile } from "../utils/checkUserAgent";

const confirmBookingNotificationHandler = (history) => {
  if (!checkMobile()) {
    setTimeout(history.push(RoutePath.DASHBOARD_PAGE), 2000);
  } else {
    notification["success"]({
      message: "Send notification successfully",
    });
  }
};

export default confirmBookingNotificationHandler;
