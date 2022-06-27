import React from "react";
import { Avatar, Button, List, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const AppointmentListComponent = ({ appointmentListData }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={appointmentListData ? appointmentListData : []}
      renderItem={(appointment) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={<CalendarOutlined />} size={48} />}
            title={
              <Typography.Title
                level={5}
              >{`Appointment Id: ${appointment?.id}`}</Typography.Title>
            }
            description={`Clinic: ${appointment?.clinic?.name}`}
          />
          <Button type="link" onClick={() => appointment?.onClick()}>
            Xem chi tiết
          </Button>
        </List.Item>
      )}
    />
  );
};

export default AppointmentListComponent;
