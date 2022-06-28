import React from "react";
import { Modal, notification } from "antd";
import CSActionButtonGroupComponent from "../../components/CSActionButtonGroup/CSActionButtonGroup.component";
import RejectBookingFormContainer from "../RejectBookingForm/RejectBookingForm.container";
import { checkOut, checkIn } from "../../services/teeth-apis/BookingController";

const CSActionButtonGroupContainer = ({
  bookingId,
  bookingData,
  role,
  handleAssign,
  fetchBookingData,
  setNeededBooking,
}) => {
  const rejectBooking = () => {
    Modal.info({
      title: "Reject this booking",
      maskClosable: true,
      closable: true,
      okButtonProps: { style: { display: "none" } },
      content: (
        <RejectBookingFormContainer
          handleAssign={handleAssign}
          fetchBookingData={fetchBookingData}
        />
      ),
    });
  };

  const checkInHandler = async () => {
    try {
      await checkIn(bookingId);
      setNeededBooking(null);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while check in, try again later`,
        duration: 2,
      });
    }
  };

  const checkOutHandler = async () => {
    try {
      await checkOut(bookingId);
      setNeededBooking(null);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while check out, try again later`,
      });
    }
  };

  return (
    <CSActionButtonGroupComponent
      role={role}
      bookingData={bookingData}
      handleAssign={handleAssign}
      rejectBooking={rejectBooking}
      checkOutHandler={checkOutHandler}
      checkInHandler={checkInHandler}
    />
  );
};

export default CSActionButtonGroupContainer;
