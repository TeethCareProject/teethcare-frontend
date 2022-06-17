import React from "react";
import {
  Col,
  Form,
  DatePicker,
  Select,
  Button,
  List,
  Typography,
  Avatar,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { convertMomentToDate } from "../../utils/convert.utils";

const CreateAppointmentFormComponent = ({
  isUpdated,
  serviceModalClickHandler,
  form,
  deleteServiceHandler,
}) => {
  const dateFormat = "DD-MM-YYYY HH";
  return (
    <Col span={12} style={{ margin: "30px 40px" }}>
      <Form name="create_appointment_form">
        <Form.Item
          name="desiredCheckingTime"
          label="Desired timing"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || convertMomentToDate(value) > Date.now()) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Booking date should be from tomorrow")
                );
              },
            }),
          ]}
        >
          <DatePicker
            showTime={{ format: "HH" }}
            format={`${dateFormat}:00`}
            disabledDate={(current) => {
              let customDate = moment().format("DD-MM-YYYY HH");
              return current && current < moment(customDate, "DD-MM-YYYY HH");
            }}
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
  );
};

export default CreateAppointmentFormComponent;
