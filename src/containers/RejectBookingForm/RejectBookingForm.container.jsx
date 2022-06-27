import React from "react";
import { Modal, notification } from "antd";
import RejectBookingFormComponent from "../../components/RejectBookingForm/RejectBookingForm.component";

const RejectBookingFormContainer = ({ handleAssign, fetchBookingData }) => {
  const onFinish = async (values) => {
    try {
      await handleAssign({
        isAccepted: false,
        rejectedNote: values.rejectedNote,
      });
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
  return <RejectBookingFormComponent onFinish={onFinish} />;
};

export default RejectBookingFormContainer;
