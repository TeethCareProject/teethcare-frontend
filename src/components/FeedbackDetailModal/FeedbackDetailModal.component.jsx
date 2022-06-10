import { Avatar, Col, Descriptions, List, Row, Typography } from "antd";
import { CalendarOutlined, ContainerOutlined } from "@ant-design/icons";

import React from "react";
import DescriptionsItem from "antd/lib/descriptions/Item";

const FeedbackDetailModalComponent = ({ feedbackData }) => {
  return (
    <>
      {/* <Row gutter={[16, 16]} style={{ marginBottom: "0.5rem" }}>
        <Col>
          <Avatar size={48} icon={<CalendarOutlined />} />
        </Col>
        <Col span={10}>
          <Typography>{`Feedback ID: ${feedbackData?.id} - Status: ${feedbackData?.status}`}</Typography>
          <Typography>{`Feedback ID: ${feedbackData?.clinic?.name}`}</Typography>
        </Col>
      </Row>
      <Descriptions title="Patient info">
        <DescriptionsItem label="Patient name">
          {feedbackData?.patient?.firstName +
            " " +
            feedbackData?.patient?.lastName}
        </DescriptionsItem>
        <DescriptionsItem label="Phone number">
          {feedbackData?.patient?.phone}
        </DescriptionsItem>
        <DescriptionsItem label="Date of birth">
          {feedbackData?.patient?.dateOfBirth}
        </DescriptionsItem>
      </Descriptions>
      <Descriptions title="Staff Incharge">
        <DescriptionsItem label="Customer service">
          {feedbackData?.customerService
            ? feedbackData?.customerService?.firstName +
              " " +
              feedbackData?.customerService?.lastName
            : "Not available"}
        </DescriptionsItem>
        <DescriptionsItem label="Dentist">
          {feedbackData?.dentist
            ? feedbackData?.dentist?.firstName +
              " " +
              feedbackData?.dentist?.lastName
            : "Not available"}
        </DescriptionsItem>
      </Descriptions>
      <Descriptions title="Feedback Info">
        <DescriptionsItem label="Description">
          {feedbackData?.description}
        </DescriptionsItem>
      </Descriptions>
      <List
        itemLayout="horizontal"
        dataSource={feedbackData?.services ? feedbackData?.services : []}
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
      /> */}
    </>
  );
};

export default FeedbackDetailModalComponent;
