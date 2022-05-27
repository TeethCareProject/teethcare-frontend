import React, { useState } from "react";
import { Form, Input, Button, Select, Row, Col, notification } from "antd";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocationApi } from "../../services/teeth-apis/LocationController";
import setProvincesHandler from "../../redux/location/location.action";
import { useHistory } from "react-router-dom";

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

const ClinicRegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const provinces = useSelector((state) => state.provinces.provinces);

  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();

  useEffect(() => {
    const getClinic = async () => {
      try {
        const provinceArray = await getLocationApi();
        dispatch(setProvincesHandler(provinceArray.data));
      } catch (e) {
        notification["error"]({
          message: `Something went wrong! Try again latter!`,
          description: `There is problem while fetching clinic, try again later`,
          duration: 2,
        });
      }
    };
    getClinic();
  }, []);

  const availableDistrict = provinces?.find(
    (c) => c.id === selectedProvince
  )?.districtList;
  const availableWard = availableDistrict?.find(
    (s) => s.id === selectedDistrict
  )?.wardList;

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
            >
              <Select
                value={selectedProvince}
                onChange={(e) => {
                  setSelectedProvince(e);
                }}
                placeholder="Select province"
              >
                {provinces?.map((province, index) => (
                  <Option key={index} value={province.id}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="district"
              label="district"
              rules={ClinicRegisterValidation.district}
            >
              <Select
                value={selectedDistrict}
                placeholder="select district"
                onChange={(e) => {
                  setSelectedDistrict(e);
                  console.log(availableWard);
                }}
              >
                {availableDistrict?.map((district, index) => (
                  <Option key={index} value={district.id}>
                    {district.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="ward"
              label="ward"
              rules={ClinicRegisterValidation.ward}
            >
              <Select
                value={selectedWard}
                placeholder="select ward"
                onChange={(e) => setSelectedWard(e)}
              >
                {availableWard?.map((ward, index) => (
                  <Option key={index} value={ward.id}>
                    {ward.name}
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

export default ClinicRegisterForm;
