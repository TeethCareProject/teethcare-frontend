import { Avatar, Col, Descriptions, Row, Typography, Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

import React from "react";
import DescriptionsItem from "antd/lib/descriptions/Item";
import UpdateBookingDetailModalContentComponent from "../UpdateBookingDetailModalContent/UpdateBookingDetailModalContent.component";
import BookingDetailModalContentComponent from "../BookingDetailModalContent/BookingDetailModalContent.component";

import DentistPickingModalContainer from "../../containers/DentistPickingModal/DentistPickingModal.container";
import ServicePickingModalContainer from "../../containers/ServicePickingModal/ServicePickingModal.container";
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import { RoleConstant } from "../../constants/RoleConstants";

const BookingDetailModalComponent = ({
  form,
  role,
  onDentistChange,
  bookingData,
  updateBookingData,
  dentists,
  services,
  selectedDentistId,
  selectedServiceIds,
  setSelectedDentistId,
  setSelectedServiceIds,
  dentistModalClickHandler,
  serviceModalClickHandler,
  updateClickHandler,
  isDentistModalOpened,
  isServiceModalOpened,
  chooseServiceHandler,
  deleteServiceHandler,
  isUpdated,
  setDentistModalOpened,
  setServiceModalOpened,
  checkInHandler,
}) => {
  return (
    <>
      <DentistPickingModalContainer
        isDentistModalOpened={isDentistModalOpened}
        setDentistModalOpened={setDentistModalOpened}
        setSelectedDentistId={setSelectedDentistId}
        dentistModalClickHandler={dentistModalClickHandler}
        onDentistChange={onDentistChange}
        dentists={dentists}
      />
      <ServicePickingModalContainer
        isServiceModalOpened={isServiceModalOpened}
        setServiceModalOpened={setServiceModalOpened}
        selectedServiceIds={selectedServiceIds}
        setSelectedServiceIds={setSelectedServiceIds}
        serviceModalClickHandler={serviceModalClickHandler}
        services={services}
        chooseService={chooseServiceHandler}
      />
      <Row gutter={[16, 16]} style={{ marginBottom: "0.5rem" }}>
        <Col>
          <Avatar size={48} icon={<CalendarOutlined />} />
        </Col>
        <Col span={10}>
          <Typography>{`Booking ID: ${bookingData?.id} - Status: ${bookingData?.status}`}</Typography>
          <Typography>{`Booking ID: ${bookingData?.clinic?.name}`}</Typography>
        </Col>
        <Col>
          <Button onClick={updateClickHandler}>
            {isUpdated ? "Return" : "Update"}
          </Button>
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
        <UpdateBookingDetailModalContentComponent
          form={form}
          bookingData={bookingData}
          updateBookingData={updateBookingData}
          dentists={dentists}
          services={services}
          selectedDentistId={selectedDentistId}
          selectedServiceIds={selectedServiceIds}
          dentistModalClickHandler={dentistModalClickHandler}
          serviceModalClickHandler={serviceModalClickHandler}
          deleteServiceHandler={deleteServiceHandler}
        />
      ) : (
        <BookingDetailModalContentComponent
          bookingData={bookingData}
          role={role}
          checkInHandler={checkInHandler}
        />
      )}
    </>
  );
};

export default BookingDetailModalComponent;
