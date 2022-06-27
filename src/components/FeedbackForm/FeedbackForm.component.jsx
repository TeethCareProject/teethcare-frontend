import React from "react";
import { Modal, notification, Form,TextArea,Rate,Button } from "antd";

const FeedbackFormComponent = ({
  bookingId,
  fetchBookingData,
  giveFeedBack,
}) => {
  const onFinish = async (values) => {
    try {
      await giveFeedBack(bookingId, values.detail, values.ratingScore);
      Modal.destroyAll();
      await fetchBookingData();
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while giving feedback, try again later`,
        duration: 2,
      });
    }
  };
  return (
    <Form onFinish={onFinish}>
      <Form.Item name="ratingScore" label="Rate">
        <Rate />
      </Form.Item>
      <Form.Item name="detail" label="Description">
        <TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send!
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FeedbackFormComponent;
