import { Avatar, Col, Descriptions, List, Row, Typography } from "antd";
import { CalendarOutlined, ContainerOutlined } from "@ant-design/icons";

import React from "react";
import DescriptionsItem from "antd/lib/descriptions/Item";

const FeedbackDetailComponent = ({ feedbackData }) => {
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: "0.5rem" }}>
        <Col>
          <Avatar size={48} icon={<CalendarOutlined />} />
        </Col>
        <Col span={10}>
          <Typography>{`Feedback ID: ${feedbackData?.id} - Status: ${feedbackData?.status}`}</Typography>
          <Typography>{`Booking ID: ${feedbackData?.bookingResponse?.id}`}</Typography>
        </Col>
      </Row>
      <Descriptions title="Patient info">
        <DescriptionsItem label="Patient name">
          {feedbackData?.bookingResponse?.patient?.firstName +
            " " +
            feedbackData?.bookingResponse?.patient?.lastName}
        </DescriptionsItem>
      </Descriptions>
      <Descriptions title="Feedback detail">
        <DescriptionsItem label="Rating score" span={24}>
          {feedbackData?.ratingScore}
        </DescriptionsItem>
        <DescriptionsItem label="Description" span={24}>
          {feedbackData?.detail}
        </DescriptionsItem>
      </Descriptions>
    </>
  );
};

export default FeedbackDetailComponent;
