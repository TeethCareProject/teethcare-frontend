import React from "react";
import { Avatar, Button, List, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const BookingListComponent = ({ bookingListData }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={bookingListData ? bookingListData : []}
      renderItem={(booking) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={<CalendarOutlined />} size={48} />}
            title={
              <Typography.Title
                level={5}
              >{`MĐ: ${booking.id}`}</Typography.Title>
            }
            description={`Dịch vụ: ${booking?.services[0]?.name}`}
          />
          <Typography>{`${booking.description}`}</Typography>
          <Button type="link">Xem chi tiết</Button>
        </List.Item>
      )}
    />
  );
};

export default BookingListComponent;
