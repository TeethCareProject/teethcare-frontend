import React from "react";
import { Button, Space } from "antd";

import BookingStatusConstants from "../../constants/BookingStatusConstants";
import { RoleConstant } from "../../constants/RoleConstants";
const CSActionButtonGroupComponent = ({
  role,
  bookingData,
  handleAssign,
  rejectBooking,
  checkOutHandler,
  checkInHandler,
}) => {
  return (
    <>
      <Space>
        {bookingData?.status === BookingStatusConstants.PENDING &&
        role === RoleConstant.CUSTOMER_SERVICE ? (
          <Button onClick={() => handleAssign({ isAccepted: true })}>
            Process this booking
          </Button>
        ) : null}
        {role === RoleConstant.CUSTOMER_SERVICE &&
        bookingData?.status === BookingStatusConstants.REQUEST ? (
          <Button onClick={checkInHandler}>Check in</Button>
        ) : null}
        {bookingData?.status === BookingStatusConstants.REQUEST ||
        (bookingData?.status === BookingStatusConstants.PENDING &&
          role === RoleConstant.CUSTOMER_SERVICE) ? (
          <Button onClick={() => rejectBooking()} style={{ marginLeft: 20 }}>
            Reject
          </Button>
        ) : null}
      </Space>
      {role === RoleConstant.CUSTOMER_SERVICE &&
      bookingData?.confirmed &&
      bookingData?.status === BookingStatusConstants.TREATMENT ? (
        <Button onClick={() => checkOutHandler()}>Checkout</Button>
      ) : null}
    </>
  );
};

export default CSActionButtonGroupComponent;
