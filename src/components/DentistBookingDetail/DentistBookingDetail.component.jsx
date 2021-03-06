import React from "react";
import { Col, Row, Typography, List, Avatar } from "antd";
import { ContainerOutlined } from "@ant-design/icons";
import { convertMillisecondsToDate } from "../../utils/convert.utils";

const DentistBookingDetailComponent = ({ booking, returnToDashboard }) => {
  let examinationTime = booking?.examinationTime
    ? convertMillisecondsToDate(booking?.examinationTime)
    : convertMillisecondsToDate(booking?.createBookingDate);
  return (
    <>
      <div
        style={{
          border: "1px solid #D8F1FF",
          backgroundColor: "#D8F1FF",
          borderRadius: "15px",
          margin: "30px 20px",
          padding: 20,
        }}
      >
        <Typography.Title level={4}>Patient details:</Typography.Title>
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col>
            <div>
              Name:{" "}
              <span>
                {booking?.patient?.firstName + " " + booking?.patient?.lastName}
              </span>
            </div>
            <div>
              Date of birth: <span>{booking?.patient?.dateOfBirth}</span>
            </div>
            <div>
              Gender: <span>{booking?.patient?.gender}</span>
            </div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          border: "1px solid #F7F7F7",
          backgroundColor: "#D8F1FF",
          borderRadius: "15px",
          margin: "30px 20px",
          padding: 20,
        }}
      >
        <Typography.Title level={4}>Booking details:</Typography.Title>
        <div>Booking id: {booking?.id}</div>
        <div>Examination Time: {examinationTime}</div>
        <div>Current Services: </div>
        <List
          itemLayout="horizontal"
          dataSource={booking?.services ? booking?.services : []}
          renderItem={(service) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<ContainerOutlined />} size={32} />}
                title={
                  <Typography.Title
                    level={5}
                  >{`Service name: ${service.name}`}</Typography.Title>
                }
                description={`Price: ${service.price}`}
              />
            </List.Item>
          )}
        />
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col style={{ marginTop: 20 }}>
            <div>
              <span style={{ fontWeight: 600 }}>Total Price: </span>
              <span>
                {booking?.services?.reduce(
                  (acc, service) => acc + service?.price,
                  0
                )}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DentistBookingDetailComponent;
