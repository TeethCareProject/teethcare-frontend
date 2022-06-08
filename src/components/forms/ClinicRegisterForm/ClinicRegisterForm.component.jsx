import React from "react";

import { Form, Input, Button, Select, Row, Col } from "antd";
import {
  UserRegisterValidation,
  ClinicRegisterValidation,
} from "../../../validate/RegisterValidation";

import LocationInputContainer from "../../../containers/LocationInput/LocationInput.container";
import { GenderType } from "../../../constants/GenderConstants";

const ClinicRegisterFormComponent = (props) => {
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
            <Form.Item
              name="firstName"
              rules={UserRegisterValidation.firstName}
            >
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

            <Form.Item name="phoneNumber" rules={UserRegisterValidation.phone}>
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
              name="clinicAddress"
              rules={ClinicRegisterValidation.address}
            >
              <Input placeholder="Clinic's Address" />
            </Form.Item>
            <Form.Item
              name="clinicEmail"
              rules={ClinicRegisterValidation.email}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <LocationInputContainer />
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

export default ClinicRegisterFormComponent;
