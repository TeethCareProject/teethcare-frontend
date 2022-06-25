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
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAccountById,
  updateProfile,
} from "../../services/teeth-apis/AccountController";
import {
  getClinicById,
  updateClinic,
} from "../../services/teeth-apis/ClinicController";
import { ClinicProfileValidation } from "../../validate/ClinicProfileValidation";
import { ProfileValidation } from "../../validate/ProfileValidation";
import { ClinicRegisterValidation } from "../../validate/RegisterValidation";
import LocationInputContainer from "../LocationInput/LocationInput.container";
import AvatarUploadContainer from "./ClinicAvatarUpload.container";

const { Option } = Select;

const ClinicProfileFormContainer = () => {
  const role = useSelector((state) => state?.authentication?.user?.roleName);
  const [clinicData, setClinicData] = useState({});
  const clinicId = useSelector(
    (state) => state?.authentication?.user?.clinic?.id
  );
  const [form] = useForm();

  const fetchProfile = async () => {
    try {
      const { data } = await getClinicById(clinicId);
      form.setFieldsValue({
        ...data,
        clinicAddress: data?.location?.address,
        location: [
          data?.location?.ward?.district?.province?.id,
          data?.location?.ward?.district?.id,
          data?.location?.ward?.id,
        ],
      });
      setClinicData({
        ...data,
        clinicAddress: data?.location?.address,
        location: [
          data?.location?.ward?.district?.province?.id,
          data?.location?.ward?.district?.id,
          data?.location?.ward?.id,
        ],
      });
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
      await updateClinic({
        clinicAddress: values.clinicAddress,
        description: values.description,
        name: values.name,
        wardId: values.location[2],
      });
      notification["success"]({
        message: `Update successfully`,
        duration: 2,
      });
      fetchProfile();
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while update clinic profile data, try again later`,
        duration: 2,
      });
    }
  };

  useLayoutEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Row justify="center" style={{ marginTop: "10rem" }}>
        <Col span={8}>
          <AvatarUploadContainer
            form={form}
            imageData={form.getFieldValue("imageUrl")}
            fetchProfile={fetchProfile}
          />
        </Col>
        <Col span={8}>
          <Form
            form={form}
            onFinish={handleUpdateProfile}
            layout="vertical"
            initialValues={clinicData}
          >
            <Form.Item
              name="name"
              label="Clinic name"
              rules={ClinicProfileValidation.clinicName}
              required
            >
              <Input placeholder="Clinic's Name" />
            </Form.Item>
            <Form.Item
              name="taxCode"
              label="Clinic tax code"
              rules={ClinicProfileValidation.taxId}
            >
              <Input placeholder="Clinic's Tax Code" readOnly />
            </Form.Item>

            <Form.Item
              name={"clinicAddress"}
              label="Clinic address"
              rules={ClinicProfileValidation.address}
              required
            >
              <Input placeholder="Clinic's Address" />
            </Form.Item>
            <LocationInputContainer defaultValues={clinicData?.location} />
            <Form.Item label="Clinic description" name="description" required>
              <TextArea row={5} />
            </Form.Item>
            <Row justify="center">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-form-button"
                >
                  Update
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ClinicProfileFormContainer;
