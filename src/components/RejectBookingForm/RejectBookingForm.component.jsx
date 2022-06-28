import React from "react";
import { Form, Button, Input } from "antd";

const RejectBookingFormComponent = ({ onFinish }) => {
  return (
    <Form
      name="reject_booking_form"
      onFinish={onFinish}
      style={{ marginTop: 40, marginRight: 40 }}
    >
      <Form.Item
        name="rejectedNote"
        label="Reason"
        // rules={}
      >
        <Input placeholder="Enter reason" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" shape="round" htmlType="submit">
          Rejected
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RejectBookingFormComponent;
