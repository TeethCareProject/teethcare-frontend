import React from "react";
import { Form, Input, Button, Select } from "antd";

import {
  AttendantRegisterValidation,
  ClinicRegisterValidation,
} from "../../validate/RegisterValidation";

const ClinicForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const { Option } = Select;

  return (
    <Form
      name="normal_register"
      className="manager-register-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <div className="user-register-form">
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
        <Form.Item
          name="firstName"
          rules={AttendantRegisterValidation.firstName}
        >
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
      </div>
      <div className="hospital-register-form">
        <Form.Item
          name="clinicName"
          rules={ClinicRegisterValidation.clinicName}
        >
          <Input placeholder="Clinic's Name" />
        </Form.Item>
        <Form.Item name="clinicTaxCode" rules={ClinicRegisterValidation.taxId}>
          <Input placeholder="Clinic's Tax Code" />
        </Form.Item>
        <Form.Item
          name="clinicPhoneNumber"
          rules={ClinicRegisterValidation.phone}
        >
          <Input placeholder="Clinic's Phone Number" />
        </Form.Item>
        <Form.Item name="clinicEmail" rules={ClinicRegisterValidation.email}>
          <Input placeholder="Clinic's Email" />
        </Form.Item>

        <Form.Item
          name="clinicAddress"
          rules={ClinicRegisterValidation.address}
        >
          <Input placeholder="Clinic's Address" />
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
      </div>
    </Form>
  );
};

export default ClinicForm;
