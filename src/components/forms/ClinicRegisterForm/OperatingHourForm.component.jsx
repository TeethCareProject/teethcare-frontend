import React from "react";

import { Form, TimePicker } from "antd";
import { ClinicRegisterValidation } from "../../../validate/RegisterValidation";

const OperatingHourFormComponent = () => {
  return (
    <>
      <Form.Item
        name="operatingTimeMorning"
        label="Morning Time"
        shouldUpdate
        // dependencies={["operatingTimeEvening"]}
        rules={ClinicRegisterValidation.operatingTimeMorning}
      >
        <TimePicker.RangePicker format="HH:mm" />
      </Form.Item>
      <Form.Item
        name="operatingTimeEvening"
        label="Evening Time"
        shouldUpdate
        dependencies={["operatingTimeMorning"]}
        rules={ClinicRegisterValidation.operatingTimeEvening}
      >
        <TimePicker.RangePicker format="HH:mm" />
      </Form.Item>
    </>
  );
};

export default OperatingHourFormComponent;
