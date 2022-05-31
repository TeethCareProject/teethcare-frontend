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
  notification,
} from "antd";
import DescriptionsItem from "antd/lib/descriptions/Item";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import RoutePath from "../../routers/Path";
import { bookService } from "../../services/teeth-apis/BookingController";

const { Option } = Select;
const { Meta } = Card;

const BookingServicePage = () => {
  const { serviceId } = useParams();
  const user = useSelector((state) => state?.authentication?.user);
  const [form] = useForm();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone,
      });
    }
  }, []);

  const onFinish = (values) => {
    //submit form
    const submitBooking = async () => {
      try {
        const { data } = await bookService({
          serviceId: serviceId,
          desiredCheckingTime: 1653999624,
          description: values.description,
        });
        notification["success"]({
          message: `Booking successfully`,
          description: `Booking successfully, please check detail in your booking list`,
          duration: 2,
        });
        history.push(RoutePath.BOOKING_SUCCESSFUL_PAGE);
      } catch (e) {
        notification["error"]({
          message: `Something went wrong! Try again latter!`,
          description: `There is problem while booking service, try again later`,
          duration: 2,
        });
        history.push(RoutePath.BOOKING_FAILED_PAGE);
      }
    };

    submitBooking();
  };

  return (
    <div className="page" style={{ marginTop: "2rem" }}>
      <Form
        form={form}
        name="booking-form"
        onFinish={onFinish}
        layout="vertical"
      >
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
              name="desiredCheckingTime"
              label="Desired timing"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[40, 16]} justify="center">
          <Col span={16}>
            <Card bodyStyle={{ padding: 0 }}>
              <Row>
                <Col span={12}>
                  <img
                    style={{ width: "100%" }}
                    alt="service"
                    src="/service-tmp.png"
                  />
                </Col>
                <Col span={12}>
                  <Space style={{ padding: "2rem" }} direction="vertical">
                    <Typography.Title level={4}>
                      Clinic: Nha khoa quận 1
                    </Typography.Title>
                    <Descriptions>
                      <DescriptionsItem label="Service: " span={24}>
                        Niềng răng
                      </DescriptionsItem>
                      <DescriptionsItem label="Price: " span={24}>
                        20.000.000VNĐ
                      </DescriptionsItem>
                    </Descriptions>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={[40, 16]} justify="center">
          <Col span={16}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default BookingServicePage;
