import React from "react";
import { Select } from "antd";
const LocationSelect = ({ optionArray, placeholder, value, onChange }) => {
  const { Option } = Select;
  return (
    <Select value={value} onChange={onChange} placeholder={placeholder}>
      <Option value="">None</Option>
      {optionArray?.map((element, index) => (
        <Option key={index} value={element.id}>
          {element.name}
        </Option>
      ))}
    </Select>
  );
};

export default LocationSelect;
