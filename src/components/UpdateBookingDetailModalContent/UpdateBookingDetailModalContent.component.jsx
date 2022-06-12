import React from "react";
import {
  Avatar,
  Descriptions,
  List,
  Typography,
  Form,
  DatePicker,
  Button,
  Select,
  Input,
} from "antd";
import {
  ContainerOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import DescriptionsItem from "antd/lib/descriptions/Item";
import BookingStatusConstants from "../../constants/BookingStatusConstants";

const UpdateBookingDetailModalContentComponent = ({
  form,
  bookingData,
  updateBookingData,
  dentists,
  services,
  selectedDentistId,
  selectedServiceIds,
  dentistModalClickHandler,
  serviceModalClickHandler,
  deleteServiceHandler,
  checkInHandler,
}) => {
  const { Option } = Select;
  return (
    <Form
      name="update_dentist_time_form"
      form={form}
      onFinish={updateBookingData}
    >
      <Descriptions title="Staff Incharge">
        <DescriptionsItem label="Customer service">
          {bookingData?.customerService
            ? bookingData?.customerService?.firstName +
              " " +
              bookingData?.customerService?.lastName
            : "Not available"}
        </DescriptionsItem>
      </Descriptions>
      <div>
        <div>
          New Dentist:{" "}
          {dentists
            ?.filter((dentist) => dentist.id === selectedDentistId)
            .map((dentist) => (
              <span>
                {dentist.firstName +
                  " " +
                  dentist.lastName +
                  " - " +
                  dentist?.specialization}
              </span>
            ))}
          <EditOutlined
            onClick={dentistModalClickHandler}
            style={{
              color: "blue",
              marginLeft: 30,
              fontSize: "0.8em",
              cursor: "pointer",
            }}
          />
        </div>
        <Form.Item name="dentistId" hidden>
          <Input value={selectedDentistId || bookingData?.dentist?.id} />
        </Form.Item>
      </div>
      <Descriptions title="Booking Info">
        <DescriptionsItem label="Description">
          {bookingData?.description}
        </DescriptionsItem>
      </Descriptions>
      <div>
        <span>New Examination Time: </span>
        <Form.Item name="examinationTime">
          <DatePicker
            showTime
            placeholder="Select Time"
            style={{ marginLeft: 10 }}
          />
        </Form.Item>
      </div>
      <div>
        <div className="ant-descriptions-title">
          Service{" "}
          <EditOutlined
            onClick={serviceModalClickHandler}
            style={{
              color: "blue",
              marginLeft: 30,
              fontSize: "0.8em",
              cursor: "pointer",
            }}
          />
        </div>
        <List
          itemLayout="horizontal"
          dataSource={
            services
              ? services.filter((service) =>
                  selectedServiceIds.includes(service.id)
                )
              : []
          }
          renderItem={(service) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<ContainerOutlined />} size={32} />}
                title={
                  <Typography.Title
                    level={5}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>{`Service name: ${service.name}`}</div>
                    <div>
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteServiceHandler(service.id)}
                      />
                    </div>
                  </Typography.Title>
                }
                description={`Description: ${service.description}`}
              />
            </List.Item>
          )}
        />
      </div>

      <Form.Item name="serviceIds">
        <Select
          mode="multiple"
          allowClear
          hidden={true}
          style={{ width: "100%" }}
          placeholder="Select services"
        >
          {services.map((service) => (
            <Option value={service.id}>{service.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
        {services && bookingData?.status === BookingStatusConstants.REQUEST ? (
          <Button onClick={checkInHandler}>Check in</Button>
        ) : null}
      </div>
    </Form>
  );
};

export default UpdateBookingDetailModalContentComponent;
