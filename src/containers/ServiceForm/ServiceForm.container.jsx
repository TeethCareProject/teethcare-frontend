import { Button, Form, Input, message, notification, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { getServiceById } from "../../services/teeth-apis/ServiceController";
import { getBase64 } from "../../utils/convert.utils";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  debugger;

  return isJpgOrPng && isLt2M;
};

const ServiceFormContainer = ({ serviceId, handleSubmit }) => {
  const [serviceData, setServiceData] = useState({});
  //for upload image
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [form] = useForm();

  const fetchService = async () => {
    try {
      const { data } = await getServiceById(serviceId);
      setServiceData(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching service data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    if (serviceId) {
      //if update
      fetchService();
      form.setFieldsValue(serviceData);
    }
  }, []);

  const handleUploadImage = (info) => {
    debugger;
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        debugger;
        setLoading(false);
        setImageUrl(url);
        //TODO: update with firebase
        form.setFieldsValue({ ...form.getFieldsValue(), imageUrl: url });
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item label="Service name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Service price" name="price">
          <Input />
        </Form.Item>
        <Form.Item label="Service description" name="description">
          <TextArea row={4} />
        </Form.Item>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleUploadImage}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Form.Item name="imageUrl" hidden></Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ServiceFormContainer;
