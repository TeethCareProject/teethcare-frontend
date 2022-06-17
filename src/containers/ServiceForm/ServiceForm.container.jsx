import { Button, Form, Input, message, notification, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { getServiceById } from "../../services/teeth-apis/ServiceController";
import { getBase64 } from "../../utils/convert.utils";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ServiceValidation from "../../validate/ServiceValidation";

const ServiceFormContainer = ({ serviceId, handleSubmit }) => {
  const [serviceData, setServiceData] = useState({});
  const [fileList, setFileList] = useState([]);
  const [form] = useForm();

  const fetchService = async () => {
    try {
      const { data } = await getServiceById(serviceId);
      form.setFieldsValue(data);
      data.imageUrl &&
        setFileList([
          {
            uid: "-1",
            name: "service.png",
            status: "done",
            url: data.imageUrl,
          },
        ]);
      setServiceData(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching service data, try again later`,
        duration: 2,
      });
    }
  };

  const onChange = async ({ fileList: newFileList }) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      imageUrl: newFileList[0]?.originFileObj,
    });
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  useEffect(() => {
    if (serviceId) {
      fetchService();
      form.setFieldsValue(serviceData);
    }
  }, []);

  return (
    <>
      <Form
        onFinish={async (values) => {
          try {
            values.imageUrl = values.imageUrl
              ? await getBase64(values.imageUrl)
              : values.imageUrl;
          } catch (e) {
            //handle error
          }
          handleSubmit(values);
        }}
        form={form}
      >
        {serviceId ? (
          <Form.Item label="Service ID" name="id">
            <Input readOnly />
          </Form.Item>
        ) : null}
        <Form.Item
          label="Service name"
          name="name"
          rules={ServiceValidation.name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Service price"
          name="price"
          rules={ServiceValidation.price}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Service description"
          name="description"
          rules={ServiceValidation.description}
        >
          <TextArea row={4} />
        </Form.Item>
        <Form.Item
          label="Image"
          name="imageUrl"
          rules={ServiceValidation.imageUrl}
        >
          <Upload
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
            listType="picture-card"
            fileList={fileList}
            onRemove={() => {
              form.setFieldsValue({
                ...form.getFieldsValue(),
                imageUrl: null,
              });
              setFileList([]);
            }}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>
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
