import React from "react";
import { Modal, notification, Form, Button, Input } from "antd";

const RejectBookingFormComponent = ({ handleAssign, fetchBookingData }) => {
  const onFinish = async (values) => {
    try {
      await handleAssign({
        isAccepted: false,
        rejectedNote: values.rejectedNote,
      });
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
