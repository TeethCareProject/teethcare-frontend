import React from "react";
import { Form, Input, Button, Select } from "antd";
import {
  AttendantRegisterValidation,
  ClinicRegisterValidation,
} from "../../validate/RegisterValidation";
import "./UserForm.style.css";

const UserForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const { Option } = Select;
  return (
    <Form
      name="normal_register"
      className="register-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item name="username" rules={AttendantRegisterValidation.username}>
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={AttendantRegisterValidation.password}>
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={AttendantRegisterValidation.rePassword}
      >
        <Input type="password" placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item name="firstName" rules={AttendantRegisterValidation.firstName}>
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item name="lastName" rules={AttendantRegisterValidation.lastName}>
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item>
        <div className="gender-input">
          <div className="gender-label">Gender</div>
          <Select defaultValue="Male">
            <Option value="Female">Female</Option>
            <Option value="Others">Others</Option>
          </Select>
        </div>
      </Form.Item>

      <Form.Item name="phone" rules={AttendantRegisterValidation.phone}>
        <Input placeholder="Phone number" />
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

export default UserForm;
