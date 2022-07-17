import React from "react";
import { Input, Form, Rate, Button } from "antd";

const FeedbackFormComponent = ({ onFinish }) => {
  const { TextArea } = Input;
  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="ratingScore"
        label="Rate"
        rules={[{ required: true, message: "This field is required" }]}
      >
        <Rate />
      </Form.Item>
      <Form.Item
        name="detail"
        label="Description"
        rules={[{ required: true, message: "This field is required" }]}
      >
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
