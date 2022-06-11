import {
  Avatar,
  Col,
  Descriptions,
  List,
  Row,
  Typography,
  Form,
  DatePicker,
  Button,
} from "antd";
import { CalendarOutlined, ContainerOutlined } from "@ant-design/icons";

import React from "react";
import DescriptionsItem from "antd/lib/descriptions/Item";
import { convertMillisecondsToDate } from "../../utils/convert.utils";

import DentistPickingModalContainer from "../../containers/DentistPickingModal/DentistPickingModal.container";

const BookingDetailModalComponent = ({
  bookingData,
  updateBookingData,
  dentists,
  selectedDentistId,
  setSelectedDentistId,
  modalClickHandler,
  isOpened,
  setIsOpened,
}) => {
  let examinationTime = bookingData?.examinationTime
    ? convertMillisecondsToDate(bookingData?.examinationTime)
    : convertMillisecondsToDate(bookingData?.createBookingDate);

  return (
    <>
      <DentistPickingModalContainer
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        setSelectedDentistId={setSelectedDentistId}
        modalClickHandler={modalClickHandler}
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
      <Form name="update_dentist_time_form" onFinish={updateBookingData}>
        <Descriptions title="Staff Incharge">
          <DescriptionsItem label="Customer service">
            {bookingData?.customerService
              ? bookingData?.customerService?.firstName +
                " " +
                bookingData?.customerService?.lastName
              : "Not available"}
          </DescriptionsItem>
        </Descriptions>
        <Form.Item name="dentistId"></Form.Item>
        <div>
          Current Dentist: {`${" "}`}
          <span>
            {bookingData?.dentist?.firstName +
              " " +
              bookingData?.dentist?.lastName +
              " - " +
              bookingData?.dentist?.specialization}
          </span>
          <span
            onClick={modalClickHandler}
            style={{ color: "blue", marginLeft: 30, fontSize: "0.8em" }}
          >
            Update Dentist
          </span>
        </div>
        <div>
          New Dentist: {`${" "}`}
          {dentists
            ?.filter((dentist) => dentist.id === selectedDentistId)
            .map((dentist) => (
              <span>
                {dentist.firstName +
                  " " +
                  dentist.lastName +
                  " - " +
                  bookingData?.dentist?.specialization}
              </span>
            ))}
        </div>

        <Descriptions title="Booking Info">
          <DescriptionsItem label="Description">
            {bookingData?.description}
          </DescriptionsItem>
        </Descriptions>

        <div>
          <div>
            Current Examination Time: {`${" "}`}
            <span>{examinationTime}</span>
          </div>
          <div>New Examination Time: {`${" "}`}</div>
          <Form.Item name="examinationTime">
            <DatePicker
              showTime
              placeholder="Select Time"
              style={{ marginLeft: 10 }}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>

      <List
        itemLayout="horizontal"
        dataSource={bookingData?.services ? bookingData?.services : []}
        renderItem={(service) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<ContainerOutlined />} size={32} />}
              title={
                <Typography.Title
                  level={5}
                >{`Service name: ${service.name}`}</Typography.Title>
              }
              description={`Description: ${service.description}`}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default BookingDetailModalComponent;
