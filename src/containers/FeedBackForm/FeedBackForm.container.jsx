import React from "react";
import { Modal, notification } from "antd";
import FeedbackFormComponent from "../../components/FeedbackForm/FeedbackForm.component";

const FeedbackFormContainer = ({
  bookingId,
  fetchBookingData,
  giveFeedBack,
}) => {
  const onFinish = async (values) => {
    try {
      await giveFeedBack(bookingId, values.detail, values.ratingScore);
      Modal.destroyAll();
      await fetchBookingData();
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while giving feedback, try again later`,
        duration: 2,
      });
    }
  };
  return <FeedbackFormComponent onFinish={onFinish} />;
};

export default FeedbackFormContainer;
