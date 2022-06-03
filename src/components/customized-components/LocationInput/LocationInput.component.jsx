import React from "react";
import { Form, Select } from "antd";
import { ClinicRegisterValidation } from "../../../validate/RegisterValidation";

const LocationInputComponent = ({
  name,
  label,
  placeholder,
  arrayOption,
  selectedValue,
  handleValueChange,
}) => {
  const { Option } = Select;
  return (
    <>
      <Form.Item
        name={name}
        label={label}
        //Remember to add rules in the future
        // rules={ClinicRegisterValidation.province}
      >
        <Select
          value={selectedValue}
          onChange={handleValueChange}
          placeholder={placeholder}
        >
          <Option value="">None</Option>
          {arrayOption?.map((element, index) => (
            <Option key={index} value={element.id}>
              {element.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default LocationInputComponent;
