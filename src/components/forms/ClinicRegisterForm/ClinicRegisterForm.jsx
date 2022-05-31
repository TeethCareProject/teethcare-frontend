import React from "react";

import { Form, Input, Button, Select, Row, Col } from "antd";
import {
  AttendantRegisterValidation,
  ClinicRegisterValidation,
} from "../../../validate/RegisterValidation";

import LocationContainer from "../../../containers/LocationContainer/LocationContainer.container";

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

const ClinicRegisterForm = (props) => {
  const { Option } = Select;

  return (
    <Form
      name="normal_register"
      className="manager-register-form"
      onFinish={props.onFinishHandle}
    >
      <Row>
        <Col>
          <div className="user-register-form">
            <Form.Item
              name="username"
              rules={AttendantRegisterValidation.username}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={AttendantRegisterValidation.password}
            >
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

            <Form.Item
              name="lastName"
              rules={AttendantRegisterValidation.lastName}
            >
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

            <Form.Item
              name="phoneNumber"
              rules={AttendantRegisterValidation.phone}
            >
              <Input placeholder="Phone number" />
            </Form.Item>
            <Form.Item
              name="managerEmail"
              rules={AttendantRegisterValidation.email}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </div>
        </Col>
        <Col>
          <div className="hospital-register-form">
            <Form.Item
              name="clinicName"
              rules={ClinicRegisterValidation.clinicName}
            >
              <Input placeholder="Clinic's Name" />
            </Form.Item>
            <Form.Item
              name="clinicTaxCode"
              rules={ClinicRegisterValidation.taxId}
            >
              <Input placeholder="Clinic's Tax Code" />
            </Form.Item>
            <Form.Item
              name="clinicPhoneNumber"
              rules={ClinicRegisterValidation.phone}
            >
              <Input placeholder="Clinic's Phone Number" />
            </Form.Item>

            <Form.Item
              name="clinicAddress"
              rules={ClinicRegisterValidation.address}
            >
              <Input placeholder="Clinic's Address" />
            </Form.Item>
            <LocationContainer />
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default ClinicRegisterForm;
