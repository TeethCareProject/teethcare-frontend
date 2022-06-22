import React from "react";
import {
  Col,
  Typography,
  Form,
  Button,
  Select,
  List,
  Avatar,
  Input,
} from "antd";
import {
  ContainerOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import BookingStatusConstants from "../../constants/BookingStatusConstants";

const DentistUpdateBookingFormComponent = ({
  onFinish,
  deleteServiceHandler,
  form,
  serviceModalClickHandler,
  isUpdated,
  switchUpdateState,
  bookingData,
}) => {
  const { TextArea } = Input;
  return (
    <Col span={12} style={{ margin: "30px 40px" }}>
      {bookingData?.status === BookingStatusConstants.TREATMENT ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography.Title level={4}>
            Update booking information during treatment:
          </Typography.Title>
          <Button
            style={{ marginBottom: 20 }}
            onClick={() => switchUpdateState()}
          >
            Update
          </Button>
        </div>
      ) : null}

      <Form name="info_treatment-update" onFinish={onFinish} form={form}>
        <Form.Item name="note">
          <TextArea
            disabled={isUpdated}
            rows={8}
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
                      <div hidden={isUpdated}>
                        <DeleteOutlined
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => deleteServiceHandler(service)}
                        />
                      </div>
                    </Typography.Title>
                  }
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
  );
};

export default DentistUpdateBookingFormComponent;
