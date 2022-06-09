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
      <h1>Trigger page</h1>
    </>
  );
};

export default TriggerQrCodeNotificationPage;
