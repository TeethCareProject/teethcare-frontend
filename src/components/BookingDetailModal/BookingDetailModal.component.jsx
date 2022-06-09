import { Avatar, Col, Descriptions, List, Row, Typography } from "antd";
import { CalendarOutlined, ContainerOutlined } from "@ant-design/icons";

import React from "react";
import DescriptionsItem from "antd/lib/descriptions/Item";
import { convertMillisecondsToDate } from "../../utils/convert.utils";

const BookingDetailModalComponent = ({ bookingData }) => {
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
      <Descriptions title="Staff Incharge">
        <DescriptionsItem label="Customer service">
          {bookingData?.customerService
            ? bookingData?.customerService?.firstName +
              " " +
              bookingData?.customerService?.lastName
            : "Not available"}
        </DescriptionsItem>
        <DescriptionsItem label="Dentist">
          {bookingData?.dentist
            ? bookingData?.dentist?.firstName +
              " " +
              bookingData?.dentist?.lastName
            : "Not available"}
        </DescriptionsItem>
      </Descriptions>
      <Descriptions title="Booking Info">
        <DescriptionsItem label="Description">
          {bookingData?.description}
        </DescriptionsItem>
        <DescriptionsItem label="Examination Time">
          {convertMillisecondsToDate(bookingData.examinationTime)}
        </DescriptionsItem>
      </Descriptions>
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
