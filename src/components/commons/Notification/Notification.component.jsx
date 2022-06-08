import { Avatar, Badge, Dropdown, Menu, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationList } from "../../../redux/notification/notification.action";
import { BellOutlined } from "@ant-design/icons";

const NotificationComponent = ({ notificationList }) => {
  const finalList = notificationList?.map((item) => ({
    key: item?.id,
    label: <Typography>{`${item?.title}: ${item?.body}`}</Typography>,
  }));

  return (
    <>
      <Dropdown overlay={<Menu items={[...finalList]} />}>
        <Badge
          count={notificationList?.length}
          showZero
          onClick={(e) => e.preventDefault()}
        >
          <BellOutlined />
        </Badge>
      </Dropdown>
    </>
  );
};

export default NotificationComponent;
