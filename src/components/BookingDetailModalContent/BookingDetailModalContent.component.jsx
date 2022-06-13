import React from "react";
import { Avatar, Descriptions, List, Typography, Button } from "antd";
import { ContainerOutlined } from "@ant-design/icons";

import DescriptionsItem from "antd/lib/descriptions/Item";
import { convertMillisecondsToDate } from "../../utils/convert.utils";
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import { RoleConstant } from "../../constants/RoleConstants";

const BookingDetailModalContentComponent = ({
  bookingData,
  role,
  checkInHandler,
}) => {
  let examinationTime = bookingData?.examinationTime
    ? convertMillisecondsToDate(bookingData?.examinationTime)
    : convertMillisecondsToDate(bookingData?.desiredCheckingTime);
  return (
    <>
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
      </div>
      <Descriptions title="Booking Info">
        <DescriptionsItem label="Description">
          {bookingData?.description}
        </DescriptionsItem>
      </Descriptions>
      <div>
        Current Examination Time: {`${" "}`}
        <span>{examinationTime}</span>
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
            />
          </List.Item>
        )}
      />
      {role === RoleConstant.CUSTOMER_SERVICE &&
      bookingData?.status === BookingStatusConstants.REQUEST ? (
        <Button onClick={checkInHandler}>Check in</Button>
      ) : null}
    </>
  );
};

export default BookingDetailModalContentComponent;
