import {
  Avatar,
  Col,
  Descriptions,
  List,
  Row,
  Typography,
  Form,
  DatePicker,
  Input,
  Button,
} from "antd";
import { CalendarOutlined, ContainerOutlined } from "@ant-design/icons";
import moment from "moment";

import React from "react";
import DescriptionsItem from "antd/lib/descriptions/Item";
import { convertMillisecondsToDate } from "../../utils/convert.utils";

const BookingDetailModalComponent = ({ bookingData, updateBookingData }) => {
  const dateFormat = "HH:MM:SS, DD/MM/YYYY";

  let examinationTime = bookingData?.examinationTime
    ? convertMillisecondsToDate(bookingData?.examinationTime)
    : convertMillisecondsToDate(bookingData?.createBookingDate);

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
        <Form.Item name="dentistId">
          Dentist:
          <Input
            defaultValue={
              bookingData?.dentist
                ? bookingData?.dentist?.firstName +
                  " " +
                  bookingData?.dentist?.lastName
                : "Not available"
            }
            style={{ width: 200, marginLeft: 10 }}
          />
        </Form.Item>

        <Descriptions title="Booking Info">
          <DescriptionsItem label="Description">
            {bookingData?.description}
          </DescriptionsItem>
        </Descriptions>
        {/* <Form.Item name="examinationTime">
            Examination Time:
            <DatePicker
              defaultValue={moment(examinationTime, dateFormat)}
              showTime
              placeholder="Select Time"
              style={{ marginLeft: 10 }}
            />
          </Form.Item> */}
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
