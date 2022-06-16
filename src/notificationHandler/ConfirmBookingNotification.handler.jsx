import { notification } from "antd";
import RoutePath from "../routers/Path";
import { checkMobile } from "../utils/checkUserAgent";

const confirmBookingNotificationHandler = () => {
  if (!checkMobile()) {
    setTimeout(window.location.assign(RoutePath.DASHBOARD_PAGE), 2000);
  } else {
    notification["success"]({
      message: "Send notification successfully",
    });
  }
};

export default confirmBookingNotificationHandler;
