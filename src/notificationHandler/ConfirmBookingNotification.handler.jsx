import { notification } from "antd";
import { checkMobile } from "../utils/checkUserAgent";

const confirmBookingNotificationHandler = (notificationData, role) => {
  if (!checkMobile()) {
    notification["info"]({
      message: notificationData.title,
      description: notificationData.body,
    });
    if (role === "DENTIST") {
      console.log("a");
      window.location.reload();
    }
  } else {
    notification["success"]({
      message: "Send notification successfully",
    });
  }
};

export default confirmBookingNotificationHandler;
