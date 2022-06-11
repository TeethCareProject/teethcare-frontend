import {
  Avatar,
  Col,
  Descriptions,
  List,
  Row,
  Typography,
  Form,
  DatePicker,
  Button,
  Select,
  Input,
} from "antd";
import { CalendarOutlined, ContainerOutlined } from "@ant-design/icons";

import React from "react";
import DescriptionsItem from "antd/lib/descriptions/Item";
import { convertMillisecondsToDate } from "../../utils/convert.utils";

import DentistPickingModalContainer from "../../containers/DentistPickingModal/DentistPickingModal.container";

const BookingDetailModalComponent = ({
  form,
  onChange,
  resetField,
  bookingData,
  updateBookingData,
  dentists,
  services,
  selectedDentistId,
  setSelectedDentistId,
  modalClickHandler,
  isOpened,
  setIsOpened,
}) => {
  let examinationTime = bookingData?.examinationTime
    ? convertMillisecondsToDate(bookingData?.examinationTime)
    : convertMillisecondsToDate(bookingData?.createBookingDate);

  const { Option } = Select;

  console.log(services);

  return (
    <>
      <DentistPickingModalContainer
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        setSelectedDentistId={setSelectedDentistId}
        modalClickHandler={modalClickHandler}
        onChange={onChange}
      />
      <Row gutter={[16, 16]} style={{ marginBottom: "0.5rem" }}>
        <Col>
          <Avatar size={48} icon={<CalendarOutlined />} />
        </Col>
        <Col span={10}>
          <Typography>{`Booking ID: ${bookingData?.id} - Status: ${bookingData?.status}`}</Typography>
          <Typography>{`Booking ID: ${bookingData?.clinic?.name}`}</Typography>
        </Col>
      </Row>
      <Descriptions title="Patient info">
        <DescriptionsItem label="Patient name">
          {bookingData?.patient?.firstName +
            " " +
            bookingData?.patient?.lastName}
        </DescriptionsItem>
        <DescriptionsItem label="Phone number">
          {bookingData?.patient?.phone}
        </DescriptionsItem>
        <DescriptionsItem label="Date of birth">
          {bookingData?.patient?.dateOfBirth}
        </DescriptionsItem>
      </Descriptions>
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
            {bookingData?.dentist?.firstName +
              " " +
              bookingData?.dentist?.lastName +
              " - " +
              bookingData?.dentist?.specialization}
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
            placeholder="Please select services"
            defaultValue={bookingData?.services ? bookingData?.services : []}
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
    </>
  );
};

export default BookingDetailModalComponent;
