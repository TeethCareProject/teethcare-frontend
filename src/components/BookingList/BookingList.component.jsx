import React from "react";
import { Avatar, Button, List, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import "./BookingList.style.scss";

const BookingListComponent = ({ bookingListData }) => {
  return (
    <>
      <List
        className="booking-list-pc"
        style={{ maxHeight: 400, overflow: "auto" }}
        itemLayout="horizontal"
        dataSource={bookingListData ? bookingListData : []}
        renderItem={(booking) => (
          <>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<CalendarOutlined />} size={48} />}
                title={
                  <Typography.Title
                    level={5}
                  >{`Booking Id: ${booking?.id} - Status: ${booking?.status}`}</Typography.Title>
                }
                description={`Service: ${booking?.services[0]?.name} - Clinic: ${booking?.clinic?.name}`}
              />
              <Button type="link" onClick={() => booking?.onClick()}>
                View detail
              </Button>
            </List.Item>
          </>
        )}
      />
      <List
        className="booking-list-mobile"
        style={{ maxHeight: 400, overflow: "auto" }}
        itemLayout="horizontal"
        dataSource={bookingListData ? bookingListData : []}
        renderItem={(booking) => (
          <>
            <List.Item onClick={() => booking?.onClick()}>
              <List.Item.Meta
                avatar={<Avatar icon={<CalendarOutlined />} size={48} />}
                title={
                  <Typography.Title
                    level={5}
                  >{`Booking Id: ${booking?.id} - Status: ${booking?.status}`}</Typography.Title>
                }
                description={`Service: ${booking?.services[0]?.name} - Clinic: ${booking?.clinic?.name}`}
              />
            </List.Item>
          </>
        )}
      />
    </>
  );
};

export default BookingListComponent;
