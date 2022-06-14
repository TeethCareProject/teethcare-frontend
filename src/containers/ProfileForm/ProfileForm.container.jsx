import {
  Col,
  Form,
  Input,
  Row,
  Select,
  DatePicker,
  notification,
  Button,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAccountById,
  updateProfile,
} from "../../services/teeth-apis/AccountController";
import AvatarUploadContainer from "./AvatarUpload.container";

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
        phoneNumber: values.phoneNumber,
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
      <Row justify="center" style={{ marginTop: "10rem" }}>
        <Col span={8}>
          <AvatarUploadContainer
            form={form}
            imageData={form.getFieldValue("avatarImage")}
            fetchProfile={fetchProfile}
          />
        </Col>
        <Col span={8}>
          <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
            <Row>
              <Col span={12}>
                <Form.Item label="First name" name="firstName">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last name" name="lastName">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="Date of birth" name="dateOfBirth">
                  {/* <DatePicker /> */}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="gender" label="Gender">
                  <Select>
                    <Option value="MALE">Male</Option>
                    <Option value="FEMALE">Female</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Phone number" name="phone">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProfileFormContainer;
