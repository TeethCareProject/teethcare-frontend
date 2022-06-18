import { notification } from "antd";
import { checkMobile } from "../utils/checkUserAgent";

const confirmBookingNotificationHandler = (history, notificationData) => {
  if (!checkMobile()) {
    notification["info"]({
      message: notificationData.title,
      description: notificationData.body,
    });
    console.log("success");
    window.location.reload();
  } else {
    notification["success"]({
      message: "Send notification successfully",
    });
  }
};

export default confirmBookingNotificationHandler;
