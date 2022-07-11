import {
  Col,
  Form,
  Input,
  Row,
  Select,
  DatePicker,
  notification,
  Button,
  Typography,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAccountById,
  updateProfile,
} from "../../services/teeth-apis/AccountController";
import { ProfileValidation } from "../../validate/ProfileValidation";
import AvatarUploadContainer from "./AvatarUpload.container";
import "./ProfileForm.style.scss";

const { Option } = Select;

const ProfileFormContainer = () => {
  const role = useSelector((state) => state?.authentication?.user?.roleName);
  const id = useSelector((state) => state?.authentication?.user?.id);
  const [rerender, setRerender] = useState(false);
  const [form] = useForm();

  const fetchProfile = async () => {
    try {
      const { data } = await getAccountById(id);
      form.setFieldsValue({
        ...data,
        dateOfBirth: moment(new Date(data.dateOfBirth).valueOf()),
      });
      setRerender((preState) => !preState);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while getting profile data, try again later`,
        duration: 2,
      });
    }
  };

  const handleUpdateProfile = async (values) => {
    try {
      await updateProfile({
        dateOfBirth: moment(values.dateOfBirth).valueOf(),
        email: values.email,
        firstName: values.firstName,
        gender: values.gender,
        lastName: values.lastName,
        phoneNumber: values.phone,
      });
      notification["success"]({
        message: `Update successfully`,
        duration: 2,
      });
      fetchProfile();
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while update profile data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Row
        justify="center"
        className="profile-form"
        style={{ marginTop: "10vh" }}
      >
        <Col xs={24} sm={24} md={10} lg={10}>
          <Typography.Title level={3} className="profile-page-title">
            My Profile
          </Typography.Title>
          <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  label="First name"
                  name="firstName"
                  rules={ProfileValidation.firstName}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  label="Last name"
                  name="lastName"
                  rules={ProfileValidation.lastName}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  label="Date of birth"
                  name="dateOfBirth"
                  rules={ProfileValidation.dateOfBirth}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={ProfileValidation.gender}
                >
                  <Select>
                    <Option value="MALE">Male</Option>
                    <Option value="FEMALE">Female</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={ProfileValidation.email}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Form.Item
                label="Phone number"
                name="phone"
                rules={ProfileValidation.phone}
              >
                <Input />
              </Form.Item>
            </Col>
            <Form.Item>
              <div className="profile-page-button">
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={10} lg={10}>
          <AvatarUploadContainer
            form={form}
            imageData={form.getFieldValue("avatarImage")}
            fetchProfile={fetchProfile}
          />
        </Col>
      </Row>
    </>
  );
};

export default ProfileFormContainer;
