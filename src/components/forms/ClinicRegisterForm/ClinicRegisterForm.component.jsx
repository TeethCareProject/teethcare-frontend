import React from "react";

import { Form, Input } from "antd";
import { ClinicRegisterValidation } from "../../../validate/RegisterValidation";

import LocationInputContainer from "../../../containers/LocationInput/LocationInput.container";
const ClinicRegisterFormComponent = () => {
  return (
    <>
      <Form.Item name="clinicName" rules={ClinicRegisterValidation.clinicName}>
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

      <Form.Item name="clinicAddress" rules={ClinicRegisterValidation.address}>
        <Input placeholder="Clinic's Address" />
      </Form.Item>
      <Form.Item name="clinicEmail" rules={ClinicRegisterValidation.email}>
        <Input placeholder="Clinic's Email" />
      </Form.Item>
      <LocationInputContainer />
    </>
  );
};

export default ClinicRegisterFormComponent;
