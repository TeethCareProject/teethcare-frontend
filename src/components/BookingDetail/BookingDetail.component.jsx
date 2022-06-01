import {
  Avatar,
  Col,
  Descriptions,
  Divider,
  List,
  Row,
  Typography,
} from "antd";
import { ContainerOutlined } from "@ant-design/icons";
import React from "react";
import DescriptionsItem from "antd/lib/descriptions/Item";
import { convertMomentToMilliseconds } from "../../utils/convert.utils";

const BookingDetailComponent = ({ bookingData }) => {
  return (
    <div>
      <Row>
        <Col span={16}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography.Title level={5}>{bookingData?.id}</Typography.Title>
            <Typography>{`Status: ${bookingData?.status}`}</Typography>
          </div>
          <Typography.Text>{bookingData?.clinicName}</Typography.Text>
        </Col>
      </Row>
      <Divider />
      <Row align="center">
        <Col span={21}>
          <Descriptions title="Booking Info">
            <DescriptionsItem label="Patient name" span={24}>
              Hellu
            </DescriptionsItem>
            <DescriptionsItem label="Phone number" span={24}>
              0986354698
            </DescriptionsItem>
            <DescriptionsItem label="Examination time" span={24}>
              {bookingData?.examinationTime}
            </DescriptionsItem>
          </Descriptions>
        </Col>
      </Row>
      <Divider />
      {bookingData?.customerServiceName ? (
        <>
          <Row align="center">
            <Col span={21}>
              <Descriptions title="Customer service incharge">
                <DescriptionsItem label="Name" span={24}>
                  {bookingData.customerServiceName}
                </DescriptionsItem>
              </Descriptions>
            </Col>
          </Row>
          <Divider />
        </>
      ) : null}
      {bookingData?.dentistName ? (
        <>
          <Row align="center">
            <Col span={21}>
              <Descriptions title="Dentist incharge">
                <DescriptionsItem label="Name" span={24}>
                  {bookingData.dentistName}
                </DescriptionsItem>
              </Descriptions>
            </Col>
          </Row>
          <Divider />
        </>
      ) : null}
      <Row align="center">
        <Col span={21}>
          <Descriptions title="Services"></Descriptions>
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
        </Col>
      </Row>
    </div>
  );
};

export default BookingDetailComponent;
