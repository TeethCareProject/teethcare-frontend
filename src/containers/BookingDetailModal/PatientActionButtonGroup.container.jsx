import React from "react";
import { Modal, notification } from "antd";
import { giveFeedBack } from "../../services/teeth-apis/FeedbackController";
import FeedbackFormContainer from "../FeedBackForm/FeedBackForm.container";
import PatientActionButtonGroupComponent from "../../components/PatientActionButtonGroup/PatientActionButtonGroup.component";

const PatientActionButtonGroupContainer = ({
  bookingId,
  bookingData,
  disabled,
  handleAssign,
  fetchBookingData,
}) => {
  const handleGiveFeedback = (bookingId) => {
    try {
      Modal.info({
        closable: true,
        okButtonProps: { style: { display: "none" } },
        title: "Give your feedback",
        content: (
          <FeedbackFormContainer
            bookingId={bookingId}
            fetchBookingData={fetchBookingData}
            giveFeedBack={giveFeedBack}
          />
        ),
      });
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while giving feedback, try again later`,
        duration: 2,
      });
    }
  };

  return (
    <PatientActionButtonGroupComponent
      bookingId={bookingId}
      bookingData={bookingData}
      disabled={disabled}
      handleAssign={handleAssign}
      handleGiveFeedback={handleGiveFeedback}
    />
  );
};

export default PatientActionButtonGroupContainer;
