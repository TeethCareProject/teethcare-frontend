import { notification } from "antd";
import { checkMobile } from "../utils/checkUserAgent";

const checkInCheckOutNotificationHandler = (notificationData) => {
  if (!checkMobile()) {
    notification["info"]({
      message: notificationData.title,
      description: notificationData.body,
    });
    window.location.reload();
  } else {
    notification["success"]({
      message: "Send notification successfully",
    });
  }
};

export default checkInCheckOutNotificationHandler;
