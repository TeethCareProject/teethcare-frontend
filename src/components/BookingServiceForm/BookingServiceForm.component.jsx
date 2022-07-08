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
import "./BookingServiceForm.style.scss";
const { Option } = Select;

const BookingServiceFormComponent = ({
  serviceData,
  availableHourList,
  handleGetAvailableHourList,
  checkVoucherCode,
  voucherCodeMess,
  setVoucherCodeMess,
  ...antdFormProps
}) => {
  const { form, ...restAntdFormProps } = antdFormProps;
  console.log(serviceData);
  return (
    <>
      <Form form={form} {...restAntdFormProps} className="booking-service-form">
        <Row gutter={[40, 16]} justify="center">
          <Typography.Title level={3} style={{ marginBottom: 20 }}>
            Booking Service: {serviceData.serviceName}
          </Typography.Title>
        </Row>
        <Row gutter={[40, 16]} justify="center">
          <Col xs={16} sm={8} md={8} lg={8}>
            <Form.Item
              name="firstName"
              label="First name"
              rules={[{ required: true }]}
            >
              <Input disabled placeholder={form.getFieldValue("firstName")} />
            </Form.Item>
          </Col>
          <Col xs={16} sm={8} md={8} lg={8}>
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
          <Col xs={16} sm={8} md={8} lg={8}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Select disabled placeholder={form.getFieldValue("gender")}>
                <Option value="MALE">Male</Option>
                <Option value="FEMALE">Female</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={16} sm={8} md={8} lg={8}>
            <Form.Item name="email" label="Email">
              <Input disabled placeholder={form.getFieldValue("email")} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[40, 16]} justify="center">
          <Col xs={16} sm={8} md={8} lg={8}>
            <Form.Item label="Date of birth" rules={[{ required: true }]}>
              <DatePicker disabled />
            </Form.Item>
          </Col>
          <Col xs={16} sm={8} md={8} lg={8}>
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
              <Form.Item
                name="desiredHour"
                required
                label="Desired time"
                initialValue={availableHourList[0]}
              >
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
              <Typography>
                No available time, please choose other day
              </Typography>
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
          <Col span={8}>
            <Form.Item
              name="voucherCode"
              label="Voucher"
              onChange={() => {
                if (voucherCodeMess) {
                  setVoucherCodeMess(null);
                }
              }}
              hasFeedback
              validateStatus={
                voucherCodeMess
                  ? voucherCodeMess == "success"
                    ? "success"
                    : "error"
                  : null
              }
              help={voucherCodeMess === "success" ? null : voucherCodeMess}
            >
              <Input placeholder="Apply voucher now" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Button onClick={checkVoucherCode}>Apply</Button>
          </Col>
        </Row>
        <Row gutter={[40, 16]} justify="center">
          <Col span={16}>
            <ServiceCard serviceData={serviceData} />
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
    </>
  );
};

const ServiceCard = ({ serviceData }) => {
  return (
    <Card bodyStyle={{ padding: 0 }}>
      <Row>
        <Col xs={0} sm={8} md={8} lg={8}>
          <img
            style={{ width: "100%" }}
            alt="service"
            src={serviceData.serviceImage}
          />
        </Col>
        <Col xs={24} sm={16} md={16} lg={16}>
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
