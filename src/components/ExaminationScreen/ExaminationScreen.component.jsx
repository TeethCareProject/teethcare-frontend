import React from "react";
import {
  Divider,
  Col,
  Row,
  Typography,
  Input,
  Form,
  Button,
  Select,
  List,
  Avatar,
  Alert,
} from "antd";
import {
  ContainerOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { convertMillisecondsToDate } from "../../utils/convert.utils";

const ExaminationScreenComponent = ({
  booking,
  onFinish,
  deleteServiceHandler,
  form,
  serviceModalClickHandler,
  isUpdated,
  switchUpdateState,
  showInfo,
}) => {
  const { TextArea } = Input;

  let examinationTime = booking?.examinationTime
    ? convertMillisecondsToDate(booking?.examinationTime)
    : convertMillisecondsToDate(booking?.createBookingDate);

  return (
    <>
      <Row style={{ marginLeft: 20 }}>
        {showInfo ? (
          <Alert
            message="Waiting for confirm updated..."
            type="info"
            showIcon
          />
        ) : null}
      </Row>
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
            <Typography.Title level={4}>Booking details:</Typography.Title>
            <div>Examination Time: {examinationTime}</div>
            <div>Current Services: </div>
            <List
              itemLayout="horizontal"
              dataSource={booking?.services ? booking?.services : []}
              renderItem={(service) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<ContainerOutlined />} size={32} />}
                    title={
                      <Typography.Title
                        level={5}
                      >{`Service name: ${service.name} Price: ${service.price}`}</Typography.Title>
                    }
                    description={`Description: ${service.description}`}
                  />
                </List.Item>
              )}
            />
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col style={{ marginLeft: 30 }}>
                <div>
                  Total Price:{" "}
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
          <Button
            style={{ marginLeft: 20 }}
            onClick={() => switchUpdateState()}
          >
            Update
          </Button>
        </Col>
        <Divider type="vertical" style={{ height: "90vh" }} />
        <Col span={12} style={{ margin: "30px 40px" }}>
          <Form name="info_treatment-update" onFinish={onFinish} form={form}>
            <Form.Item name="note">
              <TextArea
                disabled={isUpdated}
                rows={10}
                placeholder="Note during treatment"
                maxLength={1000}
              />
            </Form.Item>
            <div>
              Update services:{" "}
              {!isUpdated ? (
                <EditOutlined
                  onClick={serviceModalClickHandler}
                  style={{
                    color: "blue",
                    marginLeft: 30,
                    fontSize: "0.8em",
                    cursor: "pointer",
                  }}
                />
              ) : null}{" "}
            </div>
            {form.getFieldValue("serviceIds") ? (
              <List
                itemLayout="horizontal"
                dataSource={form.getFieldValue("serviceIds")}
                renderItem={(service) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<ContainerOutlined />} size={32} />}
                      title={
                        <Typography.Title
                          level={5}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>{`Service name: ${service.name}`}</div>
                          <div>
                            <DeleteOutlined
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => deleteServiceHandler(service)}
                            />
                          </div>
                        </Typography.Title>
                      }
                      description={`Description: ${service.description}`}
                    />
                  </List.Item>
                )}
              />
            ) : null}

            <Form.Item name="serviceIds">
              <Select
                disabled={isUpdated}
                mode="multiple"
                allowClear
                hidden={true}
                style={{ width: "100%" }}
                placeholder="Select services"
              ></Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={isUpdated}>
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ExaminationScreenComponent;
