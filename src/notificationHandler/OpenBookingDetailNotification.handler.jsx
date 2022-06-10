import { Modal, notification } from "antd";
import { generatePath } from "react-router-dom";
import RoutePath from "../routers/Path";
import { checkMobile } from "../utils/checkUserAgent";

const openBookingDetailNotificationHandler = (notificationData) => {
  if (!checkMobile()) {
    Modal.confirm({
      title: "Open booking detail",
      content: `do you want to open the detail of booking ${notificationData.body}? (this will be opened in new tab)`,
      onOk: () => {
        Modal.destroyAll();
        window.open(
          generatePath(RoutePath.REDIRECT_BOOKING_DETAIL_PAGE, {
            bookingId: notificationData.body,
          })
        );
      },
      onCancel: () => {
        Modal.destroyAll();
      },
    });
  } else {
    notification["success"]({
      message: "Send notification successfully",
    });
  }
};

export default openBookingDetailNotificationHandler;
