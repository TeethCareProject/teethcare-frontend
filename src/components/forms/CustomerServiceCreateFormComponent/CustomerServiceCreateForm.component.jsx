import React from "react";
import { Form, Button } from "antd";
import UserInfoInputComponent from "../UserInfoInputComponent/UserInfoInput.component";

const CustomerServiceRegisterFormComponent = ({ onFinish }) => {
  return (
    <Form name="normal_register" className="register-form" onFinish={onFinish}>
      <UserInfoInputComponent />
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button"
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomerServiceRegisterFormComponent;
