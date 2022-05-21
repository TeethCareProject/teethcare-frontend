import React from "react";
import { Form, Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MedicineBoxOutlined,
  KeyOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const ClinicForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

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
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please input your confirmPassword!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
      </div>
      <div className="hospital-register-form">
        <Form.Item
          name="clinicName"
          rules={[
            {
              required: true,
              message: "Please input your Clinic's Name!",
            },
          ]}
        >
          <Input
            prefix={<MedicineBoxOutlined className="site-form-item-icon" />}
            placeholder="Clinic's Name"
          />
        </Form.Item>
        <Form.Item
          name="clinicTaxCode"
          rules={[
            {
              required: true,
              message: "Please input your Clinic's Tax Code!",
            },
          ]}
        >
          <Input
            prefix={<KeyOutlined className="site-form-item-icon" />}
            placeholder="Clinic's Tax Code"
          />
        </Form.Item>
        <Form.Item
          name="clinicPhoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your Clinic's Phone Number!",
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Clinic's Phone Number"
          />
        </Form.Item>
        <Form.Item
          name="clinicEmail"
          rules={[
            {
              required: true,
              message: "Please input your Clinic's Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Clinic's Email"
          />
        </Form.Item>

        <Form.Item
          name="clinicAddress"
          rules={[
            {
              required: true,
              message: "Please input your Clinic's Address!",
            },
          ]}
        >
          <Input
            prefix={<EnvironmentOutlined className="site-form-item-icon" />}
            placeholder="Clinic's Address"
          />
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
