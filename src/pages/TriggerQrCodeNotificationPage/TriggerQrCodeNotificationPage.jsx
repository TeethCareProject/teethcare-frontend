import { Result } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { triggerOpenBookingDetail } from "../../services/teeth-apis/NotificationController";

const TriggerQrCodeNotificationPage = () => {
  const { bookingId } = useParams();

  useEffect(() => {
    const trigger = async () => {
      await triggerOpenBookingDetail(bookingId);
    };
    trigger();
  }, []);

  return (
    <>
      <Result
        status="info"
        title="An open booking detail request has been made!"
        subTitle="Please come to your desktop/laptop device to confirm the request!"
      />
    </>
  );
};

export default TriggerQrCodeNotificationPage;
