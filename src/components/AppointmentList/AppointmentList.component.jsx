import React from "react";
import { Avatar, Button, List, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { countDayBetween } from "../../utils/convert.utils";
import moment from "moment";

const AppointmentListComponent = ({ appointmentListData }) => {
  return (
    <>
      <List
        className="appointment-list-pc"
        itemLayout="horizontal"
        dataSource={appointmentListData ? appointmentListData : []}
        renderItem={(appointment) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<CalendarOutlined />} size={48} />}
              title={
                <Typography.Title level={5}>
                  {`Appointment Id: ${appointment?.id}`}{" "}
                  <span
                    style={{ color: "red", fontWeight: "500" }}
                  >{`(${countDayBetween(
                    moment(),
                    appointment.expireAppointmentDate
                  )} day left)`}</span>
                </Typography.Title>
              }
              description={`Clinic: ${appointment?.clinic?.name}`}
            />
            <Button type="link" onClick={() => appointment?.onClick()}>
              View detail
            </Button>
          </List.Item>
        )}
      />
      <List
        className="appointment-list-mobile"
        style={{ maxHeight: 400, overflow: "auto" }}
        itemLayout="horizontal"
        dataSource={appointmentListData ? appointmentListData : []}
        renderItem={(appointment) => (
          <>
            <List.Item onClick={() => appointment?.onClick()}>
              <List.Item.Meta
                avatar={<Avatar icon={<CalendarOutlined />} size={48} />}
                title={
                  <Typography.Title level={5}>
                    {`Appointment Id: ${appointment?.id}`}{" "}
                    <span
                      style={{ color: "red", fontWeight: "500" }}
                    >{`(${countDayBetween(
                      moment(),
                      appointment.expireAppointmentDate
                    )} day left)`}</span>
                  </Typography.Title>
                }
                description={`Service: ${appointment?.services[0]?.name} - Clinic: ${appointment?.clinic?.name}`}
              />
            </List.Item>
          </>
        )}
      />
    </>
  );
};

export default AppointmentListComponent;
