import React from "react";
import LocationSelect from "../LocationSelect/LocationSelect.component";
import { Form } from "antd";
import { ClinicRegisterValidation } from "../../../validate/RegisterValidation";

const LocationSelectBlock = (props) => {
  return (
    <>
      <Form.Item
        name="provinceId"
        label="Province"
        // rules={ClinicRegisterValidation.province}
      >
        <LocationSelect
          optionArray={props.provinces}
          placeholder="Select province"
          value={props.selectedProvince}
          onChange={props.handleProvinceChange}
        />
      </Form.Item>
      <Form.Item
        name="districtId"
        label="District"
        // rules={ClinicRegisterValidation.district}
      >
        <LocationSelect
          optionArray={props.availableDistrict}
          placeholder="Select district"
          value={props.selectedDistrict}
          onChange={props.handleDistrictChange}
        />
      </Form.Item>
      <Form.Item name="wardId" label="Ward">
        {/* // rules={ClinicRegisterValidation.ward} */}
        <LocationSelect
          optionArray={props.availableWard}
          placeholder="Select ward"
          value={props.selectedWard}
          onChange={props.handleWardChange}
        />
      </Form.Item>
    </>
  );
};

export default LocationSelectBlock;
