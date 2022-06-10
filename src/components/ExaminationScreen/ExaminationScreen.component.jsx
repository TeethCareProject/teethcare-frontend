import React from "react";
import { Divider, Col, Row, Typography, Input, Form, Select } from "antd";

const ExaminationScreenComponent = ({ booking }) => {
  console.log(booking);
  const { Option } = Select;
  const { TextArea } = Input;

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Row style={{ display: "flex" }}>
      <Col span={10}>
        <div
          style={{
            border: "1px solid #D8F1FF",
            backgroundColor: "#D8F1FF",
            borderRadius: "15px",
            margin: "30px 20px",
            padding: 20,
          }}
        >
          <Typography.Title level={4}>Patient details:</Typography.Title>
          <Row style={{ display: "flex", alignItems: "center" }}>
            <Col>
              <img
                src="https://media.istockphoto.com/vectors/user-avatar-profile-icon-black-vector-illustration-vector-id1209654046?k=20&m=1209654046&s=612x612&w=0&h=Atw7VdjWG8KgyST8AXXJdmBkzn0lvgqyWod9vTb2XoE="
                alt="img"
                style={{ width: 300, height: 200 }}
              />
            </Col>
            <Col style={{ marginLeft: 30 }}>
              <div>
                Name:{" "}
                <span>
                  {booking?.patient?.firstName +
                    " " +
                    booking?.patient?.lastName}
                </span>
              </div>
              <div>
                Date of birth: <span>{booking?.patient?.dateOfBirth}</span>
              </div>
              <div>
                Gender: <span>{booking?.patient?.gender}</span>
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{
            border: "1px solid #F7F7F7",
            backgroundColor: "#D8F1FF",
            borderRadius: "15px",
            margin: "30px 20px",
            padding: 20,
          }}
        >
          <Typography.Title level={4}>Service details:</Typography.Title>
          <Row style={{ display: "flex", alignItems: "center" }}>
            <Col>
              <img
                src="https://omarsalameh.wpengine.com/wp-content/uploads/2020/02/veneers-04-edit-1024x682.jpg"
                alt="img"
                style={{ width: 300, height: 200 }}
              />
            </Col>
            <Col style={{ marginLeft: 30 }}>
              <div>
                Name:{" "}
                <span>
                  {booking?.services?.map((service) => (
                    <span>service {`${" "}`}</span>
                  ))}
                </span>
              </div>
              <div>
                Price:{" "}
                <span>
                  {booking?.services?.reduce(
                    (acc, service) => acc + service?.price,
                    0
                  )}
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <Divider type="vertical" style={{ height: "90vh" }} />
      <Col span={12} style={{ margin: "30px 40px" }}>
        <Form name="info_treatment-update">
          <Form.Item>
            <TextArea
              rows={12}
              placeholder="Note during treatment"
              maxLength={12}
            />
          </Form.Item>
          <Form.Item>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleChange}
            >
              {/* {booking?.clinic?.services.map((service, index) => (
                <Option key={index} value={service.id}>
                  {service.name}
                </Option>
              ))} */}
            </Select>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ExaminationScreenComponent;
