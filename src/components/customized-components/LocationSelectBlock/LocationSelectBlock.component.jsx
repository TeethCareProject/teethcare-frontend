import React from "react";
import { Form, Select } from "antd";
import { ClinicRegisterValidation } from "../../../validate/RegisterValidation";

const LocationSelectBlock = (props) => {
  const { Option } = Select;
  return (
    <>
      <Form.Item
        name="provinceId"
        label="Province"
        // rules={ClinicRegisterValidation.province}
      >
        <Select
          value={props.selectedProvince}
          onChange={props.handleProvinceChange}
          placeholder="Select province"
        >
          <Option value="">None</Option>
          {props.provinces?.map((element, index) => (
            <Option key={index} value={element.id}>
              {element.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="districtId"
        label="District"
        // rules={ClinicRegisterValidation.district}
      >
        <Select
          value={props.selectedDistrict}
          onChange={props.handleDistrictChange}
          placeholder="Select district"
        >
          <Option value="">None</Option>
          {props.availableDistrict?.map((element, index) => (
            <Option key={index} value={element.id}>
              {element.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="wardId" label="Ward">
        {/* // rules={ClinicRegisterValidation.ward} */}
        <Select
          value={props.selectedWard}
          onChange={props.handleWardChange}
          placeholder="Select ward"
        >
          <Option value="">None</Option>
          {props.availableWard?.map((element, index) => (
            <Option key={index} value={element.id}>
              {element.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default LocationSelectBlock;
