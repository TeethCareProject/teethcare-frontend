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
import { ContainerOutlined } from "@ant-design/icons";

import DescriptionsItem from "antd/lib/descriptions/Item";
import { convertMillisecondsToDate } from "../../utils/convert.utils";

const UpdateBookingDetailModalContentComponent = ({
  form,
  bookingData,
  updateBookingData,
  dentists,
  services,
  selectedDentistId,
  modalClickHandler,
}) => {
  let examinationTime = bookingData?.examinationTime
    ? convertMillisecondsToDate(bookingData?.examinationTime)
    : convertMillisecondsToDate(bookingData?.createBookingDate);

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
        Current Dentist: {`${" "}`}
        <span>
          {bookingData?.dentist ? (
            <span>
              {bookingData?.dentist?.firstName +
                " " +
                bookingData?.dentist?.lastName +
                " - " +
                bookingData?.dentist?.specialization}
            </span>
          ) : (
            <span>Not assigned</span>
          )}
        </span>
        <span
          onClick={modalClickHandler}
          style={{
            color: "blue",
            marginLeft: 30,
            fontSize: "0.8em",
            cursor: "pointer",
          }}
        >
          Update Dentist
        </span>
      </div>
      <div>
        <div>New Dentist: {`${" "}`}</div>
        <Form.Item name="dentistId" hidden>
          <Input value={selectedDentistId || bookingData?.dentist?.id} />
        </Form.Item>
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
      </div>
      <Descriptions title="Booking Info">
        <DescriptionsItem label="Description">
          {bookingData?.description}
        </DescriptionsItem>
      </Descriptions>
      <div>
        <div>
          Current Examination Time: {`${" "}`}
          <span>{examinationTime}</span>
        </div>
        <div>New Examination Time: {`${" "}`}</div>
        <Form.Item name="examinationTime">
          <DatePicker
            showTime
            placeholder="Select Time"
            style={{ marginLeft: 10 }}
          />
        </Form.Item>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={bookingData?.services ? bookingData?.services : []}
        renderItem={(service) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<ContainerOutlined />} size={32} />}
              title={
                <Typography.Title
                  level={5}
                >{`Service name: ${service.name}`}</Typography.Title>
              }
              description={`Description: ${service.description}`}
            />
          </List.Item>
        )}
      />
      <Form.Item name="serviceIds">
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Select services"
        >
          {services.map((service) => (
            <Option value={service.id}>{service.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateBookingDetailModalContentComponent;
