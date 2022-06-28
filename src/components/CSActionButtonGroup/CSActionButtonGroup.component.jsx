import React from "react";
import { Button, Space } from "antd";
import BookingStatusConstants from "../../constants/BookingStatusConstants";

const CSActionButtonGroupComponent = ({
  bookingData,
  handleAssign,
  rejectBooking,
  checkOutHandler,
  checkInHandler,
}) => {
  return (
    <>
      <Space>
        {bookingData?.status === BookingStatusConstants.PENDING ? (
          <Button onClick={() => handleAssign({ isAccepted: true })}>
            Process this booking
          </Button>
        ) : null}
        {bookingData?.status === BookingStatusConstants.REQUEST ? (
          <Button onClick={checkInHandler}>Check in</Button>
        ) : null}
        {bookingData?.status === BookingStatusConstants.REQUEST ||
        bookingData?.status === BookingStatusConstants.PENDING ? (
          <Button onClick={() => rejectBooking()} style={{ marginLeft: 20 }}>
            Reject
          </Button>
        ) : null}
      </Space>
      {bookingData?.confirmed &&
      bookingData?.status === BookingStatusConstants.TREATMENT ? (
        <Button onClick={() => checkOutHandler()}>Checkout</Button>
      ) : null}
    </>
  );
};

export default CSActionButtonGroupComponent;
