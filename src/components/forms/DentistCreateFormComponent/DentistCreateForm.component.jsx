import React from "react";
import { Form, Button, Input } from "antd";
import UserInfoInputComponent from "../UserInfoInputComponent/UserInfoInput.component";
import { UserRegisterValidation } from "../../../validate/RegisterValidation";

import "./PatientRegisterForm.style.css";

const DentistCreateFormComponent = ({ onFinishHandle }) => {
  return (
    <Form
      name="normal_register"
      className="register-form"
      onFinish={onFinishHandle}
    >
      <UserInfoInputComponent />
      <Form.Item
        name="specialization"
        rules={UserRegisterValidation.specialization}
      >
        <Input placeholder="Specialization" />
      </Form.Item>
      <Form.Item name="description" rules={UserRegisterValidation.description}>
        <Input placeholder="Description" />
      </Form.Item>
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

export default DentistCreateFormComponent;
