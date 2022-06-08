import React from "react";

import { Form, Input, Button, Select, Row, Col } from "antd";
import { ClinicRegisterValidation } from "../../../validate/RegisterValidation";

import LocationInputContainer from "../../../containers/LocationInput/LocationInput.container";
import UserInfoInputComponent from "../UserInfoInput/UserInfoInput.component";
const ClinicRegisterFormComponent = (props) => {
  return (
    <Form
      name="normal_register"
      className="manager-register-form"
      onFinish={props.onFinishHandle}
    >
      <Row>
        <Col style={{ marginRight: 20 }}>
          <UserInfoInputComponent />
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
              <Input placeholder="Clinic's Email" />
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
