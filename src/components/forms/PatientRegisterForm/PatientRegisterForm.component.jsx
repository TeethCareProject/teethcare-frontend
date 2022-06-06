import React from "react";
import { Form, Input, Button, Select } from "antd";

import { UserRegisterValidation } from "../../../validate/RegisterValidation";
import { GenderType } from "../../../constants/GenderConstants";

import "./PatientRegisterForm.style.css";

const PatientRegisterFormComponent = ({ onFinish }) => {
  const { Option } = Select;
  return (
    <Form name="normal_register" className="register-form" onFinish={onFinish}>
      <Form.Item name="username" rules={UserRegisterValidation.username}>
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={UserRegisterValidation.password}>
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={UserRegisterValidation.rePassword}
      >
        <Input type="password" placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item name="firstName" rules={UserRegisterValidation.firstName}>
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item name="lastName" rules={UserRegisterValidation.lastName}>
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={UserRegisterValidation.gender}
        initialValue="MALE"
      >
        <Select defaultValue="MALE" placeholder="select your gender">
          {GenderType.map((gender) => (
            <Option key={gender.value} value={gender.value}>
              {gender.title}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="patientEmail" rules={UserRegisterValidation.email}>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="phoneNumber" rules={UserRegisterValidation.phone}>
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

export default PatientRegisterFormComponent;
