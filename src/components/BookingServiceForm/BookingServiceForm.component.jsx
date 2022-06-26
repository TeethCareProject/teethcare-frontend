import React from "react";
import moment from "moment";
import {
  DatePicker,
  Form,
  Input,
  Select,
  Button,
  Col,
  Row,
  Card,
  Descriptions,
  Typography,
  Space,
  Radio,
} from "antd";
import DescriptionsItem from "antd/lib/descriptions/Item";
import { BookingServiceFormValidation } from "../../validate/BookingServiceFormValidation";
const { Option } = Select;

const dateFormat = "DD-MM-YYYY HH";

const BookingServiceFormComponent = ({
  serviceData,
  availableHourList,
  handleGetAvailableHourList,
  ...antdFormProps
}) => {
  const { form, ...restAntdFormProps } = antdFormProps;
  const disabledDateTime = () => ({
    disabledHours: () =>
      getDisabledTime(
        serviceData?.clinic?.startTimeShift1,
        serviceData?.clinic?.endTimeShift1,
        serviceData?.clinic?.startTimeShift2,
        serviceData?.clinic?.endTimeShift2
      ),
  });

  return (
    <Form form={form} {...restAntdFormProps}>
      <Row gutter={[40, 16]} justify="center">
        <Col span={8}>
          <Form.Item
            name="firstName"
            label="First name"
            rules={[{ required: true }]}
          >
            <Input disabled placeholder={form.getFieldValue("firstName")} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[{ required: true }]}
          >
            <Input disabled placeholder={form.getFieldValue("lastName")} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[40, 16]} justify="center">
        <Col span={8}>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select disabled placeholder={form.getFieldValue("gender")}>
              <Option value="MALE">Male</Option>
              <Option value="FEMALE">Female</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="email" label="Email">
            <Input disabled placeholder={form.getFieldValue("email")} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[40, 16]} justify="center">
        <Col span={8}>
          <Form.Item label="Date of birth" rules={[{ required: true }]}>
            <DatePicker disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input disabled placeholder={form.getFieldValue("phone")} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[40, 4]} justify="center">
        <Col span={16}>
          <Form.Item
            name="desiredCheckingDate"
            label="Desired date"
            rules={BookingServiceFormValidation.desiredCheckingTime}
          >
            <DatePicker
              disabledDate={(current) => {
                let customDate = moment().format("DD-MM-YYYY");
                return current && current < moment(customDate, "DD-MM-YYYY");
              }}
              onChange={() => handleGetAvailableHourList()}
            />
          </Form.Item>
          {availableHourList && availableHourList?.length > 0 ? (
            <Form.Item name="desiredHour" required label="Desired time">
              <Radio.Group
                defaultValue={availableHourList[0]}
                buttonStyle="solid"
              >
                {availableHourList.map((hour) => (
                  <Radio.Button value={hour}>{`${hour}:00`}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          ) : (
            <Typography>No available time, please choose other day</Typography>
          )}
        </Col>
        <Col span={16}>
          <Form.Item
            name="description"
            label="Description"
            rules={BookingServiceFormValidation.description}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[40, 16]} justify="center">
        <Col span={16}>
          <ServiceCard serviceData={ServiceEntityToServiceCard(serviceData)} />
        </Col>
      </Row>
      <Row gutter={[40, 16]} justify="center">
        <Col span={16}>
          <Form.Item>
            <Button type="primary" onClick={() => form.submit()}>
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const ServiceCard = ({ serviceData }) => {
  return (
    <Card bodyStyle={{ padding: 0 }}>
      <Row>
        <Col span={12}>
          <img
            style={{ width: "100%" }}
            alt="service"
            src={serviceData?.serviceImage}
          />
        </Col>
        <Col span={12}>
          <Space style={{ padding: "2rem" }} direction="vertical">
            <Typography.Title level={4}>
              {`Clinic: ${serviceData?.clinicName}`}
            </Typography.Title>
            <Descriptions>
              <DescriptionsItem label="Service: " span={24}>
                {serviceData?.serviceName}
              </DescriptionsItem>
              <DescriptionsItem label="Price: " span={24}>
                {serviceData?.servicePrice}
              </DescriptionsItem>
            </Descriptions>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default BookingServiceFormComponent;
