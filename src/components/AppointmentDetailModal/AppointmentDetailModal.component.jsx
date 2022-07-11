import { Avatar, Col, Descriptions, Row, Typography, Button, List } from "antd";
import { CalendarOutlined, ContainerOutlined } from "@ant-design/icons";

import React from "react";
import DescriptionsItem from "antd/lib/descriptions/Item";
import { convertMillisecondsToDate } from "../../utils/convert.utils";

const AppointmentDetailModalComponent = ({
  appointmentData,
  createBooking,
}) => {
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: "0.5rem" }}>
        <Col>
          <Avatar size={48} icon={<CalendarOutlined />} />
        </Col>
        <Col span={10}>
          <Typography>{`Appointment ID: ${appointmentData?.id}`}</Typography>
          <Typography>{`Clinic: ${appointmentData?.clinic?.name}`}</Typography>
        </Col>
      </Row>
      <Descriptions title="Patient info">
        <DescriptionsItem label="Patient name">
          {appointmentData?.patient?.firstName +
            " " +
            appointmentData?.patient?.lastName}
        </DescriptionsItem>
        <DescriptionsItem label="Phone number">
          {appointmentData?.patient?.phone}
        </DescriptionsItem>
      </Descriptions>
      <Descriptions title="Appointment info">
        <DescriptionsItem label="Appointment day">
          {appointmentData?.appointmentDate
            ? convertMillisecondsToDate(appointmentData?.appointmentDate)
            : "Not assigned"}
        </DescriptionsItem>
        <DescriptionsItem label="Expired day">
          {appointmentData?.expireAppointmentDate
            ? convertMillisecondsToDate(appointmentData?.expireAppointmentDate)
            : "Not assigned"}
        </DescriptionsItem>
      </Descriptions>
      <div style={{ marginBottom: 10 }}>Note: {appointmentData?.note}</div>

      <Descriptions title="Previous treatment Info">
        <DescriptionsItem label="Examination Day">
          {appointmentData?.appointmentDate
            ? convertMillisecondsToDate(
                appointmentData?.preBooking?.examinationTime
              )
            : "Not assigned"}
        </DescriptionsItem>
        <DescriptionsItem label="Total price:">
          {appointmentData?.preBooking?.totalPrice}
        </DescriptionsItem>
      </Descriptions>
      <div>
        Dentist:{" "}
        {appointmentData?.preBooking?.dentist?.firstName +
          " " +
          appointmentData?.preBooking?.dentist?.lastName}
      </div>
      <div style={{ marginTop: 15 }}>Services:</div>
      <List
        itemLayout="horizontal"
        dataSource={
          appointmentData?.preBooking?.services
            ? appointmentData?.preBooking?.services
            : []
        }
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Button
          shape="round"
          type="primary"
          style={{
            width: 200,
            marginLeft: "auto",
            marginRight: 0,
            marginBottom: 10,
          }}
          onClick={() => createBooking()}
        >
          Continue to examine
        </Button>
        <div style={{ marginLeft: "auto", marginRight: 0 }}></div>
      </div>
    </>
  );
};

export default AppointmentDetailModalComponent;
