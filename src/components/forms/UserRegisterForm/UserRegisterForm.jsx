import React from "react";
import { Form, Input, Button, Select } from "antd";

import { AttendantRegisterValidation } from "../../../validate/RegisterValidation";

import "./UserRegisterForm.style.css";

const genderType = [
  {
    title: "Male",
    value: "MALE",
  },
  {
    title: "Female",
    value: "FEMALE",
  },
];

const UserRegisterForm = (props) => {
  const { Option } = Select;
  return (
    <Form
      name="normal_register"
      className="register-form"
      onFinish={props.onFinish}
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

      <Form.Item
        name="gender"
        label="Gender"
        rules={AttendantRegisterValidation.gender}
        initialValue="MALE"
      >
        <Select defaultValue="MALE" placeholder="select your gender">
          {genderType.map((gender) => (
            <Option key={gender.value} value={gender.value}>
              {gender.title}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="patientEmail" rules={AttendantRegisterValidation.email}>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="phoneNumber" rules={AttendantRegisterValidation.phone}>
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

export default UserRegisterForm;
