import { Avatar, Col, Descriptions, Row, Typography, Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

import React from "react";
import DescriptionsItem from "antd/lib/descriptions/Item";
import UpdateBookingDetailModalContentComponent from "../UpdateBookingDetailModalContent/UpdateBookingDetailModalContent.component";
import BookingDetailModalContentComponent from "../BookingDetailModalContent/BookingDetailModalContent.component";

import DentistPickingModalContainer from "../../containers/DentistPickingModal/DentistPickingModal.container";
import BookingStatusConstants from "../../constants/BookingStatusConstants";

const BookingDetailModalComponent = ({
  form,
  onChange,
  bookingData,
  updateBookingData,
  dentists,
  services,
  selectedDentistId,
  setSelectedDentistId,
  modalClickHandler,
  isOpened,
  setIsOpened,
  checkInHandler,
}) => {
  return (
    <>
      <DentistPickingModalContainer
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        setSelectedDentistId={setSelectedDentistId}
        modalClickHandler={modalClickHandler}
        onChange={onChange}
      />
      <Row gutter={[16, 16]} style={{ marginBottom: "0.5rem" }}>
        <Col>
          <Avatar size={48} icon={<CalendarOutlined />} />
        </Col>
        <Col span={10}>
          <Typography>{`Booking ID: ${bookingData?.id} - Status: ${bookingData?.status}`}</Typography>
          <Typography>{`Booking ID: ${bookingData?.clinic?.name}`}</Typography>
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
      {services && bookingData?.status === BookingStatusConstants.REQUEST ? (
        <UpdateBookingDetailModalContentComponent
          form={form}
          bookingData={bookingData}
          updateBookingData={updateBookingData}
          dentists={dentists}
          services={services}
          selectedDentistId={selectedDentistId}
          modalClickHandler={modalClickHandler}
        />
      ) : (
        <BookingDetailModalContentComponent bookingData={bookingData} />
      )}
      {services && bookingData?.status === BookingStatusConstants.REQUEST ? (
        <Button onClick={checkInHandler}>Check in</Button>
      ) : null}
    </>
  );
};

export default BookingDetailModalComponent;
