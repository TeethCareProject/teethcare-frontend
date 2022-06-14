import { Avatar, Col, Descriptions, Row, Typography, Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

import React from "react";
import DescriptionsItem from "antd/lib/descriptions/Item";
import UpdateBookingDetailModalContentContainer from "../../containers/UpdateBookingDetailModalContent/UpdateBookingDetailModalContent.container";
import BookingDetailModalContentComponent from "../../components/BookingDetailModalContent/BookingDetailModalContent.component";

import BookingStatusConstants from "../../constants/BookingStatusConstants";
import { RoleConstant } from "../../constants/RoleConstants";

const BookingDetailModalComponent = ({
  bookingData,
  checkInHandler,
  role,
  isUpdated,
  updateClickHandler,
}) => {
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: "0.5rem" }}>
        <Col>
          <Avatar size={48} icon={<CalendarOutlined />} />
        </Col>
        <Col span={10}>
          <Typography>{`Booking ID: ${bookingData?.id} - Status: ${bookingData?.status}`}</Typography>
          <Typography>{`Booking ID: ${bookingData?.clinic?.name}`}</Typography>
        </Col>
        <Col>
          {role === RoleConstant.CUSTOMER_SERVICE &&
          bookingData?.status === BookingStatusConstants.REQUEST ? (
            <Button onClick={updateClickHandler}>
              {isUpdated ? "Return" : "Update"}
            </Button>
          ) : null}
        </Col>
      </Row>
      <Descriptions title="Patient info">
        <DescriptionsItem label="Patient name">
          {bookingData?.patient?.firstName +
            " " +
            bookingData?.patient?.lastName}
        </DescriptionsItem>
        <DescriptionsItem label="Phone number">
          {bookingData?.patient?.phone}
        </DescriptionsItem>
        <DescriptionsItem label="Date of birth">
          {bookingData?.patient?.dateOfBirth}
        </DescriptionsItem>
      </Descriptions>
      {role === RoleConstant.CUSTOMER_SERVICE &&
      bookingData?.status === BookingStatusConstants.REQUEST &&
      isUpdated ? (
        <UpdateBookingDetailModalContentContainer bookingData={bookingData} />
      ) : (
        <BookingDetailModalContentComponent
          bookingData={bookingData}
          checkInHandler={checkInHandler}
          role={role}
        />
      )}
    </>
  );
};

export default BookingDetailModalComponent;
