import React from "react";
import { Form, Input, Button, Select, Row, Col } from "antd";

import {
  AttendantRegisterValidation,
  ClinicRegisterValidation,
} from "../../validate/RegisterValidation";

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

const provinces = [
  {
    title: "Ho Chi Minh",
    value: "Ho Chi Minh",
  },
];
const districts = [
  {
    title: "Quan 1",
    value: "Quan 1",
  },
];
const wards = [
  {
    title: "Linh Trung",
    value: "Linh Trung",
  },
];

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

            <Form.Item name="phone" rules={AttendantRegisterValidation.phone}>
              <Input placeholder="Phone number" />
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
              name="clinicEmail"
              rules={ClinicRegisterValidation.email}
            >
              <Input placeholder="Clinic's Email" />
            </Form.Item>

            <Form.Item
              name="clinicAddress"
              rules={ClinicRegisterValidation.address}
            >
              <Input placeholder="Clinic's Address" />
            </Form.Item>

            <Form.Item
              name="province"
              label="Province"
              rules={ClinicRegisterValidation.province}
              initialValue="Ho Chi Minh"
            >
              <Select defaultValue="Ho Chi Minh" placeholder="select province">
                {provinces.map((province) => (
                  <Option key={province.value} value={province.value}>
                    {province.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="district"
              label="district"
              rules={ClinicRegisterValidation.district}
              initialValue="Thu Duc"
            >
              <Select defaultValue="Thu Duc" placeholder="select district">
                {districts.map((district) => (
                  <Option key={district.value} value={district.value}>
                    {district.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="ward"
              label="ward"
              rules={ClinicRegisterValidation.ward}
              initialValue="Linh Trung"
            >
              <Select defaultValue="Linh Trung" placeholder="select ward">
                {wards.map((ward) => (
                  <Option key={ward.value} value={ward.value}>
                    {ward.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
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

export default ClinicForm;
